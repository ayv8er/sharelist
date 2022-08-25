import { useReducer, useState } from "react";
import axios from "axios";
import { ACTIONS, shareListReducer } from "../../reducer/share-list-reducer";
import { useListContext } from "../../store/list-context";
import { Button, Modal } from "react-bootstrap";

const ShareModal = (props) => {
  const [username, setUsername] = useState("");
  const { myLists, setMyLists } = useListContext();
  const [sharingState, dispatch] = useReducer(shareListReducer, {
    sharingErrorMessage: null,
    isUsernameShort: false,
    isSubmitBlank: false,
    isSharing: false,
  });

  const nameChangeHandler = (e) => {
    if (e.target.value === "" || e.target.value.trim().length > 2) {
      dispatch({
        type: ACTIONS.SET_USERNAME_ERROR,
        payload: false,
      });
      setUsername(e.target.value);
    } else if (e.target.value.trim().length < 3) {
      dispatch({
        type: ACTIONS.SET_USERNAME_ERROR,
        payload: true,
      });
      setUsername(e.target.value);
    }
  };

  const shareListHandler = async (id) => {
    dispatch({
      type: ACTIONS.SET_IS_SHARING,
      payload: true,
    });
    if (!username || username.trim() === "") {
      dispatch({
        type: ACTIONS.SET_BLANK_ERROR,
        payload: true,
      });
      return;
    }
    await axios
      .post("/api/auth/lists/share-list", {
        id,
        username: username,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const updatedList = myLists.map((list) => {
            if (list.id === id) {
              list.shared_id.push(username);
            }
            return list;
          });
          setMyLists([...updatedList]);
        } else if (res.data.status === 404) {
          dispatch({
            type: ACTIONS.SET_SHARING_ERROR_MESSAGE,
            payload: res.data.message,
          });
          return;
        }
      })
      .catch((err) => {
        console.log("gg");
      });
    dispatch({
      type: ACTIONS.SET_IS_SHARING,
      payload: false,
    });
    props.setisattemptshare(false);
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
          Share {listName(props.list_id)[0].list_name}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-4">
            {!sharingState.sharingErrorMessage &&
              !sharingState.isSubmitBlank &&
              !sharingState.isUsernameShort && (
                <label htmlFor="basic-url" className="form-label text-light">
                  Share with Username
                </label>
              )}
            {sharingState.isUsernameShort && (
              <label
                htmlFor="basic-url"
                className="form-label fs-6 text-danger"
              >
                Username too short
              </label>
            )}
            {sharingState.sharingErrorMessage && (
              <label
                htmlFor="basic-url"
                className="form-label fs-6 text-danger"
              >
                {sharingState.sharingErrorMessage}
              </label>
            )}
            {sharingState.isSubmitBlank && (
              <label
                htmlFor="basic-url"
                className="form-label fs-6 text-danger"
              >
                Field is empty
              </label>
            )}
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="UsernameInput"
                onChange={nameChangeHandler}
                disabled={sharingState.isSharing}
                value={username}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => shareListHandler(props.list_id)}
          variant="outline-success"
          type="submit"
          disabled={sharingState.isSharing || sharingState.isUsernameShort}
        >
          Share!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ShareList = ({ list_id }) => {
  const [isAttemptShare, setIsAttemptShare] = useState(false);

  if (isAttemptShare) {
    return (
      <ShareModal
        show={isAttemptShare}
        onHide={() => setIsAttemptShare(false)}
        setisattemptshare={setIsAttemptShare}
        list_id={list_id}
      />
    );
  }

  return (
    <div className="d-flex justify-content-center pt-3">
      <Button onClick={() => setIsAttemptShare(true)} variant="outline-success">
        Share List
      </Button>
    </div>
  );
};

export default ShareList;
