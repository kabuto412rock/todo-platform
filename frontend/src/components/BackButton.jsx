import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = ({ url, text }) => {
  return (
    <Link to={url} className="btn btn-outline btn-secondary">
      <FaArrowCircleLeft /> {text || "返回"}
    </Link>
  );
};
export default BackButton;
