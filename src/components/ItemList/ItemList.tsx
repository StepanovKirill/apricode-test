import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import styles from './ItemList.module.scss';
import EditableInput from '../EditableInput/EditableInput';
import { StoreContext } from '../../stores/TreeStore';
import { ListItem, Node } from '../../types';

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

    const nextItems = (
      <ul className={styles.nextLevel}>
        {children?.map((child) => (
          // eslint-disable-next-line
          <ItemList key={uuid()} {...child}>
            {child.children}
          </ItemList>
        ))}
      </ul>
    );

    if (id === 'root') {
      return nextItems;
    }

    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <li className={styles.item} tabIndex={0} onFocus={handleSelectItem} draggable>
          <div className={styles.item}>
            <EditableInput title={title} onSave={handleSave} />
            <input type="checkbox" onChange={toggleCheck} checked={checked} />
            <button type="button" onClick={toggleExpanded}>
              {!!children?.length && (expanded ? 'V' : '>')}
            </button>
            <button type="button" onClick={handleAddNestedItem}>
              Добавить подзадачу
            </button>
            <button type="button" onClick={handleAddItem}>
              Добавить задачу
            </button>
            <button type="button" onClick={handleDeleteItem}>
              Удалить эту задачу
            </button>
          </div>
        </li>
        {expanded && nextItems}
      </>
    );
  },
);

export default ItemList;
