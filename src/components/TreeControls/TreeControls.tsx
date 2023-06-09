import React from 'react';
import { observer } from 'mobx-react-lite';
import { BsCheckAll, BsPlusLg } from 'react-icons/bs';

import { StoreContext } from '../../stores/TreeStore';
import styles from './TreeControls.module.scss';
import Button from '../Button/Button';

const TreeControls = observer(() => {
  const store = React.useContext(StoreContext);

  const handleAddNewRootTask = React.useCallback(() => {
    store.parentIdNewTask = 'root';
    store.prevIdNewTask = 'root';
    store.openModal();
  }, [store]);

  const handleDeleteCheckedItems = React.useCallback(() => {
    store.deleteCheckedItems();
  }, [store]);

  const handleDeleteAllItems = React.useCallback(() => {
    store.deleteAllItems();
  }, [store]);

  const handleCheckAllItems = React.useCallback(() => {
    store.checkAllItems();
  }, [store]);

  return (
    <div className={styles.buttonGroup}>
      <Button onClick={handleAddNewRootTask}>
        <BsPlusLg />
      </Button>
      <Button onClick={handleCheckAllItems}>
        <BsCheckAll />
      </Button>
      <Button onClick={handleDeleteCheckedItems} disabled={!store.checkedItems.length}>
        Удалить выбранные
      </Button>

      <Button onClick={handleDeleteAllItems}>Очистить</Button>
    </div>
  );
});

export default TreeControls;
