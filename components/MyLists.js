import ListItems from "./ListItems";
import { useUserContext } from "../store/user-context";
import { Container, Accordion } from "react-bootstrap";

const fakeData = [
  {
    userId: "did:eth0xyoonji9088",
    listId: "01",
    listName: "walmart",
    listItems: ["blueberry", "steak", "bread", "eggs"],
  },
  {
    userId: "did:eth0xyoonji19088",
    listId: "02",
    listName: "target",
    listItems: ["ryans clothes", "gyoza", "paw patrol"],
  },
];

const MyLists = () => {
  const { userMetadata } = useUserContext();

  if (!userMetadata) {
    return <div className="mt-5 text-white min-vh-90">Loading My Lists...</div>;
  }

  return (
    <Container fluid className="mt-4">
      <p className="text-center mb-1">My Lists</p>
      <Accordion>
        {fakeData.map((list) => {
          return (
            <Accordion.Item
              className=""
              eventKey={list.listId}
              key={list.listId}
            >
              <Accordion.Header>{list.listName}</Accordion.Header>
              <Accordion.Body>
                <ListItems list={list.listItems} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export async function getStaticProps() {
  const res = await fetch("/api/lists");

  return {
    props: {
      lists,
    },
  };
}

export default MyLists;
