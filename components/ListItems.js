import { useState } from "react";
import axios from "axios";

import AddItem from "./AddItem";
import Items from "./Item";

const ListItems = ({ listItems, listId }) => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const deleteListItem = async (objKey, id) => {
    const newList = listItems.filter((item) => {
      return Object.keys(item) != objKey;
    });
    const res = await axios
      .put("/api/lists/list", {
        id,
        newList,
      })
      .then((resp) => {
        console.log(res);
      });
  };

  const addListItem = async () => {
    const res = await axios
      .post("/api/lists/list-router", {
        item: { name, price },
        listId,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <AddItem
        price={price}
        setPrice={setPrice}
        name={name}
        setName={setName}
        addListItem={addListItem}
      />
      {listItems.map((item, index) => {
        return (
          <Items
            deleteListItem={deleteListItem}
            listId={listId}
            item={item}
            key={index}
          />
        );
      })}
    </>
  );
};

export default ListItems;
