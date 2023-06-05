import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { BsChevronDown, BsListNested, BsPlus, BsPlusLg, BsTrash3 } from 'react-icons/bs';

import styles from './ItemList.module.scss';
import EditableInput from '../EditableInput/EditableInput';
import { StoreContext } from '../../stores/TreeStore';
import { ListItem, Node } from '../../types';
import IconWithAction from '../IconWithAction/IconWithAction';

interface ItemListProps {
  item: ListItem;
  children: Node<ListItem>[];
}

const ItemList = observer(
  ({
    item: { title = '', checked, expanded = false, id, parentId },
    children,
  }: ItemListProps) => {
    const store = useContext(StoreContext);

    const toggleExpanded = React.useCallback(() => {
      store.toggleExpandedTask(id);
    }, [store, id]);

    const toggleCheck = React.useCallback(() => {
      store.toggleCheckTask(id, !checked);
    }, [store, id, checked]);

    const handleSave = React.useCallback(
      (newTitle: string) => {
        // eslint-disable-next-line react/destructuring-assignment
        store.changeTaskTitle(newTitle, id);
      },
      [id, store],
    );
    const handleAddNestedItem = React.useCallback(() => {
      store.parentIdNewTask = id;
      store.prevIdNewTask = id;
      store.openModal();
    }, [store, id]);

    const handleAddItem = React.useCallback(() => {
      store.parentIdNewTask = parentId;
      store.prevIdNewTask = id;
      store.openModal();
    }, [store, parentId, id]);

    const handleSelectItem = React.useCallback(() => {
      store.setActiveItemId(id);
    }, [store, id]);

    const handleDeleteItem = React.useCallback(() => {
      store.deleteItem(parentId, id);
    }, [store, parentId, id]);

    const nextItems = children?.map((child) => (
      // eslint-disable-next-line
      <ItemList key={uuid()} {...child} />
    ));

    if (id === 'root') {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{nextItems}</>;
    }

    return (
      <>
        <li
          className={parentId === 'root' ? styles.rootItem : styles.item}
          /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
          tabIndex={0}
          onFocus={handleSelectItem}
          draggable
        >
          {!!children?.length && (
            <IconWithAction onClick={toggleExpanded}>
              <BsChevronDown />
            </IconWithAction>
          )}
          <EditableInput
            title={title}
            onSave={handleSave}
            placeholder="Название задачи"
          />
          <div className={styles.itemControls}>
            <input type="checkbox" onChange={toggleCheck} checked={checked} />
            <IconWithAction onClick={handleAddNestedItem}>
              <div className={styles.addNestedIcon}>
                <BsPlus className={styles.plus} />
                <BsListNested />
              </div>
            </IconWithAction>
            <IconWithAction onClick={handleAddItem}>
              <BsPlusLg />
            </IconWithAction>
            <IconWithAction onClick={handleDeleteItem}>
              <BsTrash3 />
            </IconWithAction>
          </div>
        </li>
        {expanded && <ul className={styles.nextLevel}>{nextItems}</ul>}
      </>
    );
  },
);

export default ItemList;
