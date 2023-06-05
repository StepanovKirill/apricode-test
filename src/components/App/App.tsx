import React from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import styles from './App.module.scss';
import StoreProvider, { StoreContext } from '../../stores/TreeStore';
import TreeTask from '../TreeTask/TreeTask';
import TaskEditor from '../TaskEditor/TaskEditor';
import AddNewTaskModal from '../AddNewTaskModal/AddNewTaskModal';

function App() {
  const store = React.useContext(StoreContext);

  return (
    <>
      <div className={styles.wrapper}>
        <StoreProvider>
          <main className={styles.main}>
            <TreeTask />
            <TaskEditor />
          </main>
        </StoreProvider>
      </div>
      {store.isModalOpen && <AddNewTaskModal />}
      <div id="portalRoot" />
    </>
  );
}

export default observer(App);
