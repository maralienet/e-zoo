import React, { useState } from "react";
import axios from 'axios';

function ChangePersInfo({ close,user }) {
    const [name, setName] = useState(user.name ? user.name : null);
    const [surname, setSurname] = useState(user.surname ? user.surname : null);

    const changeInf = () => {
        axios.put(`http://localhost:3001/users/${user.id}`, {
            name: name,
            surname: surname,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="changePersInfo overflowWin">
            <div className="inside">
                <div class="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                </div>
                <h5>Общая информация</h5>
                <form onSubmit={() => changeInf()}>
                    <fieldset>
                        <input type='text' defaultValue={user.name && user.name} placeholder="Имя" min='2' onInput={(e) => setName(e.target.value)} />
                        <label>Имя</label>
                    </fieldset>
                    <fieldset>
                        <input type='text' placeholder="Фамилия" defaultValue={user.surname && user.surname} min='2' onInput={(e) => setSurname(e.target.value)} />
                        <label>Фамилия</label>
                    </fieldset>
                    <button type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePersInfo;