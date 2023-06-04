import { Node } from '../types';

function saveTasks<T extends object>(data: Node<T>) {
  localStorage.setItem('tasks', JSON.stringify(data));
}

export default saveTasks;
