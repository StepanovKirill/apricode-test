import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

import styles from './ClearableInput.module.scss';
import IconWithAction from '../IconWithAction/IconWithAction';

interface ClearableInputProps {
  onSearch: (searchRes: string) => void;
  onClear: () => void;
  placeholder?: string;
}

function ClearableInput({
  onSearch,
  onClear,
  placeholder = 'Поиск...',
}: ClearableInputProps) {
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);

      if (e.target.value) {
        onSearch(e.target.value);
      } else {
        onClear();
      }
    },
    [onSearch, onClear],
  );

  const handleClearSearch = React.useCallback(() => {
    setValue('');
    onClear();
  }, [onClear]);

  const handleBlurInput = React.useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const handleFocusInput = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          onSearch(value);
          break;
        case 'Escape':
          handleClearSearch();
          handleBlurInput();
          break;
        default:
      }
    },
    [value, onSearch, handleClearSearch, handleBlurInput],
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        ref={inputRef}
        onKeyDown={handleSearch}
        className={styles.input}
      />
      {!value && <div className={styles.emptyBox} />}
      {!!value && (
        <IconWithAction onClick={handleClearSearch} className={styles.clearIconContainer}>
          <BsPlusLg className={styles.clearIcon} />
        </IconWithAction>
      )}
      {}
    </div>
  );
}

export default ClearableInput;
