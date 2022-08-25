import { useState, memo } from "react";
import { useSession } from "next-auth/react";

const Items = ({ item, deleteListItem, list_id, creator_id }) => {
  const [selected, setSelected] = useState(false);
  const { data: session } = useSession();

  const selectedHandler = () => {
    setSelected(!selected);
  };

  const deleteItemHandler = () => {
    deleteListItem(...Object.keys(item), list_id);
  };

  return (
    <div className="d-flex justify-content-between text-white border rounded p-2">
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center px-2 mx-1">{`$${Object.values(
          item
        )}`}</span>
        {session.user.name === creator_id ? (
          <span
            onClick={deleteItemHandler}
            className="d-flex align-items-center cursor-pointer px-1 mx-2"
          >
            &#9447;
          </span>
        ) : null}
      </div>
      <span
        className={
          selected ? "px-3 text-decoration-line-through fw-light" : "px-3"
        }
      >{`${Object.keys(item)}`}</span>
      <span
        onClick={selectedHandler}
        className="d-flex align-items-center cursor-pointer px-2"
      >
        &#8854;
      </span>
    </div>
  );
};

export default memo(Items);
