import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNote, reset } from "../features/note/noteSlice";

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
    <Container>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body ">
          <form onSubmit={onSubmit}>
            <div className="card-title">新增筆記</div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">標題</span>
              </label>
              <input
                type="text"
                placeholder="標題"
                className="input input-bordered  focus:outline-2"
                value={title}
                id="title"
                onChange={onChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">分類</span>
              </label>
              <select
                className="select select-primary w-full max-w-xs"
                value={category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                required
              >
                <option>專案</option>
                <option>興趣</option>
                <option>面試</option>
                <option>其他</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">公開</span>
                <input
                  type="checkbox"
                  checked={status === "public" ? true : false}
                  className="checkbox checkbox-primary"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.checked ? "public" : "private",
                    }));
                  }}
                />
              </label>
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">內容</span>
              </label>
              <textarea
                type="text"
                placeholder="內容"
                className="textarea h-40 focus:outline-2"
                id="description"
                value={description}
                onChange={onChange}
                required
              ></textarea>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">送出</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default NewNote;
