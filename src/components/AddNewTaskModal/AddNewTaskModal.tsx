import React from 'react';

import styles from './AddNewTaskModal.module.scss';
import Modal from '../Modal/Modal';
import { StoreContext } from '../../stores/TreeStore';

function AddNewTaskModal() {
  const store = React.useContext(StoreContext);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleDescriptionChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    [],
  );

  const handleAddNewTask = React.useCallback(() => {
    store.addItem(title, description);
    setTitle('');
    setDescription('');
  }, [store, title, description]);

  const handleCloseModal = React.useCallback(() => {
    store.closeModal();
  }, [store]);

  return (
    <Modal isOpen={store.isModalOpen} handleClose={handleCloseModal}>
      <div className={styles.container}>
        <input
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Название задачи"
          autoComplete="off"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Что нужно сделать?"
        />
        <button type="button" onClick={handleAddNewTask}>
          Создать задачу
        </button>
      </div>
    </Modal>
  );
}

export default AddNewTaskModal;
