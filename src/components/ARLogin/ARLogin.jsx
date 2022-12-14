import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./Input";
import PasswordMeter from "./PasswordMeter";
import arJson from "./ar.json";

const ARLogin = ({ onSuccess, url }) => {
  // const navigate = useNavigate();
  //Sign up & login state.
  const [isRegister, setIsRegister] = useState(false);

  //Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //Switch form between login and sign up.
  function switchForm() {
    setIsRegister((prevState) => !prevState);
  }

  //Input event to update component state.
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.target.value,
    });
  }

  //Save password on local state.
  function passToLoginCallBack(passValue) {
    setFormData({ ...formData, password: passValue });
  }
  //Send data when press login or sign up button
  function handleSubmit(event) {
    event.preventDefault();
    //Remove empty value and return object with real data.
    const payload = Object.entries(formData).reduce(
      (a, [key, value]) => (value ? ((a[key] = value), a) : a),
      {}
    );
    axios
      .post(url, payload)
      .then((res) => {
        const { data } = res;
        console.info(data.message);
        onSuccess(data.user);
        // navigate("/");
        window.history.go(-1);
      })
      .catch((err) => console.log(err));
  }

  // return (
  //   <>
  //     {/* Main modal */}
  //     <div
  //       id="authentication-modal"
  //       aria-hidden={isClicked ? "false" : "true"}
  //       aria-modal={isClicked ? "true" : "false"}
  //       role={isClicked ? "dialog" : " "}
  //       tabIndex="-1"
  //       className={`${
  //         isClicked ? " " : "hidden"
  //       } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
  //     >
  //       <div class="relative p-4 w-full max-w-md h-full md:h-auto">
  //         {/* <!-- Modal content --> */}
  //         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
  //           <button
  //             type="button"
  //             className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
  //             data-modal-toggle="authentication-modal"
  //           >
  //             <svg
  //               aria-hidden="true"
  //               className="w-5 h-5"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 fill-rule="evenodd"
  //                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  //                 clipRule="evenodd"
  //               ></path>
  //             </svg>
  //             <span class="sr-only">Close modal</span>
  //           </button>
  //           <div class="py-6 px-6 lg:px-8">
  //             <div>
  //               <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
  //                 {isRegister ? arJson.signUp : arJson.signIn}
  //               </h3>
  //               <p className="mt-2 text-center text-sm text-gray-600">
  //                 {isRegister ? arJson.already : arJson.newAccount}
  //                 <button
  //                   className="font-medium text-indigo-600 background-transparent"
  //                   onClick={switchForm}
  //                 >
  //                   &nbsp;{isRegister ? arJson.signHere : arJson.signUpHere}
  //                 </button>
  //               </p>
  //             </div>
  //             <form class="space-y-6" onSubmit={onSuccess}>
  //               <input type="hidden" name="remember" value="true" />
  //               <div className="-space-y-px rounded-md shadow-sm">
  //                 {/* First name  and last name field*/}
  //                 {isRegister && (
  //                   <>
  //                     <Input
  //                       name="firstName"
  //                       id="first-name"
  //                       type="text"
  //                       handleChange={handleChange}
  //                       label={arJson.firstNameL}
  //                       autoComplete="firstName"
  //                     />
  //                     <Input
  //                       name="lastName"
  //                       id="last-name"
  //                       type="text"
  //                       handleChange={handleChange}
  //                       label={arJson.lastNameL}
  //                       autoComplete="lastName"
  //                     />
  //                   </>
  //                 )}
  //                 {/* Email */}
  //                 <Input
  //                   name="email"
  //                   id="email"
  //                   type="email"
  //                   handleChange={handleChange}
  //                   label={arJson.email}
  //                   autoComplete="email"
  //                 />
  //                 {/* Password */}
  //                 <PasswordMeter passToLoginCallBack={passToLoginCallBack} />
  //               </div>
  //               {/* When sign in forms up */}
  //               {!isRegister && (
  //                 <>
  //                   <div className="flex items-center justify-between">
  //                     <div className="flex items-center">
  //                       <input
  //                         id="remember-me"
  //                         name="remember-me"
  //                         type="checkbox"
  //                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
  //                       />
  //                       <label
  //                         htmlFor="remember-me"
  //                         className="ml-2 block text-sm text-gray-900"
  //                       >
  //                         {arJson.remember}
  //                       </label>
  //                     </div>

  //                     <div className="text-sm">
  //                       <button
  //                         className="font-medium text-indigo-600 background-transparent"
  //                         onClick={() => console.log("forget pass")}
  //                       >
  //                         {arJson.forgetPass}
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </>
  //               )}
  //               {/* Submit */}
  //               <div>
  //                 <button
  //                   type="submit"
  //                   className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  //                 >
  //                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
  //                     <svg
  //                       className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       viewBox="0 0 20 20"
  //                       fill="currentColor"
  //                       aria-hidden="true"
  //                     >
  //                       <path
  //                         fillRule="evenodd"
  //                         d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
  //                         clipRule="evenodd"
  //                       />
  //                     </svg>
  //                   </span>
  //                   {isRegister ? arJson.signUpBtn : arJson.signInBtn}
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div
        dir="rtl"
        className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Component headers and forms */}
        <div dir="rtl" className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isRegister ? arJson.signUp : arJson.signIn}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isRegister ? arJson.already : arJson.newAccount}
              <button
                className="font-medium text-indigo-600 background-transparent"
                onClick={switchForm}
              >
                &nbsp;{isRegister ? arJson.signHere : arJson.signUpHere}
              </button>
            </p>
          </div>
          {/* Form  */}
          <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {/* First name  and last name field*/}
              {isRegister && (
                <>
                  <Input
                    name="firstName"
                    id="first-name"
                    type="text"
                    handleChange={handleChange}
                    label={arJson.firstNameL}
                    autoComplete="firstName"
                  />
                  <Input
                    name="lastName"
                    id="last-name"
                    type="text"
                    handleChange={handleChange}
                    label={arJson.lastNameL}
                    autoComplete="lastName"
                  />
                </>
              )}
              {/* Email */}
              <Input
                name="email"
                id="email"
                type="email"
                handleChange={handleChange}
                label={arJson.email}
                autoComplete="email"
              />
              {/* Password */}
              <PasswordMeter passToLoginCallBack={passToLoginCallBack} />
            </div>
            {/* When sign in forms up */}
            {!isRegister && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {arJson.remember}
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      className="font-medium text-indigo-600 background-transparent"
                      onClick={() => console.log("forget pass")}
                    >
                      {arJson.forgetPass}
                    </button>
                  </div>
                </div>
              </>
            )}
            {/* Submit */}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {isRegister ? arJson.signUpBtn : arJson.signInBtn}
              </button>
            </div>
          </form>
          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-b border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white text-sm px-5 text-gray-500">
                {arJson.continue}
              </span>
            </div>
          </div>
          {/* End Divider */}
        </div>
        {/* End modal Content */}
      </div>
    </>
  );
};

ARLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default ARLogin;
