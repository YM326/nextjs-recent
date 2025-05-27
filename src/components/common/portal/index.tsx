import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children?: ReactNode | ReactNode[];
}

export default function Portal(props: PortalProps) {
  const { children } = props;
  const el = document.getElementById('portal');

  if (el) return ReactDOM.createPortal(children, el);
  return <></>;
}
