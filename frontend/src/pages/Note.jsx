import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNote } from "../features/note/noteSlice";

import Container from "../components/Container";

function Note() {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const { note } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getNote(noteId));
  }, [dispatch, noteId]);

  return (
    <Container>
      <div>Note: {noteId}</div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body ">
          <form>
            <div className="card-title">標題: {note?.title}</div>
            <div
              className={
                "absolute right-3 top-3 outline rounded-sm p-2 " +
                (note.status === "public"
                  ? "outline-lime-500 bg-lime-200 text-black"
                  : "outline-stone-600 bg-stone-200 text-black")
              }
            >
              {note.status === "public" ? "公開" : "私人"}
            </div>
            {/* <div>status: {note.status}</div> */}
            <div>作者: {note.author}</div>
            <div>分類: {note.category}</div>
            <div>內容: {note.description}</div>
          </form>
        </div>
      </div>
    </Container>
  );
}

/* _id(pin):"6238371840e81589dcac7312"
author(pin):"62365e341a0de1861e2745f7"
title(pin):"item09"
description(pin):"item09"
status(pin):"public"
category(pin):"專案"
createdAt(pin):"2022-03-21T08:28:08.228Z"
updatedAt(pin):"2022-03-21T08:28:08.228Z" */

export default Note;
