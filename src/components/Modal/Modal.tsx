import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

import Portal from '../Portal/Portal';
import styles from './Modal.module.scss';
import IconWithAction from '../IconWithAction/IconWithAction';

interface ModalPanelProps {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: ModalPanelProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose, modalRef],
  );

  const handleKeyboardPress = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose],
  );

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyboardPress);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyboardPress);
    };
  }, [handleClickOutside, handleKeyboardPress]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.modalHeader}>
            <IconWithAction onClick={handleClose}>
              <BsPlusLg className={styles.closeIcon} />
            </IconWithAction>
          </div>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
