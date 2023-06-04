import React from 'react';

interface EditableInputProps {
  title: string;
  onSave: (newValue: string) => void;
}

function EditableInput({ title, onSave }: EditableInputProps) {
  const [isEdit, toggleIsEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggleEdit = React.useCallback(() => {
    if (isEdit) {
      onSave(newTitle);
    }

    toggleIsEdit((prev) => !prev);
  }, [isEdit, newTitle, onSave]);

  const handleChangeName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }, []);

  return (
    <input
      type="text"
      ref={inputRef}
      placeholder="Новая задача"
      value={newTitle}
      onBlur={toggleEdit}
      onFocus={toggleEdit}
      onChange={handleChangeName}
    />
  );
}

export default EditableInput;
