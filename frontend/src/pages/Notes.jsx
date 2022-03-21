import { useState } from "react";
import Container from "../components/Container";

function Notes() {
  const [notes, setNotes] = useState([
    {
      index: "1",
      title: "標題123",
      category: "面試",
      createdAt: "2022-03-23",
    },
  ]);

  const NoteSearchBar = () => (
    <div className="w-full form-control">
      <div className="input-group">
        <input
          type="search"
          className="input input-bordered"
          placeholder="標題..."
        />
        <button className="btn btn-info">搜尋</button>
      </div>
    </div>
  );
  const NoteItem = ({ note }) => (
    <>
      <tr>
        <th>{note.index}</th>
        <td>{note.category}</td>
        <td>{note.title}</td>
        <td>{note.createdAt}</td>
      </tr>
    </>
  );

  return (
    <Container>
      <NoteSearchBar />

      <div class="overflow-x-auto">
        <table class="table-compact table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>分類</th>
              <th className="">標題</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <NoteItem note={note} key={note.index} />
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Notes;
