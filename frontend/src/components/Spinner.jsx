import "./Spinner.css";
function Spinner() {
  return (
    <div
      style={{
        position: "fixed",
        left: "0px",
        top: "33%",
        width: "100%",
        height: "100%",
        "z-index": "9999999999",
        overflow: "hidden",
      }}
    >
      <div className="m-auto w-fit ">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Spinner;
