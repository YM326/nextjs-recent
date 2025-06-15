import { useCallback, useRef, useEffect, ClipboardEvent, useState, CompositionEvent, FormEvent } from 'react';
import { Size } from '@defines/common/cssType';
import { Color } from '@defines/common/color';
import { commonFont } from '@utils/font';
import { sizeToCss } from '@utils/cssUtils';

interface WritingAreaProps {
  value: string;
  onChange: (changeHTML: string) => void;
  setCount: (count: number) => void;
  limit?: number;
  placeholder?: string;
  height?: Size;
  width?: Size;
}

export default function WritingArea(props: WritingAreaProps) {
  const { value, onChange, placeholder, height = '100%', width = '100%', setCount, limit } = props;
  const urlRegex = /(\b(?:https?:\/\/|http?:\/\/|www\.)[^\s<]+)/gi;

  const editorRef = useRef<HTMLDivElement>(null);
  const undoStack = useRef<string[]>(['']);
  const redoStack = useRef<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const hasWrapped = useRef(false);

  const pushHistory = useCallback((current: string) => {
    undoStack.current.push(current);
    redoStack.current = [];
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  const insertCaretMarker = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0).cloneRange();
    const marker = document.createElement('span');
    marker.setAttribute('data-caret-marker', '');
    marker.textContent = '\u200b';
    range.insertNode(marker);

    range.setStartAfter(marker);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const restoreCaretFromMarker = (container: HTMLElement) => {
    const sel = window.getSelection();
    if (!sel) return;

    const marker = container.querySelector('span[data-caret-marker]');
    if (!marker) return;

    const range = document.createRange();
    range.setStartAfter(marker);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    marker.remove();
  };

  const getLength = () => {
    const editor = editorRef.current;
    if (!editor) return 0;

    let length = 0;
    editor.childNodes.forEach((node, index) => {
      length += index > 0 ? node.textContent!.length + 1 : node.textContent!.length;
    });

    return length;
  };

  const placeCaretAtEnd = (el: HTMLElement) => {
    el.focus();
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const undo = useCallback(() => {
    const editor = editorRef.current!;
    if (!undoStack.current.length) return;
    const prev = undoStack.current.pop()!;
    if (undoStack.current.length === 0) {
      undoStack.current.push('');
    }
    redoStack.current.push(editor.innerHTML);
    editor.innerHTML = prev;
    onChange(editor.innerHTML);
    setCount(getLength());
    placeCaretAtEnd(editor);
  }, [onChange]);

  const redo = useCallback(() => {
    const editor = editorRef.current!;
    if (!redoStack.current.length) return;
    const next = redoStack.current.pop()!;
    undoStack.current.push(editor.innerHTML);
    editor.innerHTML = next;
    onChange(editor.innerHTML);
    setCount(getLength());
    placeCaretAtEnd(editor);
  }, [onChange]);

  const linkifyNode = useCallback((node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent!;
      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      urlRegex.lastIndex = 0;
      let m: RegExpExecArray | null;

      // eslint-disable-next-line no-cond-assign
      while ((m = urlRegex.exec(text))) {
        const url = m[0];
        const idx = m.index;

        if (idx > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, idx)));
        }

        const a = document.createElement('a');
        a.textContent = url;
        a.href = url.startsWith('http') ? url : `https://${url}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.contentEditable = 'false';
        a.tabIndex = -1;
        a.style.cursor = 'pointer';
        frag.appendChild(a);

        lastIndex = idx + url.length;
      }

      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      if (frag.childNodes.length > 0) {
        node.parentNode!.replaceChild(frag, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() !== 'a') {
      Array.from(node.childNodes).forEach((child) => linkifyNode(child));
    }
  }, []);

  const convertLinks = useCallback(() => {
    if (isComposing) return;

    const editor = editorRef.current!;

    insertCaretMarker();

    Array.from(editor.childNodes).forEach((child) => linkifyNode(child));

    if (undoStack.current.length === 0 || undoStack.current[undoStack.current.length - 1] !== editor.innerHTML) {
      pushHistory(editor.innerHTML);
    }

    restoreCaretFromMarker(editor);

    onChange(editor.innerHTML);
  }, [isComposing, onChange]);

  const clearIfEmpty = useCallback(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerText.trim() === '') {
      editorRef.current.innerHTML = '';
      onChange('');
    }
  }, [onChange]);

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (undoStack.current[undoStack.current.length - 1] !== editorRef.current!.innerHTML) {
      pushHistory(editorRef.current!.innerHTML);
    }

    const text = e.clipboardData.getData('text/plain');
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    if (limit) {
      const currLen = getLength();
      const allowed = limit - (currLen - selection.toString().length) - text.length;
      if (allowed <= 0) {
        return;
      }
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    setCount(getLength());
  };

  const handleBlur = () => {
    if (!isComposing) {
      clearIfEmpty();
    }
  };

  const selectionDelete = () => {
    const sel = window.getSelection();
    if (!sel) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.collapse(true);

    sel.removeAllRanges();
    sel.addRange(newRange);
  };

  const handleBeforeInput = (e: FormEvent<HTMLDivElement>) => {
    const ie = e.nativeEvent as unknown as InputEvent | KeyboardEvent;

    if (isComposing) return;
    if (limit && getLength() >= limit) {
      e.preventDefault();
      return;
    }

    if (ie instanceof KeyboardEvent) {
      if (ie.key === ' ') {
        selectionDelete();
        convertLinks();
        clearIfEmpty();
      }
    } else if (ie.data === '\n') {
      selectionDelete();
      convertLinks();
      clearIfEmpty();
    }
  };

  const handleInput = () => {
    setCount(getLength());

    if (!hasWrapped.current && editorRef.current) {
      const editor = editorRef.current;
      const textNode = editor.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        const text = (textNode as Text).textContent || '';
        const wrapper = document.createElement('div');
        wrapper.textContent = text;
        editor.replaceChild(wrapper, textNode);
        hasWrapped.current = true;

        placeCaretAtEnd(editor);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      undo();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
      e.preventDefault();
      redo();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (_e: CompositionEvent) => {
    setIsComposing(false);

    convertLinks();
    clearIfEmpty();
  };

  return (
    <>
      <div
        className={'writing-area'}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onBeforeInput={handleBeforeInput}
        onInput={handleInput}
        onPaste={handlePaste}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
      />
      <style jsx>{`
        .writing-area {
          width: ${sizeToCss(width)};
          height: ${sizeToCss(height)};
          ${commonFont('16px', 500)};
          color: ${Color.CG10};
          outline: none;
          overflow-y: auto;

          &:hover {
            cursor: text;
          }

          &:empty:before,
          &:focus:empty:before {
            content: attr(data-placeholder);
            color: ${Color.CG80};
          }

          a {
            color: ${Color.SB80};
            cursor: pointer;
            text-decoration: underline;
          }
        }
      `}</style>
    </>
  );
}
