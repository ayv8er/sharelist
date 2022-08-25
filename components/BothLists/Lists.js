import { useState } from "react";
import MyLists from "../MyLists/MyLists";
import MySharedLists from "../SharedLists/MySharedLists";
import ListSelector from "./ListSelector";
import { Container } from "react-bootstrap";

const Lists = () => {
  const [viewingList, setViewingList] = useState("my");

  return (
    <Container className="mt-4">
      <ListSelector viewingList={viewingList} setViewingList={setViewingList} />
      {viewingList === "my" && <MyLists />}
      {viewingList === "shared" && <MySharedLists />}
    </Container>
  );
};

export default Lists;
