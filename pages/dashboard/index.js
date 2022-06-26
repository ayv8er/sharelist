import NavBar from "../../components/NavBar";
import MyLists from "../../components/MyLists";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="d-flex text-white justify-content-center align-items-start min-vh-90">
        <MyLists />
      </div>
    </>
  );
};

export default Dashboard;
