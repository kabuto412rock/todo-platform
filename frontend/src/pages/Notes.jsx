import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import { getNotes, reset } from "../features/note/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import NoteSearchBar from "../components/NoteSearchBar";
import Container from "../components/Container";
import NoteItem from "../components/NoteItem";
import { useNavigate, useSearchParams } from "react-router-dom";

function Notes() {
  // TODO:目前列表先選第二頁，再切換單頁顯示，會變成明明已經重設成第一頁，但底下的頁數仍然是原本的頁數。

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const q = searchParams.get("q") || "";

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

  // 預設會先跟Redux要求重置notes的狀態，並取得當前筆記
  useEffect(() => {
    dispatch(getNotes({ page, limit, q }));
  }, [dispatch, limit, page, q, searchParams]);

  // 當按下搜尋按鈕時
  const onSearch = (searchStr) => {
    setSearchParams({ q: searchStr, page: 1, limit });
    // dispatch(getNotes({ q: searchStr, page: 1, limit }));
  };

  // 當排序選項被觸發時
  const handleSort = (e) => {
    const sortTarget = e.target.sort;
  };

  // 當列表頁面下方的頁數被點擊時
  const handlePageClick = (event) => {
    setSearchParams({ page: event.selected + 1, limit, q });
    // dispatch(getNotes({ page: event.selected + 1, limit, q }));
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
              setSearchParams({
                limit: e.target.value,
                q,
                page: 1,
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
          <thead>
            <tr>
              <th className="w-5"></th>
              <th className="w-10" sort="category" onClick={handleSort}>
                分類
              </th>
              <th className="w-50" sort="title" onClick={handleSort}>
                標題
              </th>
              <th className="" sort="updatedAt" onClick={handleSort}>
                更新時間
              </th>
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
          pageCount={totalPages}
          previousLabel="< "
          initialPage={page - 1}
          disabledLinkClassName="btn btn-disabled opacity-50"
          renderOnZeroPageCount={null}
        />
      </div>
    </Container>
  );
}

export default Notes;
