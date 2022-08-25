import { memo } from "react";

const AddItem = (props) => {
  const {
    price,
    setPrice,
    name,
    setName,
    addListItem,
    isEmptyItemNameSubmitted,
  } = props;

  const priceChangeHandler = (e) => {
    if (isNaN(e.target.value) === true) {
      return;
    }
    const numPrice = +e.target.value;
    setPrice(numPrice);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const addItemHandler = () => {
    addListItem();
  };

  return (
    <div className="d-flex justify-content-between text-white border rounded p-2">
      <input
        type="text"
        style={{ width: "20%" }}
        value={price}
        onChange={priceChangeHandler}
        placeholder="price"
      />
      <input
        type="text"
        style={{ width: "50%" }}
        value={name}
        onChange={nameChangeHandler}
        placeholder={isEmptyItemNameSubmitted ? "Item needs a name" : "name"}
      />
      <span
        onClick={addItemHandler}
        className="d-flex cursor-pointer align-items-center px-2"
      >
        &#8853;
      </span>
    </div>
  );
};

export default memo(AddItem);
