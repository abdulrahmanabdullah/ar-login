import React, { useState } from "react";
// interface PassInterface {
//   passToLoginCallBack: (data: any) => void
// }
//
const PasswordMeter = ({ passToLoginCallBack }) => {
  const [password, setPassword] = useState({ value: "", strength: 0 });
  /**
   * هذي الدالة تختبر طول كلمة السر و قوتها بإستخدام الرجيكس
   * @param {value} كلمة السر
   * @returns تعيد الدالة 0 اذا كانت كلمة السر ضعيفة و 1 اذا كانت كلمة السر متوسطة و 2 اذا كانت قوية
   */
  function evaluateStrength(value) {
    // تحتوي كلمة السر على 8 احرف على الأقل ، حرف كبير على الأقل و حرف صغير و رقم و علامة ترقيم  واحدة على الأقل
    const strongPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd0-9@$!%*?&]{8,}$/g;
    // تحتوي كلمة السر على حرف كبير على الأقل
    const mediumPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/g;
    if (strongPass.test(value)) {
      return 2;
    } else if (mediumPass.test(value) && value.length >= 5) {
      return 1;
    } else {
      return 0;
    }
  }

  function setMeter(color) {
    switch (color) {
      case "danger":
        return (
          <div className="w-full bg-gray-200 h-1">
            <div className="bg-red-600 h-2" style={{ width: "30%" }}></div>
          </div>
        );
      case "warning":
        return (
          <div className="w-full bg-gray-200 h-1">
            <div className="bg-yellow-500 h-2" style={{ width: "69%" }}></div>
          </div>
        );
      case "success":
        return (
          <div className="w-full bg-gray-200 h-1">
            <div className="bg-green-500 h-2" style={{ width: "99%" }}></div>
          </div>
        );
      default:
        break;
    }
  }
  function handleOnChangePass(event) {
    const newValue = event.target.value;
    const newState = { ...password };
    newState.value = newValue;
    newState.strength = evaluateStrength(newValue);
    setPassword(newState);
    //This function to send password value to Parent component.
    passToLoginCallBack(event.target.value);
  }

  function displayMeter() {
    if (password.strength === 0) {
      return setMeter("danger");
    } else if (password.strength === 1) {
      return setMeter("warning");
    } else {
      return setMeter("success");
    }
  }

  return (
    <div className="py-2 my-4">
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Password"
        onChange={handleOnChangePass}
      />
      {password.value.length > 1 ? displayMeter() : null}
    </div>
  );
};

export default PasswordMeter;
