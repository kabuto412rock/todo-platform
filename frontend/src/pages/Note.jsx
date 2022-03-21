import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNote } from "../features/note/noteSlice";
import { AiOutlineLock } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
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
      {/* <div>Note: {noteId}</div> */}
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body ">
          <form>
            <div className="card-title p-1 border-l-4">
              <div>標題</div>
              <div>{note?.title}</div>
            </div>
            <div
              className={
                "absolute right-5  top-1 outline rounded-sm p-1" +
                (note.status === "public"
                  ? "outline-lime-500 bg-lime-200 text-black"
                  : "outline-stone-600 bg-yellow-200 text-black")
              }
            >
              {note.status === "public" ? (
                <div className="flex">
                  <BsPeopleFill />
                  <div>公開</div>
                </div>
              ) : (
                <div className="flex ">
                  <AiOutlineLock />
                  <div>私人</div>
                </div>
              )}
            </div>
            {/* <div>status: {note.status}</div> */}
            <div className="flex flex-wrap  space-x-2  border-b-2">
              <div>
                <span className="- bg-slate-500 text-slate-200 btn-circle p-1">
                  作者
                </span>
                {note.authorName}
              </div>
              <div>
                <span className="- bg-slate-500 text-slate-200 btn-circle p-1">
                  分類
                </span>
                {note.category}
              </div>
            </div>
            <p className=" border-2 mt-2 p-2  bg-orange-200">
              {note.description}
            </p>
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
