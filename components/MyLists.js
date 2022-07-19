import ListItems from "./ListItems";
import AddList from "./AddList";
import { useListContext } from "../store/list-context";
import { Container, Accordion } from "react-bootstrap";

const MyLists = () => {
  const [list] = useListContext();

  return (
    <Container className="mt-4">
      <p className="text-center mb-1">My Lists</p>
      <Accordion>
        <AddList />
        {list.map((l) => {
          return (
            <Accordion.Item eventKey={l.id} key={l.id}>
              <Accordion.Header>{l.list_name}</Accordion.Header>
              <Accordion.Body>
                <ListItems
                  listId={l.id}
                  listItems={l.list_items}
                  creatorId={l.creator_id}
                />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default MyLists;
