import React, { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

import { ListItem, Node } from '../types';
import saveTasks from '../helpers/saveTasks';
import applyFuncToAllChild from '../helpers/applyFuncToAllChild';
import checkSelectAllChildren from '../helpers/checkSelectAllChildren';

function toggleCheck(item: Node<ListItem>, chk: boolean) {
  // eslint-disable-next-line no-param-reassign
  item.item.checked = chk;
}

function closeSubTask(item: Node<ListItem>) {
  // eslint-disable-next-line no-param-reassign
  item.item.expanded = false;
}

function toggleSubTask(item: Node<ListItem>, expanded = false) {
  // eslint-disable-next-line no-param-reassign
  item.item.expanded = expanded;
}

class TreeStore {
  tree: Node<ListItem> = {} as Node<ListItem>;

  checkedItems: Array<{ parentId: string; id: string }> = [];

  idActiveItem = '';

  isModalOpen = false;

  parentIdNewTask = '';

  prevIdNewTask = '';

  constructor() {
    this.initializeStore();
    this.toggleCheckTask = this.toggleCheckTask.bind(this);
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  initializeStore() {
    const data = localStorage.getItem('tasks');

    if (!data) {
      const rootNode: Node<ListItem> = {
        item: {
          id: 'root',
          parentId: '',
        },
        children: [],
      };

      saveTasks(rootNode);

      this.tree = rootNode;
    } else {
      this.tree = JSON.parse(data) as Node<ListItem>;
    }
  }

  addItem(title: string, description: string) {
    const parent = this.getTaskById(this.parentIdNewTask);

    const newTask = {
      item: {
        id: uuid(),
        title,
        parentId: this.parentIdNewTask,
        description,
        checked: parent?.item.checked,
        expanded: false,
      },
      children: [],
    };
    if (parent) {
      parent.item.expanded = true;

      if (this.parentIdNewTask === this.prevIdNewTask) {
        parent.children.push(newTask);
      } else {
        const len = parent?.children?.length || 0;
        for (let i = 0; i < len; i += 1) {
          if (parent.children[i]?.item.id === this.prevIdNewTask) {
            parent.children.splice(i, 0, newTask);
            break;
          }
        }
      }
    }
    this.parentIdNewTask = '';
    this.prevIdNewTask = '';
    this.isModalOpen = false;

    saveTasks(this.tree);
  }

  deleteItem(parentId: string, id: string) {
    const parent = this.getTaskById(parentId);

    if (parent) {
      parent.children = parent?.children.filter((item) => item.item.id !== id);
      saveTasks(this.tree);
    }
  }

  deleteCheckedItems() {
    this.checkedItems.forEach((item) => {
      this.deleteItem(item.parentId, item.id);
    });
    this.checkedItems = [];
  }

  getTaskById(id: string) {
    const stack = [this.tree];

    while (stack.length) {
      const item = stack.pop();

      if (item && item.item && item.item.id === id) {
        return item;
      }
      stack.push(...(item?.children || []));
    }
    return null;
  }

  changeTaskTitle(newTitle: string, id: string) {
    const task = this.getTaskById(id);
    if (task) {
      task.item.title = newTitle;
      saveTasks(this.tree);
    }
  }

  changeTaskDescription(newDescription: string, id: string) {
    const task = this.getTaskById(id);
    if (task) {
      task.item.description = newDescription;
      saveTasks(this.tree);
    }
  }

  toggleExpandedTask(id: string) {
    const task = this.getTaskById(id);
    if (task) {
      task.item.expanded = !task.item.expanded;
      if (!task.item.expanded) {
        applyFuncToAllChild(task, closeSubTask);
      }
      saveTasks(this.tree);
    }
  }

  openAllTask() {
    applyFuncToAllChild(this.tree, toggleSubTask, !this.tree.item.expanded);
  }

  toggleCheckTask(id: string, check = false) {
    const task = this.getTaskById(id);
    if (task) {
      task.item.checked = check;

      this.checkedItems.push({ parentId: task.item.parentId, id: task.item.id });
      if (check) {
        this.checkedItems.push(...applyFuncToAllChild(task, toggleCheck, check));
      } else {
        this.checkedItems = this.checkedItems.filter((item) => item.id !== id);
      }
      this.applyFuncToAllParent(task, this.checkNestedSelect);
    }

    saveTasks(this.tree);
  }

  checkNestedSelect(item: Node<ListItem>) {
    let parent: Node<ListItem> | null = item;
    while (parent) {
      if (checkSelectAllChildren(parent)) {
        parent.item.checked = true;
      } else {
        parent.item.checked = false;
      }

      parent = this.getTaskById(parent.item.parentId);
    }
  }

  setActiveItemId(id: string) {
    this.idActiveItem = id;
  }

  clearActiveItemId() {
    this.idActiveItem = '';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  applyFuncToAllParent(child: Node<ListItem>, callback: Function, ...args: any[]) {
    let { parentId } = child.item;

    while (parentId) {
      const item = this.getTaskById(parentId);

      if (!item) {
        break;
      }
      callback(item, ...args);
      parentId = item?.item.parentId;
    }
  }
}

const rootStore = new TreeStore();

export type TreeStoreType = TreeStore;

export const StoreContext = createContext<TreeStore>(rootStore);

interface StoreProviderProps {
  children: React.ReactNode;
}

function StoreProvider({ children }: StoreProviderProps) {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}

export default StoreProvider;
