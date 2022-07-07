import ListItems from "./ListItems";

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
        {list.map((list) => {
          return (
            <Accordion.Item eventKey={list.id} key={list.id}>
              <Accordion.Header>{list.list_name}</Accordion.Header>
              <Accordion.Body>
                <ListItems listId={list.id} listItems={list.list_items} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default MyLists;
