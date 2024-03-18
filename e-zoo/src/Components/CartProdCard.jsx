import React, { useState } from "react";
import axios from "axios";
import trashbin from "../pics/trashbin.svg";

function CartProdCard({ id, img, name, number, price, isAvail, onUpdate, storeNumber }) {
    const [numb, setNumb] = useState(number);

    const minus = () => {
        if (numb <= 1) return;
        const newNumb = numb - 1;
        setNumb(newNumb);
        updateNumber(newNumb);
    }

    const plus = () => {
        if (numb >= storeNumber) return;
        const newNumb = numb + 1;
        setNumb(newNumb);
        updateNumber(newNumb);
    }

    const updateNumber = async (newNumb) => {
        await axios.put(`http://localhost:3001/cart/${id}`, {
            number: newNumb
        }).then((res) => {
            onUpdate();
            console.log(res.data);
        });
    }

    const removeFromCart = () => {
        axios.delete(`http://localhost:3001/cart/${id}`)
            .then((res) => {
                console.log(res.data);
                document.location.reload();
            });
    }


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
                    <button id="minus" onClick={minus}>-</button>
                    <div className="number">
                        <input type="text" value={isAvail ? numb : 0} />шт
                    </div>
                    <button id="plus" onClick={plus}>+</button>
                </div>
                <div className="manage">
                    <div className="bttns">
                        <button className="delete" onClick={removeFromCart}><img src={trashbin} /></button>
                    </div>
                    <h5>{(price * numb).toFixed(2)} BYN</h5>
                </div>
            </div>

        </div>
    );
}

export default CartProdCard;