import { Link } from "react-router-dom";

const NoteItem = ({ note, index }) => (
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
);

export default NoteItem;
