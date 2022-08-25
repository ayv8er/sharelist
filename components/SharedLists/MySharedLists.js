import Image from "next/image";
import { useListContext } from "../../store/list-context";
import { Accordion } from "react-bootstrap";
import nolist from "../../public/nolist.jpeg";
import ListHeaderBody from "../BothLists/ListHeaderBody";

const MySharedLists = () => {
  const { sharedLists } = useListContext();
  return (
    <Accordion>
      {sharedLists.length > 0 ? (
        sharedLists.map((list) => {
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
        })
      ) : (
        <div className="d-flex flex-column justify-content-center">
          <div className="pt-4 text-align">
            <p className="d-flex justify-content-center">
              No one is sharing a list with you...
            </p>
          </div>
          <Image className="px-4" src={nolist} alt="Fry" fill="true" />
        </div>
      )}
    </Accordion>
  );
};

export default MySharedLists;
