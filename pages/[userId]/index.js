import { useState } from "react";
import NavBar from "../../components/NavBar";
import Lists from "../../components/BothLists/Lists";
import { unstable_getServerSession } from "next-auth/next";
import { getAllMyLists } from "../api/auth/lists/get-lists";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { ListContext } from "../../store/list-context";

const Dashboard = (props) => {
  const [sharedLists, setSharedLists] = useState(props.sharedLists);
  const [myLists, setMyLists] = useState(props.myLists);

  return (
    <>
      <NavBar />
      <div
        style={{ maxWidth: "500px", width: "100%" }}
        className="d-flex text-white min-vh-90"
      >
        <ListContext.Provider
          value={{ myLists, setMyLists, sharedLists, setSharedLists }}
        >
          <Lists />
        </ListContext.Provider>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const fullList = await getAllMyLists(session.user.name);
  const mine = fullList.filter((list) => {
    return list.creator_id === session.user.name;
  });
  const shared = fullList.filter((list) => {
    return list.shared_id.includes(session.user.name);
  });
  return {
    props: {
      myLists: mine.map((eachList) => ({
        id: eachList._id.toString(),
        creator_id: eachList.creator_id,
        list_name: eachList.list_name,
        list_items: eachList.list_items,
        shared_id: eachList.shared_id,
      })),
      sharedLists: shared.map((eachList) => ({
        id: eachList._id.toString(),
        creator_id: eachList.creator_id,
        list_name: eachList.list_name,
        list_items: eachList.list_items,
        shared_id: eachList.shared_id,
      })),
    },
  };
};

export default Dashboard;
