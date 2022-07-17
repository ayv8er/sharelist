import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import MyLists from "../../components/MyLists";
import { useAuthContext } from "../../store/auth-context";
import { ListContext } from "../../store/list-context";
import { getAllMyLists } from "../api/lists/my-lists";
import { Spinner } from "react-bootstrap";

const Dashboard = ({ totalList }) => {
  const [list, setList] = useState([]);
  const { userMetadata } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userMetadata) {
      router.push("/");
    }
    setList(totalList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMetadata, totalList]);

  if (!userMetadata) {
    return (
      <div className="d-flex justify-content-center align-items-center text-white min-vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="d-flex text-white justify-content-center align-items-start min-vh-90">
        <ListContext.Provider value={[list, setList]}>
          <MyLists />
        </ListContext.Provider>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { userId: "+17372970630" } },
      { params: { userId: "+12132756812" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const fullList = await getAllMyLists(params);
  return {
    props: {
      totalList: fullList.map((eachList) => ({
        id: eachList._id.toString(),
        creator_id: eachList.creator_id,
        list_name: eachList.list_name,
        list_items: eachList.list_items,
        shared_id: eachList.shared_id,
      })),
    },
    revalidate: 1,
  };
};

export default Dashboard;
