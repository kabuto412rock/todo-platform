import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "../components/Container";
import BackButton from "../components/BackButton";
import { createNote, reset } from "../features/note/noteSlice";
import NoteForm from "../components/NoteForm";

const NewNote = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.notes
  );

  const [formData, setFormData] = useState({
    title: "",
    status: "public",
    description: "",
    category: "專案",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, title, description, category } = formData;
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());

    if (isSuccess) {
      navigate("/notes");
      return;
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNote({
        title,
        status,
        description,
        category,
      })
    );
  };
  return (
    <>
      <Container>
        <div className="card w-full bg-base-100 shadow-xl">
          <NoteForm
            noteTitle={
              <>
                <BackButton url="/notes" text="列表" />
                新增筆記
              </>
            }
            formData={formData}
            setFormData={setFormData}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </Container>
    </>
  );
};

export default NewNote;
