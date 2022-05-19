import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../api";

const Post = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, error } = useQuery(["newsDetail", id], () =>
    fetchDetails(id)
  );
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="rounded-full w-8 h-8 animate-spin border-l-2 bordre-b-2 border-blue-800" />
      </div>
    );
  }

  const createdAt = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const detail = data && data.data ? data.data : null;
  console.log("###", detail);
  if (detail === null) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-black">No Data</p>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-col">
      <h1 className="text-3xl font-bold text-center py-2">{detail.title}</h1>
      <div className="px-4 pt-4">
        <div className="bg-blue-500 w-fit text-white px-4 py-1 rounded font-semibold">
          Points : {detail.points}
        </div>
      </div>
      <div className="h-full pt-4 flex flex-col">
        <h1 className="text-black px-4 font-bold text-xl ">Comments</h1>
        <div className="h-full overflow-y-auto">
          {detail.children.map((item, index) => {
            return (
              <div className="bg-white shadow m-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-blue-500">{item.author}</div>
                  <p className="text-sm">{createdAt(item.created_at)}</p>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  className="text-xs font-mono"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
