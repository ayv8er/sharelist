import AddList from "./AddList";
import ListHeaderBody from "../BothLists/ListHeaderBody";
import { useListContext } from "../../store/list-context";
import { Accordion } from "react-bootstrap";

const MyLists = () => {
  const { myLists } = useListContext();
  return (
    <Accordion>
      <AddList />
      {myLists.map((list) => {
        return (
          <Accordion.Item eventKey={list.id} key={list.id}>
            <ListHeaderBody
              list_id={list.id}
              list_name={list.list_name}
              list_items={list.list_items}
              creator_id={list.creator_id}
            />
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default MyLists;
