import axios from "axios";
import { useListContext } from "../store/list-context";
import { Button } from "react-bootstrap";

const DeleteList = ({ listId }) => {
  const [list, setList] = useListContext();

  const deleteListHandler = async (id) => {
    await axios.delete("/api/lists/list", { data: { id } }).then((res) => {
      if (res.data.acknowledged === true) {
        const newList = list.filter((l) => {
          return l.id != id;
        });
        setList([...newList]);
      }
    });
  };

  return (
    <div className="d-flex justify-content-center pt-3">
      <Button
        onClick={() => deleteListHandler(listId)}
        variant="outline-danger"
      >
        Delete this List
      </Button>
    </div>
  );
};

export default DeleteList;
