import { useNavigate } from "react-router-dom";

const homeImg = require("../assets/home2.jpg");

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${homeImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-50 "></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md text-indigo-100">
          <h1 className="mb-5 text-6xl font-bold">哈囉！工程師</h1>
          <p className="mb-5 text-md">
            todo-platform(圖肚平台)是一個提供工程師紀錄成長分享的平台，一個在{" "}
            <a
              href="https://github.com/kabuto412rock/todo-platform"
              className=" hover:bg-primary "
            >
              {" "}
              Github
            </a>
            開放原始碼的協作平台， 所以你也可以自己搭建屬於你的平台 。
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            開始分享
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
