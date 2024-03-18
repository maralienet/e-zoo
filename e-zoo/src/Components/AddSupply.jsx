import React, { useState, useEffect } from "react";
import axios from 'axios';

import back from '../pics/back.svg';

function AddSupply({ close }) {
    const [prods, setProdsList] = useState([]);
    const [isProdListShown, showProdList] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3001/prods`).then((res) => {
            setProdsList(res.data);
            setSelectedItem(res.data[0]);
        });
    }, []);

    let today = new Date();
    let date = today.toISOString().split('T')[0];

    const addSupply = () => {
        axios.post(`http://localhost:3001/delivery`, {
            prodId: selectedItem.id,
            number: document.getElementById('deliNum').value,
            deliveryDate: document.getElementById('deliDate').value,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="addSupply">
            <div className="inside">
                <div class="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                </div>
                <b>Поставка</b>
                <div className="label">Товар</div>
                <div className={`firstProd  ${isProdListShown ? 'opened' : 'closed'}`} onClick={() => showProdList(!isProdListShown)}>
                    <img src={selectedItem && require(`../pics/prods/${selectedItem.image}`)} />
                    <span>{selectedItem && selectedItem.brand} {selectedItem && selectedItem.name}</span>
                    <img className='back' src={back} />
                </div>
                {isProdListShown &&
                    <div className="prods">
                        {prods.map((prod) => (
                            <div key={prod.id} className="prod" onClick={() => { setSelectedItem(prod); showProdList(false) }}>
                                <img src={require(`../pics/prods/${prod.image}`)} />
                                <span>{prod.brand} {prod.name}</span>
                            </div>
                        ))}
                    </div>
                }
                <form onSubmit={() => addSupply()}>
                    <div className="formItem">
                        <div className="label">Количество</div>
                        <input type='number' min='1' placeholder="Количество" id='deliNum' required />
                    </div>
                    <div className="formItem">
                        <div className="label">Дата поставки</div>
                        <input type='date' defaultValue={date} max={date} id='deliDate' required />
                    </div>

                    <button type='submit' className="submit">Подтвердить</button>
                </form>
            </div>
        </div>
    );
}

export default AddSupply;