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
        background: "white",
        opacity: "0.5",
      }}
    >
      <div className="m-auto w-fit  h-screen flex flex-row items-center">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Spinner;
