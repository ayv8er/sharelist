import { Accordion } from "react-bootstrap";

const ListItems = ({ list }) => {
  return (
    <>
      {list.map((item, index) => {
        return (
          <div className="text-white border rounded p-2" key={index}>
            {item}
          </div>
        );
      })}
    </>
  );
};

export default ListItems;
