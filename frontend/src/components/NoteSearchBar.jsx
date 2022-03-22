import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteSearchBar({ orginal, onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(orginal);
  }, [orginal]);

  return (
    <div className="w-full form-control  ">
      <div className="input-group">
        <input
          type="search"
          className="input input-bordered"
          placeholder="標題..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-info"
          onClick={(e) => {
            onSearch(query);
          }}
        >
          搜尋
        </button>
      </div>
    </div>
  );
}
export default NoteSearchBar;
