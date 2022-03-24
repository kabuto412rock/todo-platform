import "./Spinner.css";
function Spinner() {
  return (
    <div
      style={{
        position: "fixed",
        left: "0px",
        top: "0%",
        width: "100%",
        height: "100%",
        "z-index": "9999999999",
        overflow: "hidden",
        opacity: "",
      }}
    >
      <div className="m-auto w-fit  h-screen flex flex-row items-center">
        <div className="loader opacity-100"></div>
      </div>
    </div>
  );
}

export default Spinner;
