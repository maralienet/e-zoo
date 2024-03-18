import React, { useState } from "react";
import axios from 'axios';

function AddDeliveryAddress({ close, user }) {
    const [street, setStreet] = useState(user.street ? user.street : null);
    const [house, setHouse] = useState(user.house ? user.house : null);
    const [corps, setCorps] = useState(user.corps ? user.corps : null);
    const [floor, setFloor] = useState(user.floor ? user.floor : null);
    const [flat, setFlat] = useState(user.flat ? user.flat : null);

    const changeInf = () => {
        axios.put(`http://localhost:3001/users/${user.id}`, {
            street: street,
            house: house,
            corps: corps,
            floor: floor,
            flat: flat,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="overflowWin">
            <div className="addDeliveryAddr inside">
                <div class="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                </div>
                <h5>Добавить адрес доставки</h5>
                <form onSubmit={(e) => changeInf()}>
                    <fieldset>
                        <input type='text' defaultValue={user.street && user.street} placeholder="Улица*" required onInput={(e) => setStreet(e.target.value)} />
                        <label>Улица</label>
                    </fieldset>
                    <div>
                        <fieldset>
                            <input type='number' defaultValue={user.house && user.house} placeholder="Дом*" min="1" required onInput={(e) => setHouse(e.target.value)} />
                            <label>Дом</label>
                        </fieldset>
                        <fieldset>
                            <input type='number' defaultValue={user.corps && user.corps} placeholder="Корпус" min="1" onInput={(e) => setCorps(e.target.value)} />
                            <label>Корпус</label>
                        </fieldset>
                        <fieldset>
                            <input type='number' defaultValue={user.floor && user.floor} placeholder="Этаж" min="1" onInput={(e) => setFloor(e.target.value)} />
                            <label>Этаж</label>
                        </fieldset>
                        <fieldset>
                            <input type='number' defaultValue={user.flat && user.flat} placeholder="Квартира*" min="1" required onInput={(e) => setFlat(e.target.value)} />
                            <label>Квартира</label>
                        </fieldset>
                    </div>
                    <button type='submit'>Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default AddDeliveryAddress;