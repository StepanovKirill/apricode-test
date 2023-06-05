import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  portalId?: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');

  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
}

function Portal({ children, portalId = 'portalRoot' }: PortalProps) {
  const [portalWrapper, setPortalWrapper] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = document.getElementById(portalId);

    if (!element) {
      setPortalWrapper(createWrapperAndAppendToBody(portalId));
    } else {
      setPortalWrapper(element);
    }
  }, [portalId]);

  if (!portalWrapper) {
    return null;
  }

  return createPortal(children, portalWrapper);
}

export default Portal;
