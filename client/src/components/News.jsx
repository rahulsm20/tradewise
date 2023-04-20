import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Sidebar from './Sidebar';
import NewsCard from './NewsCard';
import Footer from './Footer';
const News = () => {
  const[query,setQuery]=useState('')
  const[changedQuery,setChangedQuery]=useState('stocks')
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('newsData');
    return storedData ? JSON.parse(storedData) : [];  
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL+`/news?changedQuery=${changedQuery}`
        );
        setData(response.data);
        localStorage.setItem('newsData', JSON.stringify(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [changedQuery]);

  const newsDet = data.map((article,key) => (
    <NewsCard link={article.url} image={article.urlToImage} title={article.title} description={article.description} key={key} />
  ));
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='lg:p-5 mt-5 sm:p-2 sm:flex-col'>
        <h1 className="news text-white m-10">News</h1>
<div className="form-control flex max-w-xs m-10" onSubmit={()=>setChangedQuery(query)}>
  <div className="input-group">
    <input type="text" placeholder="Search…" className="input input-bordered" value={query}
              onChange={(event) => {
              setQuery(event.target.value);
            }}/>
    <button className="btn btn-square" onClick={()=>setChangedQuery(query)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
            {console.log(query)}
    <div className='grid flex-row 
      lg:grid-cols-3 sm:grid-cols-1
      md:grid-cols-2 flex-wrap relative gap-4 p-10'>
        {newsDet}
        </div>
      </div>
      <Footer/>
      </div>
  );
};

export default News;
