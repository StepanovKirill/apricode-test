import { ListItem, Node } from '../types';

export default function applyFuncToAllChild(
  root: Node<ListItem>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
  ...args: any[]
) {
  const changedItems: Array<{ parentId: string; id: string }> = [];
  const stack = [...root.children];

  while (stack.length) {
    const item = stack.pop();

    if (item) {
      if (item.children.length) stack.push(...item.children);
      changedItems.push({ parentId: item.item.parentId, id: item.item.id });

      callback(item, ...args);
    }
  }

  return changedItems;
}
