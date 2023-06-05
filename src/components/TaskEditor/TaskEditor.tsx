import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './TaskEditor.module.scss';
import { StoreContext } from '../../stores/TreeStore';
import EditableInput from '../EditableInput/EditableInput';
import TextArea from '../TextArea/TextArea';

function TaskEditor() {
  const store = React.useContext(StoreContext);

  const { activeItemId } = store;

  const activeItem = store.getTaskById(activeItemId)?.item;

  const handleChangeDescription = React.useCallback(
    (newDescription: string) => {
      store.changeTaskDescription(newDescription, activeItemId);
    },
    [store, activeItemId],
  );

  const handleChangeTitle = React.useCallback(
    (newTitle: string) => {
      store.changeTaskTitle(newTitle, activeItemId);
    },
    [store, activeItemId],
  );

  return (
    <section className={styles.editorWrapper}>
      <EditableInput
        title={activeItem?.title || ''}
        onSave={handleChangeTitle}
        className={styles.titleEditor}
        placeholder="Название задачи"
      />
      <TextArea
        value={activeItem?.description}
        onChange={handleChangeDescription}
        placeholder="Описание задачи"
      />
    </section>
  );
}

export default observer(TaskEditor);
