import React from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../stores/TreeStore';

function TaskEditor() {
  const store = React.useContext(StoreContext);

  const activeItemId = store.idActiveItem;
  const activeItem = store.getTaskById(activeItemId);

  return (
    <div>
      {activeItem?.item.title}
      {activeItem?.item.description}
    </div>
  );
}

export default observer(TaskEditor);
