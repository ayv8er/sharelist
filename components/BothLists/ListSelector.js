const ListSelector = ({ viewingList, setViewingList }) => {
  const clickHandler = (listName) => {
    setViewingList(listName);
  };

  return (
    <div className="d-flex justify-content-evenly">
      <div
        onClick={() => clickHandler("my")}
        className={
          viewingList === "my"
            ? "w-50 d-flex justify-content-center cursor-pointer py-1 border rounded"
            : "w-50 d-flex justify-content-center cursor-pointer py-1"
        }
      >
        My Lists
      </div>
      <div
        onClick={() => clickHandler("shared")}
        className={
          viewingList === "shared"
            ? "w-50 d-flex justify-content-center cursor-pointer py-1 border rounded"
            : "w-50 d-flex justify-content-center cursor-pointer py-1"
        }
      >
        Shared Lists
      </div>
    </div>
  );
};

export default ListSelector;
