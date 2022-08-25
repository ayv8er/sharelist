import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useListContext } from "../../store/list-context";
import { Accordion } from "react-bootstrap";

const AddList = () => {
  const [isEmptyListNameSubmitted, setIsEmptyListNameSubmitted] =
    useState(false);
  const [listName, setListName] = useState("");
  const { setMyLists } = useListContext();
  const { data: session } = useSession();

  const listNameChangeHandler = (e) => {
    if (isEmptyListNameSubmitted) {
      setIsEmptyListNameSubmitted(false);
    }
    setListName(e.target.value);
  };

  const addListHandler = async () => {
    if (listName.trim() === "") {
      setIsEmptyListNameSubmitted(true);
      setListName("");
      return;
    }
    const data = {
      creator_id: session.user.name,
      list_items: [],
      list_name: listName,
      shared_id: [],
    };
    await axios.post("/api/auth/lists/update-lists", data).then((res) => {
      if (res.data.acknowledged === true) {
        data.id = res.data.insertedId;
        setMyLists((prevState) => {
          return [...prevState, data];
        });
      }
    });
    setListName("");
  };

  return (
    <Accordion.Item>
      <Accordion.Header>Add New List</Accordion.Header>
      <Accordion.Body>
        <div className="d-flex justify-content-between text-white border rounded p-2">
          <input
            type="text"
            style={{ width: "80%" }}
            value={listName}
            onChange={listNameChangeHandler}
            placeholder={
              isEmptyListNameSubmitted ? "List needs a name" : "Name of List"
            }
          />
          <span
            onClick={addListHandler}
            className="d-flex cursor-pointer align-items-center px-2 border rounded"
          >
            &#8853;
          </span>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AddList;
