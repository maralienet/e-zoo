import React, { useState } from "react";
import axios from 'axios';

function ReportRemains() {
    const [toggled, setToggled] = useState(false);

    const saveReportRemains = () => {
        if (!toggled)
            axios.get(`http://localhost:3001/excel/exportToExcel/remains`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    let today = new Date();
                    today = formatDate(today);
                    a.download = `Отчёт остатков ${today}.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => console.error(error));
        else
            axios.get(`http://localhost:3001/pdf/exportToPdf/remains`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(response.data);
                    const a = document.createElement('a');
                    a.href = url;
                    let today = new Date();
                    today = formatDate(today);
                    a.download = `Отчёт остатков ${today}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => console.error(error));
    }

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
            <h5>Отчёт по остаткам</h5>
            <div className="btns">
                <span>Отчёт по всем товарам</span>
                <div className="inpdf">
                    <button className={`toggle ${toggled && 'toggled'}`} onClick={() => setToggled(!toggled)}>
                        <div className="circle"></div>
                    </button>
                    <span>Скачать в PDF</span>
                </div>
                <button className="mainbtn" onClick={() => saveReportRemains()}>Скачать</button>
            </div>
        </>
    );
}

export default ReportRemains;