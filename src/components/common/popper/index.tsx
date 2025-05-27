'use client';

import { autoUpdate, flip, offset, Placement, shift, useFloating } from '@floating-ui/react-dom';
import { ReactElement, Ref, useEffect, useImperativeHandle } from 'react';
import Portal from '@components/common/portal';

export interface PopperHandler {
  floatingElement: HTMLElement | null;
}

export interface PopperProps {
  anchorEl?: HTMLElement | null;
  open: boolean;
  children: ReactElement | ReactElement[];
  offset?: number;
  crossOffset?: number;
  placement?: Placement;
  isOutsideClose?: boolean;
  isAutoUpdate?: boolean;
  zIndex?: number;
  isFlip?: boolean;
  isShift?: boolean;
  ref?: Ref<PopperHandler>;
}

export function Popper(props: PopperProps) {
  const {
    anchorEl,
    open,
    children,
    offset: mainOffset = 0,
    crossOffset = 0,
    placement,
    isAutoUpdate = true,
    zIndex,
    isFlip = false,
    isShift = true,
    ref,
  } = props;

  const { refs, floatingStyles } = useFloating<HTMLElement>({
    open,
    middleware: [
      isFlip && flip(),
      offset({ mainAxis: mainOffset, crossAxis: crossOffset }),
      isShift && shift({ mainAxis: true, crossAxis: true }),
    ],
    whileElementsMounted: isAutoUpdate ? autoUpdate : undefined,
    placement,
  });

  useEffect(() => {
    if (!anchorEl) return;

    refs.setReference(anchorEl);
  }, [anchorEl]);

  useImperativeHandle(ref, () => {
    return { floatingElement: refs.floating.current };
  });

  return (
    <>
      {open && (
        <Portal>
          <div className={'popper'} ref={refs.setFloating} style={floatingStyles}>
            {children}
          </div>
        </Portal>
      )}
      <style jsx>{`
        .popper {
          z-index: ${zIndex ?? 202};
        }
      `}</style>
    </>
  );
}
