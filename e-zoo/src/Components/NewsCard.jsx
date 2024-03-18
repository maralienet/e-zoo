import React from "react";

function NewsCard({img,text,date}){
    return(
        <a className="newsCard">
            <img src={img} alt={text}/>
            <div className="txt">
                <h6 className="name">{text}</h6>
                <p className="date">{date}</p>
            </div>
        </a>
    );
}

export default NewsCard;