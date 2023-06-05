import React from 'react';
import clsx from 'clsx';

import styles from './IconWithAction.module.scss';

interface IconWithActionProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

function IconWithAction({
  children,
  onClick,
  disabled = false,
  className = '',
}: IconWithActionProps) {
  const mergedClassName = clsx(styles.icon, className);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={mergedClassName}
    >
      {children}
    </button>
  );
}

export default IconWithAction;
