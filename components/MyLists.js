import ListItems from "./ListItems";
import AddList from "./AddList";

import { useListContext } from "../store/list-context";
import { useUserContext } from "../store/user-context";

import { Container, Accordion, Spinner } from "react-bootstrap";

const MyLists = () => {
  const { userMetadata } = useUserContext();
  const [list] = useListContext();

  if (!userMetadata) {
    return (
      <div className="pt-5 mt-5 text-white min-vh-90">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <Container fluid className="mt-4">
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
