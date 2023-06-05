import React from 'react';
import clsx from 'clsx';

import styles from './TextArea.module.scss';

interface TextAreaProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function TextArea({
  onChange,
  value = '',
  placeholder = '',
  className = '',
}: TextAreaProps) {
  const mergedClassName = clsx(styles.textArea, className);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={mergedClassName}
    />
  );
}

export default TextArea;
