import React from "react";

function OrderItem({ date, code, price }) {
    return (
        <div className="orderItem">
            <a href={`/me/order/${code}`}>
                <div className="general">
                    <div className="date">Дата заказа: {date}</div>
                    <div className="down">
                        <div>
                            <span className="title">Цена:</span>
                            <span>{price} BYN</span>
                        </div>
                        <div>
                            <span className="title">Заказ:</span>
                            <span>№{code}</span>
                        </div>
                    </div>
                </div>
                <div className="more">
                    Подробнее
                </div>
            </a>
        </div>
    )
}

export default OrderItem;