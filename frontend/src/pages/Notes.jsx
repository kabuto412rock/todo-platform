import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import { getNotes, reset } from "../features/note/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import NoteSearchBar from "../components/NoteSearchBar";
import Container from "../components/Container";
import NoteItem from "../components/NoteItem";

function Notes() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");

  const { notesData, isLoading, isSuccess } = useSelector(
    (state) => state.notes
  );

  const {
    docs,
    totalPages,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = notesData;

  useEffect(() => {
    dispatch(getNotes({ page, limit, q }));
  }, [dispatch, limit, page, q]);

  const onSearch = (searchStr) => {
    setQ(searchStr);
    setPage(1);
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(`event.selected = ${event.selected}`);
    setPage(event.selected + 1);
  };

  isLoading && <Spinner />;

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
              setPage(1);
            }}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          筆
        </label>
      </div>

      <div className="overflow-x-auto mb-3">
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

      <div className="w-full flex justify-center">
        {/* TODO:需要建立切換頁面 */}
        <ReactPaginate
          className="btn-group"
          previousLinkClassName="btn btn-secondary"
          nextLinkClassName="btn btn-secondary"
          pageClassName="pageClassName  "
          breakLabel="..."
          nextLabel=" >"
          activeLinkClassName="bg-primary "
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< "
          disabledLinkClassName="btn btn-disabled opacity-50"
          renderOnZeroPageCount={null}
        />
      </div>
    </Container>
  );
}

export default Notes;
