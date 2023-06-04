import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './App.module.scss';
import StoreProvider, { StoreContext } from '../../stores/TreeStore';
import TreeTask from '../TreeTask/TreeTask';
import TaskEditor from '../TaskEditor/TaskEditor';
import AddNewTaskModal from '../AddNewTaskModal/AddNewTaskModal';

function App() {
  const store = React.useContext(StoreContext);

  const handleAddNewRootTask = React.useCallback(() => {
    store.parentIdNewTask = 'root';
    store.prevIdNewTask = 'root';
    store.openModal();
  }, [store]);

  const handleDeleteCheckedItems = React.useCallback(() => {
    store.deleteCheckedItems();
  }, [store]);

  return (
    <>
      <div className={styles.wrapper}>
        <StoreProvider>
          <button type="button" onClick={handleAddNewRootTask}>
            Добавить новую задачу
          </button>
          <button type="button" onClick={handleDeleteCheckedItems}>
            Удалить выбранные задачи
          </button>
          <TreeTask />
          <TaskEditor />
        </StoreProvider>
      </div>
      {store.isModalOpen && <AddNewTaskModal />}
      <div id="portalRoot" />
    </>
  );
}

export default observer(App);
