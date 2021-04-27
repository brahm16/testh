import React, { useState } from "react";
import authSvg from "../assets/auth.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth, setCookie } from "../helpers/auth";
import { Link, NavLink, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import LoginComponent from './LoginComponent';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = (tokenId) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        setCookie("user",res.data.user);
        setCookie("username",res.data.user.name);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  const informParent = (response) => {
    authenticate(response, () => {
      
      if (isAuth() && isAuth().role === "admin") {   history.push("/admin")
    }
      else if (isAuth() && isAuth().role === "owner")         history.push("/owner")

      else if (isAuth() && isAuth().role === "subscriber")
      history.push("/subscriber")

      else  history.push("/login")
    });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken,
      })
      .then((res) => {
        console.log(res.data);
        informParent(res);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  const responseGoogle = (response) => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = (response) => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken);
  };

  const handleSubmit = (e) => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Submitted",
            });
            if (isAuth() && isAuth().role === "admin")   history.push("/admin/dashboard")

            else if (isAuth() && isAuth().role === "owner")
            history.push("/owner")
            else if (isAuth() && isAuth().role === "subscriber")
            history.push("/subscriber")
            else  history.push("/login")
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  const handleClick= (e)=>{
    history.push("/")
  }
  return (
    <div className="h-full bg-gray-100 text-gray-900">
      {isAuth() && isAuth().role==="admin" ? <Redirect to="/admin" /> : null}
      {isAuth() && isAuth().role==="subscriber" ? <Redirect to="/subscriber" /> : null}
      {isAuth() && isAuth().role==="owner" ? <Redirect to="/owner" /> : null}

      <ToastContainer />
      <LoginComponent/>
        ;
    </div>
  );
};

export default Login;