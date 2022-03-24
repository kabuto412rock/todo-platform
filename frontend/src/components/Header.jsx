import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { FaRegSmileBeam } from "react-icons/fa";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            todo-platform
          </Link>
        </div>

        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div> */}
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div
              className="w-10 rounded-full"
              style={{
                display: "flex",
                "flex-direction": "column",
                "justify-content": "center",
              }}
            >
              {/* <img
                src="https://api.lorem.space/image/face?hash=33791"
                alt="user-img"
              /> */}
              <div>{user?.name}</div>
              {/* <img src={"../assets/home2.jpg"} alt="user-img" /> */}
            </div>
          </label>
          <ul
            tabIndex="0"
            className="shadow  menu menu-horizontal p-0 bg-base-100 rounded-box"
          >
            {user ? (
              <>
                <li>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      navigate("/new-note");
                    }}
                  >
                    新筆記
                  </button>
                </li>
                <li>
                  <button onClick={onLogout}>登出</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="justify-between" to="/login">
                    登入
                  </Link>
                </li>
                <li>
                  <Link to="/register">註冊</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
