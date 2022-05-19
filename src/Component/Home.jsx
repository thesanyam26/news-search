import React from "react";
import { useQuery } from "react-query";
import { fetchNews } from "../api";

function Home() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading, error } = useQuery(["news", search], () =>
    fetchNews(search)
  );
  const hits =
    data && data.data
      ? data.data.hits.filter((i) => i.title !== null && i.title.length > 0)
      : [];

  const onChangeSearch = (e) => setSearch(e.target.value);

  const createdAt = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <h1 className="text-center font-bold text-3xl py-2">Hacker News</h1>
      <div className="w-full flex justify-center">
        <div className="w-1/3 border-b" />
      </div>

      <div className="w-full flex justify-center py-2">
        <input
          placeholder="Search"
          className="outline-none w-4/5 md:w-1/3 py-2 border px-4 text-sm rounded-full"
          value={search}
          onChange={onChangeSearch}
        />
        {/* <button className="bg-blue-500 text-white p-1 rounded-full h-full px-3 font-medium">
            Search
          </button> */}
      </div>

      <div className="pt-2 h-full overflow-y-auto px-8">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="rounded-full w-4 h-4 animate-spin border-l-2 bordre-b-2 border-blue-800" />
          </div>
        )}
        {error && <div className="text-center py-3">Error!</div>}
        {hits.length === 0 && <div className="text-center py-3">No Data</div>}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
          {data &&
            hits.map((item, index) => {
              return (
                <a className="relative" href={`/news/${item.objectID}`}>
                  <div className="absolute shadow-2xl -left-6 font-bold text-3xl bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <div className="py-4 md:py-6 px-8 md:px-10 bg-white border-b-4 border-blue-500 mt-2 shadow-xl">
                    <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
                      News
                    </p>
                    <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
                      {item.title}
                    </h3>
                    <div className="text-sm flex items-center">
                      <svg
                        className="opacity-75 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        width="12"
                        height="12"
                        viewBox="0 0 97.16 97.16"
                      >
                        <path d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z" />
                        <path d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z" />
                      </svg>
                      <div className="leading-none">
                        {createdAt(item.created_at)}
                      </div>
                    </div>

                    <div className="pt-3">
                      {item._tags.map((tag, index) => (
                        <span
                          className="text-xs border border-blue-400 text-blue-400 bg-blue-50 py-1 px-3 rounded-full mr-1 "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
