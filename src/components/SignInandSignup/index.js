import React, {useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { IoMdKeypad } from "react-icons/io";
import { Link, Navigate, json, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios"
import "./index.css"
import toast, { Toaster } from "react-hot-toast";

const patternForGmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
const patternForPassword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,10})$/;

const firstNameErr = "*First name is required";
const secondNameErr = "*Second name is required";
const gmailFormatErr = "*Enter correct valid gmail";
const passwordFormatErr =
  "*Password should have a-z, A-Z, 0-9 and characters limit [6,10]";

const initialFormData = {
  firstname: "",
  secondname: "",
  gmail: "",
  password: "",
};

const initialSumitErrors = {
  firstnameErr: "",
  secondnameErr: "",
  gmailErr: "",
  passwordErr: "",
};

const initialBlurErrors = {
  firstname: false,
  secondname: false,
  gmai: false,
  password: false,
};

const loginCredentials = {
  gmailValue: false,
  passwordValue: false,
};

const SignInandSign = ({ type }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(initialFormData);

  const [isPasswordShow, setPasswordShow] = useState(false);

  const [fieldErrors, setFieldErrors] = useState(initialSumitErrors);

  const [blurErrors, setBlurErrors] = useState(initialBlurErrors);

  const [siginErrs, setSignInErr] = useState(loginCredentials);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const { firstname, secondname, gmail, password } = userData;

    let errorsdata = fieldErrors;

    if (type === "signup") {
      if (!firstname) {
        errorsdata = { ...errorsdata, firstnameErr: firstNameErr };
      } else {
        errorsdata = { ...errorsdata, firstnameErr: "" };
      }

      if (!secondname) {
        errorsdata = { ...errorsdata, secondnameErr: secondNameErr };
      } else {
        errorsdata = { ...errorsdata, secondnameErr: "" };
      }
    }

    if (!patternForGmail.test(gmail)) {
      errorsdata = { ...errorsdata, gmailErr: gmailFormatErr };
    } else {
      errorsdata = { ...errorsdata, gmailErr: "" };
    }

    if (!patternForPassword.test(password)) {
      errorsdata = { ...errorsdata, passwordErr: passwordFormatErr };
    } else {
      errorsdata = { ...errorsdata, passwordErr: "" };
    }

    setFieldErrors(errorsdata);

    const { firstnameErr, secondnameErr, gmailErr, passwordErr } = errorsdata;

    if (!firstnameErr && !secondnameErr && !gmailErr && !passwordErr) {
      if (type === "signup") {
        try{
          await axios.post("http://localhost:5004/api/user/signup",userData)
          navigate("/signin");
        }catch(err){
          console.log(err)
          toast.error("Try again..")
        }
      }
      if (type === "signin") {
        try{
          const {data:{token}}=await axios.post("http://localhost:5004/api/user/signin",userData)
          console.log(token)
          localStorage.setItem("jwt",JSON.stringify(token))
          navigate("/");
        }catch(err){
          console.log(err)
          toast.error("Try again..")
        }
      }
    }
  };

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleBlur = (e) => {
    e.preventDefault()
    if (!e.target.value) {
      setBlurErrors({ ...blurErrors, [e.target.id]: true });
    } else {
      setBlurErrors({ ...blurErrors, [e.target.id]: false });
    }
  };

  const ShowSignInErr = () => {
    let SignInErr = "";

    SignInErr =
      siginErrs.gmailValue && siginErrs.passwordValue
        ? "Email and Password are wrong"
        : siginErrs.gmailValue
        ? "Enter correct gmail"
        : siginErrs.passwordValue
        ? "Enter correct password"
        : "";

    return SignInErr ? (
      <h1 className="bg-red-500 mt-3 text-white text-center rounded-md pt-1.5 h-[40px] w-[100%]">
        {SignInErr}
      </h1>
    ) : (
      ""
    );
  };

  if (localStorage.getItem("jwt")!==null){
    return <Navigate to="/" replace={true}/>
  }
  return (
    <>
    <Toaster/>
    <div className="main-signin-bg">
    <div className="form-card-container">
      <h1 className="page-name">{type}</h1>
      <div className="mt-5 w-[100%] max-w-[400px] bg-white px-3 rounded-lg shadow-lg">
        {ShowSignInErr()}
        <form className="pb-4 shrink" onSubmit={handleFormSubmit}>
          <div className="md:flex md:gap-2">
          {type === "signup" && (
            <div className="each-input">
              {/* <CiUser className="auth-icon" /> */}
              <label htmlFor="firstname" className="auth-label">
                First Name
              </label>
              <input
                onChange={handleInput}
                onBlur={handleBlur}
                value={userData.firstname}
                type="text"
                placeholder="Enter First Name"
                id="firstname"
                className={
                  "auth-input-el"
                }
              />
              {blurErrors.firstname || fieldErrors.firstnameErr ? (
                <p className="err-msg">
                  {firstNameErr}
                </p>
              ) : (
                ""
              )}
            </div>
          )}

          {type === "signup" && (
            <div className="my-1 flex flex-col">
              {/* <CiUser className="relative bottom-[-62px] mr-2 left-3 text-black" /> */}
              <label className="auth-label" htmlFor="secondname">
                Second Name
              </label>
              <input
                onChange={handleInput}
                onBlur={handleBlur}
                value={userData.secondname}
                type="text"
                placeholder="Enter Second Name"
                id="secondname"
                className="auth-input-el"
              />
              {blurErrors.secondname || fieldErrors.secondnameErr ? (
                <p className="err-msg">
                  {secondNameErr}
                </p>
              ) : (
                ""
              )}
            </div>
          )}
          </div>

          <div className="my-1 flex flex-col">
            {/* <IoMailOutline className="relative bottom-[-62px] mr-2 left-3 text-black" /> */}
            <label className="auth-label" htmlFor="gmail">
              Gmail
            </label>
            <input
              onChange={handleInput}
              onBlur={handleBlur}
              value={userData.gmail}
              type="text"
              placeholder="Enter Gmail"
              id="gmail"
              className="auth-input-el"
            />
            {blurErrors.gmail || fieldErrors.gmailErr ? (
              <p className="err-msg">
                {gmailFormatErr}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="each-input-div">
            {/* <IoMdKeypad className="relative bottom-[-62px] mr-2 left-3 text-black" /> */}
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleInput}
              onBlur={handleBlur}
              value={userData.password}
              type={isPasswordShow ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              className="auth-input-el"
            />

            <button
            onClick={()=>{
              setPasswordShow(pre=>!pre)
            }}
              type="button"
              className="eye-icon"
            >
              {isPasswordShow ? <BsFillEyeFill /> : <BsFillEyeSlashFill/>}
            </button>

            {blurErrors.password || fieldErrors.passwordErr ? (
              <p className="err-msg password-err">
                {passwordFormatErr}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="submit-auth-btn"
            >
              {type}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 bg-white p-3 rounded-md shadow-lg">
        {type === "signup" ? (
          <p>
            Already a member{" "}
            <Link
              to="/signin"
              onClick={() => {
                setFieldErrors(initialFormData);
                setFieldErrors(initialSumitErrors);
                setBlurErrors(initialBlurErrors);
              }}
              className="join-link"
            >
              signin here
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account ?{" "}
            <Link
              to="/signup"
              onClick={() => {
                setFieldErrors(initialFormData);
                setFieldErrors(initialSumitErrors);
                setBlurErrors(initialBlurErrors);
              }}
              className="join-link"
            >
              Join us today.
            </Link>
          </p>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default SignInandSign;