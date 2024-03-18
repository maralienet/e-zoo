import React from "react";
import { useDispatch, useSelector } from 'react-redux';

function CallWin() {
    const dispatch = useDispatch();
    const active = useSelector(state => state.activeCall);
    const showCall = () => {
        dispatch({ type: 'SHOW_HIDE_CALL', activeCall: !active });
        if (!active)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }
    return (
        <div className="callWin">
            <div className="calling">
                <div className="close" onClick={showCall}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                </div>
                <div className="call">
                    <p>Позвонить</p>
                    <div>
                        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.43984 2.04248L5.43332 2.02176L5.4259 2.00134C5.34492 1.77847 5.21212 1.54793 4.99868 1.35937C4.78017 1.16633 4.52736 1.06185 4.27985 1.02109C3.85691 0.951451 3.45647 1.06867 3.17877 1.17519C2.43228 1.40424 1.77435 1.99901 1.35557 2.84531L1.35069 2.85516L1.34603 2.86512C0.808997 4.0132 0.958893 5.33342 1.37407 6.50904C1.7963 7.70459 2.54147 8.89894 3.42473 9.9189C4.30699 10.9377 5.37191 11.8343 6.47487 12.3931C7.55767 12.9418 8.83594 13.2392 10.0154 12.7609L10.0262 12.7565L10.0369 12.7518C10.9659 12.3495 11.5248 11.6292 11.7878 10.9797L11.7961 10.9592L11.8035 10.9383C11.8884 10.6985 12.0226 10.3052 11.9966 9.90159C11.9816 9.66961 11.9141 9.41068 11.7477 9.16865C11.5878 8.93615 11.3778 8.7791 11.1683 8.67393L11.1678 8.67367C10.5811 8.36317 9.96436 8.03673 9.31277 7.7409C8.91066 7.55441 8.4997 7.5728 8.16861 7.7026C7.8818 7.81504 7.59387 8.03683 7.43392 8.36066C7.36158 8.5018 7.30699 8.57595 7.27025 8.61951C7.26443 8.62641 7.25865 8.63306 7.25274 8.63962C7.17805 8.57943 7.0899 8.50289 6.98999 8.41015C6.72029 8.15979 6.40497 7.82881 6.09871 7.47481C5.79229 7.12063 5.50979 6.76058 5.30084 6.45548C5.19607 6.3025 5.11792 6.17511 5.0659 6.07737C5.06348 6.07281 5.06116 6.06841 5.05894 6.06416C5.08616 6.03738 5.10966 6.01643 5.13718 5.99483C5.18569 5.95673 5.2652 5.90287 5.40556 5.83919L5.4333 5.82661L5.46022 5.81236C5.99722 5.52815 6.3592 4.81685 6.12736 4.06814C6.01551 3.69661 5.88929 3.33819 5.77078 3.00497C5.76074 2.97676 5.75078 2.94876 5.74088 2.92095C5.63084 2.61182 5.52928 2.32651 5.43984 2.04248Z" stroke="#3E3E3E" stroke-width="2"></path>
                        </svg>
                        7255
                    </div>
                </div>
                <div className="recall">
                    <label>Перезвоните мне</label>
                    <input type="phone" placeholder="Введите номер" />
                </div>
                <div className="order">
                    <button>Заказать звонок</button>
                </div>
            </div>
        </div>
    );
}

export default CallWin;