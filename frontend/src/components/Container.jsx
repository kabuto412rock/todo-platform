function Container({ children }) {
  return (
    <div className=" p-6 w-full bg-slate-300 ">
      <div className="w-md md:w-md   max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

export default Container;
