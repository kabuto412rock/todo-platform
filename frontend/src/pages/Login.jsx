import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Container from "../components/Container";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Login fail show login error toast
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("帳號或密碼不得為空");
      return;
    }
    dispatch(login(formData));
  };

  const onFieldChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div className="m-auto">
        <div className="m-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="card-title ">
              <FaSignInAlt className="mr-2 " />
              <div className="">登入</div>
            </div>
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
                  autoComplete="username"
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
                  autoComplete="current-password"
                  onChange={onFieldChange}
                  required
                />
              </div>
              <div className="form-control mt-6 flex">
                <button className="btn btn-primary">開始todo</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
