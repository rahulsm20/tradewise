import React from "react";
const NewsCard = (props, id) => {
  return (
    <div className="bg-zinc-900 rounded-xl m-5  hover:border-teal-400 hover:shadow-3xl transition transform duration-500 hover:-translate-y-1 hover:scale-105">
      <a href={props.link} target="_blank" key={id}>
        <img src={props.image} className="card-img-top rounded-t-xl" />
        <div className="card-body">
          <p className="flex gap-4">
            <span>{props.date.split("T")[0]}</span>
            <span>{props.date.split("T")[1].substring(0, 8)}</span>
          </p>
          <h3 className="card-title text-base">{props.title}</h3>
          <p className="card-text font-light">{props.description}</p>
          <p className="font-regular">By {props.author}</p>
        </div>
      </a>
    </div>
  );
};

export default NewsCard;
