'use client';

import { useState } from 'react';
import Editor from '@components/common/editor';

export default function EditorView() {
  const limit = 100;
  const [editorText, setEditorText] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div className={'editor-wrapper'}>
        <Editor value={editorText} onChange={setEditorText} setCount={setCount} placeholder={'입력해주세요.'} />
        <span>{`${count} / ${limit}`}</span>
      </div>
      <style jsx>{`
        .editor-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
        }
      `}</style>
    </>
  );
}
