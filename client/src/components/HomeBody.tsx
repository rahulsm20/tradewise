import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { apiService } from "../api";
import NewsCard from "../components/NewsCard";
import { NewsArticleType } from "../types";
import Loading from "./Loading";

const HomeBody = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("web3");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;
  useEffect(() => {
    try {
      setLoading(true);
      const fetchNews = async () => {
        const response = await apiService.getNews(query);
        if (response) {
          setNews(response);
          setTotalPages(Math.ceil(response.length / pageSize));
        }
      };
      fetchNews();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await apiService.getNews(query);
    setLoading(false);
    setNews(response);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const startIndex = (page - 1) * pageSize;
  const displayedNews = news.slice(startIndex, startIndex + pageSize);

  return (
    <div className="flex flex-col gap-5 items-center m-auto mt-10">
      <form
        className="flex relative items-center border rounded-[--radius]"
        onSubmit={submitForm}
      >
        <Input
          placeholder="Search anything..."
          className="border-0 focus:border-0"
          disabled={loading}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="relative p-2">
          <Search className="h-4 w-4" />
        </div>
      </form>
      {loading || displayedNews.length === 0 ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5 p-5 w-[95%]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {displayedNews && displayedNews.length > 0
              ? displayedNews.map((article: NewsArticleType, key: number) => (
                  <NewsCard article={article} key={key} />
                ))
              : "No articles found"}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    className={
                      page === index + 1 ? "bg-slate-200 dark:bg-zinc-700" : ""
                    }
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default HomeBody;
