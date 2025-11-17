import { useState } from "react";
import "./Login.css";

function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="form-container">
      <input className="form-input" type="text" placeHolder="Email" />
      <div>
        <input
          className="form-input"
          type={showPass ? "text" : "password"}
          placeHolder="Password"
        />
        <input
          type="button"
          onClick={() => {
            setShowPass(showPass ? false : true);
          }}
          value="hide"
        />
      </div>

      <div>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
