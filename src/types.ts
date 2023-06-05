export type ListItem = {
  id: string;
  parentId: string;
  title?: string;
  description?: string;
  checked?: boolean;
  expanded?: boolean;
};

export type Node<T> = {
  item: T;
  children: Node<T>[];
};

export default {};
