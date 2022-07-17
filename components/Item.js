import { useState } from "react";

const Items = ({ item, deleteListItem, listId }) => {
  const [selected, setSelected] = useState(false);

  const selectedHandler = () => {
    setSelected(!selected);
  };

  const deleteItemHandler = () => {
    deleteListItem(...Object.keys(item), listId);
  };

  return (
    <div className="d-flex justify-content-between text-white border rounded p-2">
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center px-2 mx-1">{`$${Object.values(
          item
        )}`}</span>
        <span
          onClick={deleteItemHandler}
          className="d-flex align-items-center px-1 mx-2"
        >
          &#9447;
        </span>
      </div>
      <span
        className={
          selected ? "px-3 text-decoration-line-through fw-light" : "px-3"
        }
      >{`${Object.keys(item)}`}</span>
      <span
        onClick={selectedHandler}
        className="d-flex align-items-center px-2"
      >
        &#8854;
      </span>
    </div>
  );
};

export default Items;
