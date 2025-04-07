import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { Suspense } from "react";
import { NewsArticleType } from "../types";
const NewsCard = ({ article }: { article: NewsArticleType }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card className="text-start transition transform duration-500 hover:translate-x-1 hover:-translate-y-1 hover:z-5 shadow-md hover:shadow-[rgba(133,58,255,0.25)]  dark:bg-zinc-900">
        <a href={article.url} target="_blank">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="rounded-t-md"
            />
          )}
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>
              <p className="flex gap-1">
                <span>Published on</span>
                <span>
                  {dayjs(article.publishedAt).format("MMMM DD, YYYY hh:mm A")}
                </span>
              </p>
              {article.author ? " by " + article.author : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {article?.description
                ? article?.description.length > 200
                  ? article?.description.slice(0, 200) + "..."
                  : article?.description.slice(0, 200)
                : "..."}
            </p>
          </CardContent>
        </a>
      </Card>
    </Suspense>
  );
};

export default NewsCard;
