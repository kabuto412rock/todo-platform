import ReactPaginate from "react-paginate";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Spinner from "../components/Spinner";
import Container from "../components/Container";
import NoteSearchBar from "../components/NoteSearchBar";
import NoteItem from "../components/NoteItem";

import { getNotes, reset } from "../features/note/noteSlice";
import NotesSearchHeader from "../components/NotesSearchHeader";

function Notes() {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || '{"updatedAt":-1}';

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

  // 取得當前筆記列表
  useEffect(() => {
    dispatch(reset());
    dispatch(getNotes({ page, limit, q, sort }));
  }, [dispatch, limit, page, q, searchParams, sort]);

  // 當按下搜尋按鈕時
  const onSearch = (searchStr) => {
    setSearchParams({ q: searchStr, page: 1, limit, sort });
  };

  // 當排序選項被觸發時
  const handleSort = (sortTarget) => {
    const sortJSON = JSON.parse(sort);
    const newSort = JSON.stringify({
      [sortTarget]: sortJSON[sortTarget] ? sortJSON[sortTarget] * -1 : 1,
    });
    setSearchParams({ q, page: 1, limit, sort: newSort });
  };

  // 當列表頁面下方的頁數被點擊時
  const handlePageClick = (event) => {
    setSearchParams({ page: event.selected + 1, limit, q, sort });
  };

  return (
    <Container>
      {isLoading && <Spinner />}
      <NoteSearchBar orginal={q} onSearch={onSearch} />
      <div className="text-right">
        <label>
          單頁顯示
          <select
            value={limit}
            onChange={(e) => {
              setSearchParams({
                limit: e.target.value,
                q,
                page: 1,
                sort,
              });
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
          <NotesSearchHeader sort={sort} handleSort={handleSort} />
          <tbody>
            {docs?.map((note, index) => (
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
        <ReactPaginate
          className="btn-group"
          previousLinkClassName="btn btn-secondary"
          nextLinkClassName="btn btn-secondary"
          pageClassName="pageClassName"
          breakLabel="..."
          nextLabel=" >"
          activeLinkClassName="bg-primary "
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          forcePage={page - 1}
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
