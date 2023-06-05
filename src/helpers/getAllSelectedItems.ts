import { ListItem, Node } from '../types';

function getAllSelectedItems(item: Node<ListItem>) {
  const stack = [...item.children];
  const res = [];

  while (stack.length) {
    const child = stack.pop();
    if (child && child?.item.checked) {
      res.push({ parentId: child.item.parentId, id: child.item.id });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    child && stack.push(...child.children);
  }

  return res;
}

export default getAllSelectedItems;
