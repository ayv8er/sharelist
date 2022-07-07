import { useState } from "react";

const Items = ({ item, deleteListItem, listId }) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
  };

  const handleDelete = () => {
    deleteListItem(...Object.keys(item), listId);
  };

  return (
    <div className="d-flex justify-content-between text-white border rounded p-2">
      <div>
        <span className="px-2 mx-1 border rounded">{`$${Object.values(
          item
        )}`}</span>
        <span onClick={handleDelete} className="px-1 mx-2 border rounded">
          &#9447;
        </span>
      </div>
      <span
        className={
          selected ? "px-3 text-decoration-line-through fw-light" : "px-3"
        }
      >{`${Object.keys(item)}`}</span>

      <span onClick={handleSelected} className="px-2 border rounded">
        &#8854;
      </span>
    </div>
  );
};

export default Items;
