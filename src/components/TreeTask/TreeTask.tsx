import React from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import styles from './TreeTask.module.scss';
import ItemList from '../ItemList/ItemList';
import { StoreContext } from '../../stores/TreeStore';
import TreeControls from '../TreeControls/TreeControls';

const TreeTask = observer(() => {
  const store = React.useContext(StoreContext);
  const { tree, searchResults, searchString } = store;

  return (
    <section className={styles.wrapper}>
      <TreeControls />
      <ul className={styles.threeContainer}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ItemList key={uuid()} {...(searchString ? searchResults : tree)} />
      </ul>
    </section>
  );
});

export default TreeTask;
