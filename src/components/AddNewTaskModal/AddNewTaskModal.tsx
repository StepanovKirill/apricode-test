import React from 'react';

import styles from './AddNewTaskModal.module.scss';
import Modal from '../Modal/Modal';
import { StoreContext } from '../../stores/TreeStore';
import TextArea from '../TextArea/TextArea';
import EditableInput from '../EditableInput/EditableInput';
import Button from '../Button/Button';

function AddNewTaskModal() {
  const store = React.useContext(StoreContext);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleTitleChange = React.useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleDescriptionChange = React.useCallback((newDescription: string) => {
    setDescription(newDescription);
  }, []);

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
        <EditableInput
          className={styles.titleInput}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
          title={title}
          onSave={handleTitleChange}
          placeholder="Название задачи"
          autoComplete="off"
        />
        <TextArea
          value={description}
          onChange={handleDescriptionChange}
          className={styles.descriptionInput}
          placeholder="Описание задачи"
        />
        <Button onClick={handleAddNewTask} className={styles.createButton}>
          Создать задачу
        </Button>
      </div>
    </Modal>
  );
}

export default AddNewTaskModal;
