import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MenuNav from "../Components/MenuNav";
import edit from '../pics/change_icon.svg';

function Authorization() {
    let navigate = useNavigate();
    const [usersList, setUserList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/users").then((res) => {
            setUserList(res.data)
        });
    }, []);

    const [editable, setEditable] = useState(false);
    const [emsent, setEmsent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [riktig, setRiktig] = useState(true);
    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);
    const [redirectToMe, setRedirectToMe] = useState(false);
    const [id, setId] = useState(false);

    const handleFirstSubmit = (event) => {
        event.preventDefault();
        if (document.getElementById("email").value.length > 0) {
            setEmsent(true);
            sendCode();
        }
    };
    const handleSecondSubmit = (event) => {
        event.preventDefault();
        setConfirmed(false);
        if (emsent)
            checkCode();
    };
    useEffect(() => {
        if (confirmed) {
            checkUniqueness();
        }
    }, [confirmed]);
    useEffect(() => {
        if (confirmed && id) {
            setRedirectToMe(true);
        }
    }, [confirmed, id]);

    const checkCode = () => {
        let cod = document.getElementById("code").value;
        setConfirmed(code === cod);
        setRiktig(code === cod);
    }

    const checkUniqueness = async () => {
        let emails = usersList.map(user => user.email);
        let occurrences = emails.filter(item => item === email).length;

        if (occurrences === 0) {
            const res = await axios.post("http://localhost:3001/users", { "email": email });
            setId(res.data.id);
        }
        else {
            const res = await axios.get(`http://localhost:3001/users?email=${email}`);
            setId(res.data[0].id);
        }
    }

    const forbidCyrrilic = (e) => {
        const re = /[а-яё]/gi;
        if (re.test(e.target.value))
            e.target.value = e.target.value.replace(re, '');
        const num = /^\d/gi;
        if (num.test(e.target.value))
            e.target.value = e.target.value.replace(num, '');
    }

    const generateCode = () => {
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += Math.floor(Math.random() * 10);
        }
        return code;
    }

    const sendCode = () => {
        let c = generateCode();
        setCode(c);
        axios.get("http://localhost:4000/", {
            params: {
                email,
                code: c
            },
        })
            .then(() => {
                console.log("success");
            })
            .catch(() => {
                console.log("failure");
            });
    };
    useEffect(() => {
        let _id;
        if (document.cookie)
            _id = document.cookie.split('; ').find(row => row.startsWith('userid')).split('=')[1];
        const _id_ = _id;
        if (_id_) {
            navigate(`/me/${_id_}`);
        }
    }, []);
    if (redirectToMe) {
        let date = new Date();
        date.setTime(date.getTime() + (3 * 60 * 60 * 1000));
        let expires = "; expires=" + date.toUTCString();
        document.cookie = "userid=" + id + expires + "; path=/";
        navigate(`/me/${id}`);
        return;
    }
    return (
        <div className="authorization">
            <MenuNav />
            <div className="authForm">
                {!emsent ?
                    <form onSubmit={handleFirstSubmit}>
                        <h4>Вход/Регистрация</h4>
                        <label htmlFor="email">Введите электронную почту</label>
                        <input type="email" id="email" placeholder="example@gmail.com" onInput={e => { forbidCyrrilic(e); setEmail(e.target.value) }} />
                        <button type="submit">Войти</button>
                    </form> : ''}
                {emsent ?
                    <form className="confirm" onSubmit={handleSecondSubmit}>
                        <h4>Подтверждение электронной почты</h4>
                        <label htmlFor="emailC">Введите электронную почту, чтобы получить код подтверждения</label>
                        <div className="input">
                            <input type="email" id="emailC" disabled={!editable} value={email} onChange={e => setEmail(e.target.value)} onInput={e => forbidCyrrilic(e)} />
                            <img src={edit} onClick={() => setEditable(!editable)} />
                        </div>
                        <input type="number" size="4" placeholder="Введите код" id="code" required />
                        {!riktig ?
                            <span>Код неверен</span>
                            : ''}
                        <p>Сообщение с кодом подтверждения отправлено на вашу почту.</p>
                        <button class="resend" onClick={sendCode}>Отправить код повторно</button>
                        <button type="submit">Подтвердить</button>
                    </form> : ''}
            </div>
        </div >
    );
}

export default Authorization;