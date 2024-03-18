import React, { useState } from "react";
import axios from 'axios';

function ChangeCity({ close, user }) {
    const [city, setCity] = useState(user.city ? user.city : null);

    const changeInf = () => {
        axios.put(`http://localhost:3001/users/${user.id}`, {
            city: city,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="overflowWin changeCity">
            <div className="inside">
                <div class="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                </div>
                <h5>Изменить город</h5>
                <div className="cities">
                    <ul>
                        <li className={city === 'Минск' && `active`} onClick={() => setCity('Минск')}>Минск</li>
                        <li className={city === 'Брест' && `active`} onClick={() => setCity('Брест')}>Брест</li>
                        <li className={city === 'Витебск' && `active`} onClick={() => setCity('Витебск')}>Витебск</li>
                        <li className={city === 'Гродно' && `active`} onClick={() => setCity('Гродно')}>Гродно</li>
                        <li className={city === 'Гомель' && `active`} onClick={() => setCity('Гомель')}>Гомель</li>
                        <li className={city === 'Могилёв' && `active`} onClick={() => setCity('Могилёв')}>Могилёв</li>
                    </ul>
                </div>
                <form onSubmit={() => changeInf()}>
                    <button type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default ChangeCity;