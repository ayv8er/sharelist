import { useState } from "react";
import axios from "axios";

import { useUserContext } from "../store/user-context";
import { useListContext } from "../store/list-context";

import { Accordion } from "react-bootstrap";

const AddList = () => {
  const [listName, setListName] = useState("");
  const [, setList] = useListContext();
  const { userMetadata } = useUserContext();

  const listNameChangeHandler = (e) => {
    setListName(e.target.value);
  };

  const addListHandler = async () => {
    const data = {
      creator_id: userMetadata.phoneNumber,
      list_items: [],
      list_name: listName,
      shared_id: [],
    };
    await axios.post("/api/lists/list", data).then((res) => {
      if (res.data.acknowledged === true) {
        data.id = res.data.insertedId;
        setList((prevState) => {
          return [...prevState, data];
        });
      }
    });
    setListName("");
  };

  return (
    <Accordion.Item>
      <Accordion.Header>Create New List</Accordion.Header>
      <Accordion.Body>
        <div className="d-flex justify-content-between text-white border rounded p-2">
          <input
            type="text"
            style={{ width: "80%" }}
            value={listName}
            onChange={listNameChangeHandler}
            placeholder="Name of List"
          />
          <span
            onClick={addListHandler}
            className="d-flex align-items-center px-2 border rounded"
          >
            &#8853;
          </span>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AddList;
