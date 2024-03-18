import React, { useState } from "react";
import axios from 'axios';

function ReportSellings() {
    const [dates, setDates] = useState([null, null]);
    const [choose, setChoose] = useState(false);
    const saveReportSellings = (isPeriod) => {
        if (isPeriod) {
            axios.get(`http://localhost:3001/excel/exportToExcel/sellings/period/${dates[0]}/${dates[1]}}`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    let today = new Date();
                    today = formatDate(today);
                    a.download = `Отчёт продаж ${today}.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => console.error(error));
        }
        else {
            axios.get(`http://localhost:3001/excel/exportToExcel/sellings/month`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    let today = new Date();
                    today = formatDate(today);
                    a.download = `Отчёт продаж ${today}.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => console.error(error));
        }
    }
    const handleFromDateChange = (event) => {
        setDates([event.target.value, dates[1]]);
    };

    const handleToDateChange = (event) => {
        setDates([dates[0], event.target.value]);
    };
    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }
    
    return (
        <>
            <h5>Отчёт по продажам</h5>
            <div className="btns">
                <span>Отчёт за определённый период</span>
                <button className="mainbtn" onClick={() => setChoose(!choose)}>Определить даты</button>
                <span>Отчёт за текущий месяц</span>
                <button className="mainbtn" onClick={() => saveReportSellings(false)}>Скачать</button>
                {choose &&
                    <>
                        <div className="dates">
                            <div>
                                <label htmlFor='from'>Начальное число</label>
                                <input type="date" id='from' onChange={(e) => handleFromDateChange(e)} />
                            </div>
                            <div>
                                <label htmlFor="to">Конечное число</label>
                                <input type="date" id='to' min={dates[0]} onChange={(e) => handleToDateChange(e)} />
                            </div>
                        </div>
                        <button className="mainbtn" disabled={dates.length !== 2 && 'disabled'} onClick={() => saveReportSellings(true)}>Скачать</button>
                    </>
                }
            </div>
        </>
    );
}

export default ReportSellings;