import React from 'react'
const NewsCard = (props,id) => {
  return (
    <a  href={props.link} target='_blank' key={id} className='bg-zinc-900 rounded-xl m-5 hover:rounded-3xl hover:border-teal-400 hover:shadow-3xl transition transform duration-500 hover:-translate-y-1 hover:scale-105'>
        <img src={props.image} className='card-img-top'/>
        <div className='card-body'>
        <h3 className='card-title m-2'>{props.title}</h3>
        <p className='card-text'>
            {props.description}
        </p> 
        </div>
    </a>
  )
}

export default NewsCard