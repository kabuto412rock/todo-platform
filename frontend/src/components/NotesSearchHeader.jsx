import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

function NotesSearchHeader({ sort, handleSort }) {
  const sortJSON = JSON.parse(sort);

  const categorySymbol =
    sortJSON["category"] === 1 ? (
      <BsArrowUpCircle className=" ml-1 inline-block" />
    ) : (
      <BsArrowDownCircle className=" ml-1 inline-block" />
    );
  const titleSymbol =
    sortJSON["title"] === 1 ? (
      <BsArrowUpCircle className=" ml-1 inline-block" />
    ) : (
      <BsArrowDownCircle className=" ml-1 inline-block" />
    );
  const updatedAtSymbol =
    sortJSON["updatedAt"] === 1 ? (
      <BsArrowUpCircle className=" ml-1 inline-block" />
    ) : (
      <BsArrowDownCircle className=" ml-1 inline-block" />
    );

  return (
    <thead>
      <tr>
        <th className="w-5"></th>
        <th className="w-10" onClick={() => handleSort("category")}>
          分類
          {sortJSON["category"] && categorySymbol}
        </th>
        <th className="w-50" onClick={() => handleSort("title")}>
          標題
          {sortJSON["title"] && titleSymbol}
        </th>
        <th className="" onClick={() => handleSort("updatedAt")}>
          更新時間
          {sortJSON["updatedAt"] && updatedAtSymbol}
        </th>
      </tr>
    </thead>
  );
}

export default NotesSearchHeader;
