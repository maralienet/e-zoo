import React from "react";

function BrandItem({ href, img }) {
    return (
        <div className="brandItem">
            <a href={href}>
                <img src={img} />
            </a>
        </div>
    );
}

export default BrandItem;