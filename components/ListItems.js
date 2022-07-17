import { useState } from "react";
import axios from "axios";
import DeleteList from "./DeleteList";
import AddItem from "./AddItem";
import Item from "./Item";
import { useAuthContext } from "../store/auth-context";
import { useListContext } from "../store/list-context";

const ListItems = ({ listItems, listId, creatorId }) => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [list, setList] = useListContext();
  const { userMetadata } = useAuthContext();

  const deleteListItem = async (objKey, id) => {
    const newList = listItems.filter((item) => {
      return Object.keys(item) != objKey;
    });
    await axios
      .delete("/api/lists/list-items", { data: { id, newList } })
      .then((res) => {
        if (res.data.acknowledged === true) {
          list.map((l) => {
            if (l.id === id) {
              l.list_items = newList;
            }
          });
          const updatedList = [...list];
          setList(updatedList);
        }
      });
  };

  const addListItem = async () => {
    await axios
      .post("/api/lists/list-items", {
        item: { name, price },
        listId,
      })
      .then((res) => {
        if (res.data.acknowledged === true) {
          const newItem = {};
          newItem[name] = price;
          list.map((l) => {
            if (l.id === listId) {
              l.list_items.unshift(newItem);
            }
          });
          const updatedList = [...list];
          setList(updatedList);
        }
      });
    setPrice("");
    setName("");
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
          <Item
            deleteListItem={deleteListItem}
            listId={listId}
            item={item}
            key={index}
          />
        );
      })}
      {userMetadata.phoneNumber === creatorId ? (
        <DeleteList listId={listId} />
      ) : null}
    </>
  );
};

export default ListItems;
