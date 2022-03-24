import { Link } from "react-router-dom";

const NoteItem = ({ note, index }) =>
  note ? (
    <>
      <tr>
        <th>{index}</th>
        <td className="">{note.category}</td>
        <td title={note.title}>
          <Link
            to={`/notes/${note._id}`}
            className=" text-blue-400 hover:text-blue-700 active:text-blue-600"
          >
            <p className=" w-28 sm:w-auto   max-w-sm truncate ... break-all">
              {note.title}
            </p>
          </Link>
        </td>
        <td>{note.updatedAt}</td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <th>{index}</th>
        <td className="">分類</td>
        <td>
          <Link
            to="/"
            className=" text-blue-400 hover:text-blue-700 active:text-blue-600"
          >
            <p className=" w-28 sm:w-auto   max-w-sm truncate ... break-all">
              標題...
            </p>
          </Link>
        </td>
        <td>更新時間...</td>
      </tr>
    </>
  );

export default NoteItem;
