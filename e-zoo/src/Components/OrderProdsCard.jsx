import React from "react";

function OrderProdsCard({ img, name, number, price, isAvail }) {
    return (
        <div className="cartProdCard">
            <div className="prodImg">
                <img src={img} />
            </div>
            <div className="txts">
                {isAvail ?
                    <p className="avail">В наличии</p>
                    :
                    <p className="unavail">Не в наличии</p>}
                <p className="name">{name}</p>
            </div>
            <div className="mngs">
                <div className="plusminus">
                    {number} шт.
                </div>
                <div className="manage">
                    <h5>{(price).toFixed(2)} BYN / шт.</h5>
                </div>
            </div>

        </div>
    );
}

export default OrderProdsCard;