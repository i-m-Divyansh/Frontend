export const Authenticate = (data) => {
  if (typeof window != undefined) {
    if (localStorage.getItem("auth")) {
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(data));
    }
    localStorage.setItem("auth", JSON.stringify(data));
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
