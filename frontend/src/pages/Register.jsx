import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Container from "../components/Container";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !password2) {
      toast.error("有欄位尚未填完...");
      return;
    }

    if (password !== password2) {
      toast.error("第二次登打的密碼有誤");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
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
              <FaUser className="mr-2 " />
              <div className="">註冊</div>
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
                  autocomplete="username"
                  onChange={onFieldChange}
                  required
                />
              </div>{" "}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">顯示名稱</span>
                </label>
                <input
                  type="text"
                  placeholder="你的名稱"
                  className="input input-bordered"
                  value={name}
                  id="name"
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
                  autocomplete="new-password"
                  required
                />
              </div>{" "}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">確認密碼</span>
                </label>
                <input
                  type="password"
                  placeholder="再輸入一次密碼"
                  className="input input-bordered"
                  value={password2}
                  id="password2"
                  onChange={onFieldChange}
                  autocomplete="new-password"
                  required
                />
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

export default Register;
