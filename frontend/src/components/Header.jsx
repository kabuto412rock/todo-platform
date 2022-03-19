import { Link } from "react-router-dom";
function Header() {
  const flexItemStyle = {
    marginRight: "8px",
    borderRadius: "8px",
    background: "#aaa",
    color: "#00F",
    padding: "4px",
    textDecoration: "none",
  };

  return (
    <div style={{ display: "flex" }}>
      Header
      <Link style={flexItemStyle} to="/">
        首頁
      </Link>
      <Link style={flexItemStyle} to="login">
        登入
      </Link>
      <Link style={flexItemStyle} to="register">
        註冊
      </Link>
    </div>
  );
}

export default Header;
