import { useHistory } from "react-router";
import { isAuthenticated } from "../../helpers/helper";

const Dashboard = () => {
  //? useHistory
  let history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    history.push("/");
  };

  let username = `${isAuthenticated().user.firstName} ${
    isAuthenticated().user.lastName
  }`;
  return (
    <>
      <h1>Welcome {username}</h1>
      <button
        style={{ cursor: "pointer", padding: "10px" }}
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
