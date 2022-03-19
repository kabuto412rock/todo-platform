import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Container from "../components/Container";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    console.log(`name=${name}, email=${email}, password=${password}`);
  };
  const onFieldChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <Container>
      <div className="m-auto">
        <div className="text-center mb-2"> 圖肚平台</div>

        <div className="m-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">帳號(Email)</span>
                </label>
                <input
                  type="email"
                  placeholder="ex: demo@gmail.com"
                  className="input input-bordered"
                  value={email}
                  id="email"
                  onChange={onFieldChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">密碼</span>
                </label>
                <input
                  type="password"
                  placeholder="密碼至少要9碼"
                  className="input input-bordered"
                  value={password}
                  id="password"
                  onChange={onFieldChange}
                  required
                />
                {/* <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label> */}
              </div>
              <div className="form-control mt-6 flex">
                <button className="btn btn-primary">建立一個新帳號</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
