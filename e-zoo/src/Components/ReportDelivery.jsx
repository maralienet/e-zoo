import React, { useState } from "react";
import axios from 'axios';

function ReportDelivery() {
    const [toggled, setToggled] = useState(false);
    const [dates, setDates] = useState([null, null]);
    const [choose, setChoose] = useState(false);

    const saveReportSupply = (isPeriod) => {
        if (!toggled) {
            if (isPeriod) {
                axios.get(`http://localhost:3001/excel/exportToExcel/supply/period/${dates[0]}/${dates[1]}}`, { responseType: 'blob' })
                    .then(response => {
                        const url = window.URL.createObjectURL(response.data);
                        const a = document.createElement('a');
                        a.href = url;
                        let today = new Date();
                        today = formatDate(today);
                        a.download = `Отчёт поставок ${today}.xlsx`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    })
                    .catch(error => console.error(error));
            }
            else {
                axios.get(`http://localhost:3001/excel/exportToExcel/supply/month`, { responseType: 'blob' })
                    .then(response => {
                        const url = window.URL.createObjectURL(response.data);
                        const a = document.createElement('a');
                        a.href = url;
                        let today = new Date();
                        today = formatDate(today);
                        a.download = `Отчёт поставок ${today}.xlsx`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    })
                    .catch(error => console.error(error));
            }
        }
        else{
            if (isPeriod) {
                axios.get(`http://localhost:3001/pdf/exportToPdf/supply/period/${dates[0]}/${dates[1]}}`, { responseType: 'blob' })
                    .then(response => {
                        const url = window.URL.createObjectURL(response.data);
                        const a = document.createElement('a');
                        a.href = url;
                        let today = new Date();
                        today = formatDate(today);
                        a.download = `Отчёт поставок ${today}.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    })
                    .catch(error => console.error(error));
            }
            else {
                axios.get(`http://localhost:3001/pdf/exportToPdf/supply/month`, { responseType: 'blob' })
                    .then(response => {
                        const url = window.URL.createObjectURL(response.data);
                        const a = document.createElement('a');
                        a.href = url;
                        let today = new Date();
                        today = formatDate(today);
                        a.download = `Отчёт поставок ${today}.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    })
                    .catch(error => console.error(error));
            }
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

        var yy = date.getFullYear();

        return dd + '.' + mm + '.' + yy;
    }

    return (
        <>
            <h5>Отчёт по поставкам</h5>
            <div className="btns">
                <div className="inpdf">
                    <button className={`toggle ${toggled && 'toggled'}`} onClick={() => setToggled(!toggled)}>
                        <div className="circle"></div>
                    </button>
                    <span>Скачать в PDF</span>
                </div>
                <span>Отчёт за определённый период</span>
                <button className="mainbtn" onClick={() => setChoose(!choose)}>Определить даты</button>
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
                        <button className="mainbtn" disabled={dates.length !== 2 && 'disabled'} onClick={() => saveReportSupply(true)}>Скачать</button>
                    </>
                }
                <span>Отчёт за текущий месяц</span>
                <button className="mainbtn" onClick={() => saveReportSupply(false)}>Скачать</button>
            </div>
        </>
    );
}

export default ReportDelivery;