import { useState } from "react";
import axios from "axios";
import { useListContext } from "../../store/list-context";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { myLists, setMyLists } = useListContext();

  const deleteListHandler = async (id) => {
    setIsDeleting(true);
    try {
      await axios
        .delete("/api/auth/lists/update-lists", { data: { id } })
        .then((res) => {
          if (res.data.acknowledged === true) {
            const newList = myLists.filter((l) => {
              return l.id != id;
            });
            setMyLists([...newList]);
          }
        });
      setIsDeleting(false);
      props.setisattemptdelete(false);
    } catch (err) {
      console.log(err);
    }
  };

  const listName = (id) => {
    return myLists.filter((targetList) => {
      return targetList.id === id;
    });
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {listName(props.list_id)[0].list_name}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deleting lists are permanent, you cannot undo this.
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => deleteListHandler(props.list_id)}
          variant="outline-danger"
          disabled={isDeleting}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const DeleteList = ({ list_id }) => {
  const [isAttemptDelete, setIsAttemptDelete] = useState(false);

  if (isAttemptDelete) {
    return (
      <DeleteModal
        show={isAttemptDelete}
        onHide={() => setIsAttemptDelete(false)}
        list_id={list_id}
        setisattemptdelete={setIsAttemptDelete}
      />
    );
  }

  return (
    <div className="d-flex justify-content-center pt-3">
      <Button onClick={() => setIsAttemptDelete(true)} variant="outline-danger">
        Delete List
      </Button>
    </div>
  );
};

export default DeleteList;
