import { ListItem, Node } from '../types';

function checkSelectAllChildren(item: Node<ListItem>) {
  const stack = [...item.children];

  while (stack.length) {
    const child = stack.pop();
    if (child && !child?.item.checked) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    child && stack.push(...child.children);
  }

  return true;
}

export default checkSelectAllChildren;
