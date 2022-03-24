import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  deleteNote,
  getNote,
  updateNote,
  reset,
} from "../features/note/noteSlice";
import { AiFillDelete, AiOutlineLock } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

import Container from "../components/Container";
import BackButton from "../components/BackButton";
import NoteForm from "../components/NoteForm";
import Spinner from "../components/Spinner";

const customStyles = {
  content: {
    width: "90%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Note() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { note, isLoading, isError, message, isDeleteSuccess } = useSelector(
    (state) => state.notes
  );
  const { user } = useSelector((state) => state.auth);

  const { noteId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formData, setFormData] = useState({});
  const isAuhtor = note && user && note.author === user._id;

  useEffect(() => {
    dispatch(getNote(noteId));
  }, [dispatch, noteId]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isDeleteSuccess) {
      toast.success("成功刪除筆記");
      naviagte("/notes");
    }
  }, [dispatch, isDeleteSuccess, isError, message, naviagte]);

  useEffect(() => {
    if (note && note?.title) {
      setFormData({
        title: note.title,
        description: note.description,
        status: note.status,
        category: note.category,
      });
    }
  }, [note, isLoading]);

  // Open/close modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    // console.log(`updated note = ${JSON.stringify(formData)}`);
    dispatch(updateNote({ noteId, formData }));
    closeModal();
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = (e) => {
    const needDelete = window.confirm(
      `請問是否真的要刪除這篇"${note.title}"筆記？`
    );
    if (needDelete) {
      dispatch(deleteNote(noteId));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body ">
          <form>
            <div>
              <BackButton url={-1} text="返回" />
              {isAuhtor && (
                <>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={openModal}
                  >
                    <FaPen /> 編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-outline"
                    onClick={onDelete}
                  >
                    <AiFillDelete /> 刪除
                  </button>
                </>
              )}
              <div
                className={
                  "absolute right-5  top-3 outline rounded-sm p-1 right-2" +
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
            </div>
            <div className="card-title p-1 ">
              {/* <div className="">標題</div> */}
              <div>{note?.title}</div>
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
            <p className=" border-2 mt-2 p-2  bg-orange-200 whitespace-pre-wrap	">
              {note.description}
            </p>
          </form>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <NoteForm
          noteTitle={<>編輯筆記</>}
          formData={formData}
          setFormData={setFormData}
          onChange={onChange}
          onSubmit={onNoteSubmit}
        />
      </Modal>
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
