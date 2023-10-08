import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
const News = () => {
  const [query, setQuery] = useState("");
  const [changedQuery, setChangedQuery] = useState("stocks");
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("newsData");
    return storedData ? JSON.parse(storedData) : [];
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL + `/news?changedQuery=${changedQuery}`
        );
        setData(response.data);
        localStorage.setItem("newsData", JSON.stringify(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [changedQuery]);

  const newsDet = data.map((article, key) => (
    <NewsCard
      date ={article.publishedAt}
      author={article.author}
      link={article.url}
      image={article.urlToImage}
      title={article.title}
      description={article.description}
      key={key}
    />
  ));
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="lg:p-5 mt-5 sm:p-2 sm:flex-col items-center justify-center">
        <h1 className="news text-white m-10">News</h1>
        <div
          className="form-control flex max-w-xs m-10"
          onSubmit={() => setChangedQuery(query)}
        >
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <button
              className="btn btn-square rounded-xl"
              onClick={() => setChangedQuery(query)}
            >
              <img src="/search.svg" className="bg-gray-500 p-2" />
            </button>
          </div>
        </div>
        <div
          className="grid flex-row 
      lg:grid-cols-3 sm:grid-cols-1
      md:grid-cols-2 flex-wrap relative gap-5 p-20 text-sm grid-rows-2"
        >
          {newsDet}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
