import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-accent   ">
      <FaArrowCircleLeft /> 返回
    </Link>
  );
};
export default BackButton;
