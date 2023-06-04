import React from 'react';

import Portal from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalPanelProps {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: ModalPanelProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.modal}>
        <button type="button" onClick={handleClose} className="close-btn">
          Close
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
