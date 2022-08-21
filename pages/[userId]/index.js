import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import NavBar from "../../components/NavBar";
import { unstable_getServerSession } from "next-auth/next";

const Dashboard = (props) => {
  //   const [sharedLists, setSharedLists] = useState(props.sharedLists);
  //   const [myLists, setMyLists] = useState(props.myLists);
  //   const { data: session, status } = useSession({
  //     required: true,
  //   });
  const router = useRouter();

  //   if (!session) {
  //     return <></>;
  //   }

  return (
    <>
      <NavBar />
      {/* <div
        style={{ maxWidth: "500px", width: "100%" }}
        className="d-flex text-white min-vh-90"
      >
        <ListContext.Provider
          value={{ myLists, setMyLists, sharedLists, setSharedLists }}
        >
          <Lists />
        </ListContext.Provider>
      </div> */}
    </>
  );
};

export const getServerSideProps = async (context) => {
  console.log(context.req);
  console.log(context.res);
  console.log(authOptions);
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
  return {
    // return the lists
    props: { session },
  };
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const fullList = await getAllMyLists(params.userId);
//   const mine = fullList.filter((list) => {
//     return list.creator_id === params.userId;
//   });
//   const shared = fullList.filter((list) => {
//     return list.shared_id.includes(params.userId);
//   });

//   return {
//     props: {
//       myLists: mine.map((eachList) => ({
//         id: eachList._id.toString(),
//         creator_id: eachList.creator_id,
//         list_name: eachList.list_name,
//         list_items: eachList.list_items,
//         shared_id: eachList.shared_id,
//       })),
//       sharedLists: shared.map((eachList) => ({
//         id: eachList._id.toString(),
//         creator_id: eachList.creator_id,
//         list_name: eachList.list_name,
//         list_items: eachList.list_items,
//         shared_id: eachList.shared_id,
//       })),
//     },
//   };
// };

// Experimenting with getStaticPaths & getStaticProps

// export const getStaticPaths = async () => {
//   const allLists = await getAllLists();
//   const phoneNumbers = allLists.map((list) => ({
//     params: { userId: list.creator_id },
//   }));
//   return {
//     paths: phoneNumbers,
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const fullList = await getAllMyLists(params);
//   const mine = fullList.filter((list) => {
//     return list.creator_id === params.userId;
//   });
//   const shared = fullList.filter((list) => {
//     return list.shared_id.includes(params.userId);
//   });
//   return {
//     props: {
//       myLists: mine.map((eachList) => ({
//         id: eachList._id.toString(),
//         creator_id: eachList.creator_id,
//         list_name: eachList.list_name,
//         list_items: eachList.list_items,
//         shared_id: eachList.shared_id,
//       })),
//       sharedLists: shared.map((eachList) => ({
//         id: eachList._id.toString(),
//         creator_id: eachList.creator_id,
//         list_name: eachList.list_name,
//         list_items: eachList.list_items,
//         shared_id: eachList.shared_id,
//       })),
//     },
//     revalidate: 10,
//   };
// };

export default Dashboard;
