export const Authenticate = (data) => {
  if (typeof window != undefined) {
    if (data.user.userRole == 0) {
      let newData = { ...data.user, university: "" };
      data.user = newData;
      localStorage.setItem("auth", JSON.stringify(data));
    } else {
      localStorage.setItem("auth", JSON.stringify(data));
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("auth")) {
    return JSON.parse(localStorage.getItem("auth"));
  } else {
    return false;
  }
};
