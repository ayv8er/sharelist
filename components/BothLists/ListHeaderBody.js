import { useState, useEffect } from "react";
import ListItems from "./ListItems";
import { Accordion } from "react-bootstrap";

const ListHeaderBody = ({ list_name, list_items, list_id, creator_id }) => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (list_items) {
      let priceSum = 0;
      list_items.map((object) => {
        for (let key in object) {
          priceSum += +object[key];
        }
      });
      setSum(priceSum);
    }
  }, [list_items]);

  return (
    <>
      <Accordion.Header>
        <div className="me-3">${sum}</div>
        <div>{list_name}</div>
      </Accordion.Header>
      <Accordion.Body>
        <ListItems
          list_id={list_id}
          list_items={list_items}
          creator_id={creator_id}
        />
      </Accordion.Body>
    </>
  );
};

export default ListHeaderBody;
