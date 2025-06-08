'use client';

import { useRef, useState } from 'react';
import Editor from '@components/common/editor';
import { Color } from '@defines/common/color';
import { Popper } from '@components/common/popper';
import { commonFont } from '@utils/font';
import InfoIcon from '@icons/InfoIcon';

export default function EditorView() {
  const limit = 100;
  const [editorText, setEditorText] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  return (
    <>
      <div className={'editor-wrapper'}>
        <Editor value={editorText} onChange={setEditorText} setCount={setCount} placeholder={'입력해주세요.'} />
        <span>{`${count} / ${limit}`}</span>
        <div className={'icon-wrapper'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={anchorRef}>
          <InfoIcon />
        </div>
        <Popper open={tooltipOpen} anchorEl={anchorRef.current} placement={'bottom'} offset={6}>
          <div className={'content'}>https://~~~치고 스페이스나 엔터 치면 a태그로 변경</div>
        </Popper>
      </div>
      <style jsx>{`
        .editor-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
        }

        .content {
          padding: 7px;
          border-radius: 4px;
          background: ${Color.CG40};
          ${commonFont('15px', 500)};
          color: ${Color.WHITE};
        }

        .icon-wrapper {
          width: fit-content;
          height: fit-content;
        }
      `}</style>
    </>
  );
}
