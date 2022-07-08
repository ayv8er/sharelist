const AddItem = (props) => {
  const { name, setName, price, setPrice, addListItem } = props;

  const priceChangeHandler = (e) => {
    const numPrice = Number(e.target.value);
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
        placeholder="name"
      />
      <span onClick={addItemHandler} className="d-flex align-items-center px-2">
        &#8853;
      </span>
    </div>
  );
};

export default AddItem;
