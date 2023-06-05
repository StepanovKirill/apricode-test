import React from 'react';
import clsx from 'clsx';

import styles from './EditableInput.module.scss';

interface EditableInputProps {
  title: string;
  onSave: (newValue: string) => void;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

function EditableInput({
  title,
  onSave,
  className = '',
  autoFocus = false,
  placeholder = 'Placeholder',
  autoComplete = 'on',
}: EditableInputProps) {
  const [isEdit, toggleIsEdit] = React.useState(false);

  const mergedClassName = clsx(styles.editableInput, className);

  const toggleEdit = React.useCallback(() => {
    toggleIsEdit((prev) => !prev);
  }, []);

  const handleChangeName = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isEdit) {
        onSave(e.target.value);
      }
    },
    [onSave, isEdit],
  );

  return (
    <input
      className={mergedClassName}
      type="text"
      value={title}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      placeholder={placeholder}
      onBlur={toggleEdit}
      onFocus={toggleEdit}
      onChange={handleChangeName}
    />
  );
}

export default EditableInput;
