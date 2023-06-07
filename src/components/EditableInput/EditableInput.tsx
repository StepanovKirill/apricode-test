import React from 'react';
import clsx from 'clsx';
import { BsFillPencilFill } from 'react-icons/bs';

import styles from './EditableInput.module.scss';
import IconWithAction from '../IconWithAction/IconWithAction';

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

  const handleToggleEdit = React.useCallback(() => {
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
      onBlur={handleToggleEdit}
      onFocus={handleToggleEdit}
      onChange={handleChangeName}
    />
  );
}

export default EditableInput;
