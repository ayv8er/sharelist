import { useState, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import ShareList from "../MyLists/ShareList";
import DeleteList from "../MyLists/DeleteList";
import AddItem from "../MyLists/AddItem";
import Item from "../BothLists/Item";
import { useListContext } from "../../store/list-context";

const ListItems = ({ list_items, list_id, creator_id }) => {
  const [isEmptyItemNameSubmitted, setIsEmptyItemNameSubmitted] =
    useState(false);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const { myLists, setMyLists } = useListContext();
  const { data: session, status } = useSession();

  const deleteListItem = useCallback(async (objKey, id) => {
    const newList = list_items.filter((item) => {
      return Object.keys(item) != objKey;
    });
    await axios
      .delete("/api/auth/lists/update-list-items", { data: { id, newList } })
      .then((res) => {
        if (res.data.acknowledged === true) {
          myLists.map((l) => {
            if (l.id === id) {
              l.list_items = newList;
            }
          });
          const updatedList = [...myLists];
          setMyLists(updatedList);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addListItem = async () => {
    if (name.trim() === "") {
      setIsEmptyItemNameSubmitted(true);
      setName("");
      return;
    }
    let item = { name, price };
    if (price === "") {
      item = { name, price: "0" };
    }
    await axios
      .post("/api/auth/lists/update-list-items", {
        item,
        list_id,
      })
      .then((res) => {
        if (res.data.acknowledged === true) {
          const newItem = {};
          if (price === "") {
            newItem[name] = "0";
          } else {
            newItem[name] = price;
          }
          myLists.map((l) => {
            if (l.id === list_id) {
              l.list_items.unshift(newItem);
            }
          });
          const updatedList = [...myLists];
          setMyLists(updatedList);
        }
      });
    setPrice("");
    setName("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  if (status === "loading") {
    return <></>;
  }

  return (
    <>
      {session.user.name === creator_id ? (
        <AddItem
          price={price}
          setPrice={setPrice}
          name={name}
          setName={setName}
          addListItem={addListItem}
          isEmptyItemNameSubmitted={isEmptyItemNameSubmitted}
        />
      ) : null}

      {list_items.map((item, index) => {
        return (
          <Item
            deleteListItem={deleteListItem}
            creator_id={creator_id}
            list_id={list_id}
            item={item}
            key={index}
          />
        );
      })}
      {session.user.name === creator_id ? (
        <div className="d-flex justify-content-around">
          <ShareList list_id={list_id} />
          <DeleteList list_id={list_id} />
        </div>
      ) : null}
    </>
  );
};

export default ListItems;
