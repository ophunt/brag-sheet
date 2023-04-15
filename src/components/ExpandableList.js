import './ExpandableList.scss'

import { Button } from 'react-bootstrap';

export default function ExpandableList({ itemCategoryName = "Item", list, setItem, addItem, removeItem }) {
  return (
    <ul>
      {list.map((item, index) =>
        <li className='existingBullet' key={item.id}>
          <input value={item.name} onChange={(e) => setItem(index, e.target.value)} />
          <Button variant='outline-danger' size='sm' onClick={() => removeItem(index)}>x</Button>
        </li>
      )}
      <li className='addNewBullet' onClick={addItem}>
        Add New {itemCategoryName}
      </li>
    </ul>
  )
}
