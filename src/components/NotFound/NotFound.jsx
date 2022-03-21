import { useHistory } from "react-router";

const NotFound = () => {
  //? useHistory
  let history = useHistory();

  const goBackHandler = () => {
    return history.goBack();
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>No Page Found</h1>
          <button
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={goBackHandler}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
