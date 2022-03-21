import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import validator from "validator";

//? router
import { Redirect, Link } from "react-router-dom";

//? Axios
import axios from "../../Axios/Axios";

//? material-ui
import { TextField, InputLabel } from "@material-ui/core";

//? helpers
import { Authenticate, isAuthenticated } from "../../helpers/helper";

//? React-toast
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [isRedirect, setIsRedirect] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [FormError, setFormError] = useState({
    email: false,
    password: false,
  });

  //? destructuring
  const { email, password } = FormData;

  //? useEffect
  // useEffect(() => {
  //   if (auth) {
  //     history.push(`/admin/${auth.user._id}/check/otp`);
  //   }
  // }, [auth, history]);

  //? changeHandler
  const changeHandler = (name) => (e) => {
    let value = e.target.value;
    setFormData({ ...FormData, [name]: value });
  };

  //? validations
  const validate = () => {
    let value = true;

    let err = { email: false, password: false };
    setFormError({ ...err });

    if (email === "") {
      value = false;
      err.email = "Enter Email First!";
    }

    if (!validator.isEmail(email)) {
      value = false;
      err.email = "Enter Valid Email First!";
    }

    if (password === "") {
      value = false;
      err.password = "Enter Password First!";
    }

    setFormError({ ...err });
    return value;
  };

  //? loginHandler
  const loginHandler = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);

      axios({ method: "POST", url: "/login", data: FormData })
        .then((response) => {
          console.log("response", response);
          Authenticate(response.data.data);

          setLoading(false);
          toast.success(response.data.message);
          setTimeout(() => {
            setIsRedirect(true);
          }, 1500);
        })
        .catch((err) => {
          console.log({ err: err.response.data.message });
          toast.error(err.response.data.message);
          setLoading(false);
        });
    }
  };

  const redirectHandler = () => {
    if (isAuthenticated()) {
      if (isRedirect) {
        return <Redirect to="/dashboard" />;
      }
    }
  };

  console.log("FormData", FormData);
  // component return
  return (
    <>
      <div className={styles.container}>
        {redirectHandler()}
        <div className={styles.left}>
          <div className={styles.img_wrapper}>
            <img
              src="https://i.pinimg.com/750x/07/7c/a8/077ca88c5e28d9a5dabbb377667016d1.jpg"
              alt="img"
            />
          </div>
        </div>
        <div className={styles.right}>
          <Toaster />
          <div className={styles.form_wrapper}>
            <form onSubmit={loginHandler} className={styles.form}>
              <div className={styles.greeting_wrapper}>
                <p className={styles.general_msg}>Login to continue</p>
              </div>
              <InputLabel className={styles.label}>Email</InputLabel>
              <TextField
                onChange={changeHandler("email")}
                defaultValue={email}
                id="outlined-basic"
                variant="outlined"
                error={FormError.email}
                helperText={FormError.email}
              />
              <br />
              <InputLabel className={styles.label}>Password</InputLabel>
              <TextField
                onChange={changeHandler("password")}
                defaultValue={password}
                id="outlined-basic"
                variant="outlined"
                error={FormError.password}
                helperText={FormError.password}
              />
              <br />
              <br />
              <button
                type={Loading ? "" : "submit"}
                className={styles.login_btn}
              >
                {Loading ? "Loading..." : "Login"}
              </button>
            </form>
            <div style={{ textAlign: "center" }}>
              <p>
                Don't have an account?{" "}
                <span>
                  <Link to="/signup">Signup</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
