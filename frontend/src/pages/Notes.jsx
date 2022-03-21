import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import { getNotes, reset } from "../features/note/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import NoteSearchBar from "../components/NoteSearchBar";
import Container from "../components/Container";

function Notes() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");

  const { notesData, isLoading, isSuccess } = useSelector(
    (state) => state.notes
  );

  const { docs } = notesData;

  useEffect(() => {
    dispatch(reset());
    dispatch(getNotes({ page, limit, q }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, limit, page, q]);

  const onSearch = (searchStr) => {
    setQ(searchStr);
  };
  const NoteItem = ({ note, index }) => (
    <>
      <tr>
        <th>{index}</th>
        <td className="">{note.category}</td>
        <td title={note.title}>
          <p className="truncate ...">{note.title}</p>
        </td>
        <td>{note.updatedAt}</td>
      </tr>
    </>
  );

  return (
    <Container>
      <NoteSearchBar orginal={q} onSearch={onSearch} />
      <div className="text-right">
        <label>
          單頁顯示
          <select
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          筆
        </label>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-compact table w-full">
            <thead>
              <tr>
                <th className="w-5"></th>
                <th className="w-10">分類</th>
                <th className="w-50">標題</th>
                <th className="">時間</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((note, index) => (
                <NoteItem
                  note={note}
                  index={(page - 1) * limit + index + 1}
                  key={note._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="w-full">{/* TODO:需要建立切換頁面 */}</div>
    </Container>
  );
}

export default Notes;
