const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const puppeteer = require('puppeteer');

const { Store } = require('../models');

router.get('/exportToPdf/remains', async (req, res) => {
    let data = await Store.sequelize.query(`
    select prods.name as Наименование,sum(number) as Количество from stores
    join prods on prods.id=stores.prodId       
    group by prods.name
    order by Количество;`,
        { type: Sequelize.QueryTypes.SELECT });

    let headers = Object.keys(data[0]);
    let body = [];

    body.push(headers);

    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            row.push(item[header]);
        });
        body.push(row);
    });

    let today = formatDate(new Date());

    let html = `
<html>
<head>
<style>
    body {
        font-family: muller, Arial, sans-serif;
        margin: 2.5% 10% 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h5 {
        font-weight: normal;
    }
    .header {
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        text-align: center;
    }
    .header h2 {
        margin-bottom: 10px;
    }
    .header h3 {
        margin-top: 0;
    }
    .data {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .logo {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    .info td:last-child {
        text-align: center;
    }
    table * {
        border: 1px solid;
    }
    th {
        padding: 10px 0;
    }
    td {
        padding: 5px 10px;
    }
    .footer {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .footer>div {
        margin: 10px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .fio {
        text-align: end;
    }
    .signature {
        color: #a0a0a0;
        font-size: 0.7em;
        border-bottom: 1px solid black;
        text-align: center !important;
    }
</style>
</head>
<body>
    <div class="header">
        <div class="data">${today}</div>
        <div>
            <h2>Магазин зоотоваров</h2>
            <h3>e-zoo.by</h3>
        </div>
        <div class="logo"><img src="https://e-zoo.by/img/header/logo.svg" /></div>
    </div>
    <div class="body">
        <h3>Отчёт по остаткам</h3>
        <table>
            ${body.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </table>
    </div>
    <div class="footer">
        <div>
            <div>Директор</div>
            <div class="signature">(Подпись)</div>
            <div class="fio">И.И. Иванов</div>
        </div>
        <div>
            <div>Складовщик</div>
            <div class="signature">(Подпись)</div>
            <div class="fio">Ф.Ф. Фёдоров</div>
        </div>
    </div>
</body>
</html>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: 'out.pdf', format: 'A4' });
    await browser.close();

    res.download('out.pdf');
});

router.get('/exportToPdf/supply/month', async (req, res) => {
    let data = await Store.sequelize.query(`
    select date(deliveries.createdAt) as Дата_поставки,prods.name as Наименование,
        stores.producer as Поставщик, sum(deliveries.number) as Количество from deliveries
        join prods on prods.id=deliveries.prodId
        join stores on prods.id=stores.prodId
        WHERE month(deliveries.createdAt) = month(now())        
        group by date(deliveries.createdAt),prods.name,stores.producer;`,
        { type: Sequelize.QueryTypes.SELECT });

    let headers = Object.keys(data[0]);
    let body = [];

    body.push(headers);

    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            row.push(item[header]);
        });
        body.push(row);
    });

    let today = formatDate(new Date());

    let html = `
<html>
<head>
<style>
    body {
        font-family: muller, Arial, sans-serif;
        margin: 2.5% 10% 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h5 {
        font-weight: normal;
    }
    .header {
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        text-align: center;
    }
    .header h2 {
        margin-bottom: 10px;
    }
    .header h3 {
        margin-top: 0;
    }
    .data {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .logo {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    .info td:last-child,
    .info td:first-child{
        text-align: center;
    }
    table * {
        border: 1px solid;
    }
    th {
        padding: 10px 0;
    }
    td {
        padding: 5px 10px;
    }
    .footer {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .footer>div {
        margin: 10px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .fio {
        text-align: end;
    }
    .signature {
        color: #a0a0a0;
        font-size: 0.7em;
        border-bottom: 1px solid black;
        text-align: center !important;
    }
</style>
</head>
<body>
    <div class="header">
        <div class="data">${today}</div>
        <div>
            <h2>Магазин зоотоваров</h2>
            <h3>e-zoo.by</h3>
        </div>
        <div class="logo"><img src="https://e-zoo.by/img/header/logo.svg" /></div>
    </div>
    <div class="body">
        <h3>Отчёт по поставкам</h3>
        <table>
            ${body.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </table>
    </div>
    <div class="footer">
        <div>
            <div>Директор</div>
            <div class="signature">(Подпись)</div>
            <div class="fio">И.И. Иванов</div>
        </div>
        <div>
            <div>Складовщик</div>
            <div class="signature">(Подпись)</div>
            <div class="fio">Ф.Ф. Фёдоров</div>
        </div>
    </div>
</body>
</html>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: 'out.pdf', format: 'A4' });
    await browser.close();

    res.download('out.pdf');
});

router.get('/exportToPdf/supply/period/:from/:to', async (req, res) => {
    const { from, to } = req.params;
    let data = await Store.sequelize.query(`
        select date(deliveries.createdAt) as Дата_поставки,prods.name as Наименование,
        stores.producer as Поставщик, sum(deliveries.number) as Количество from deliveries
        join prods on prods.id=deliveries.prodId
        join stores on prods.id=stores.prodId
        WHERE deliveries.createdAt >= "${from}" AND deliveries.createdAt < DATE_ADD("${to}", INTERVAL 1 DAY)        
        group by date(deliveries.createdAt),prods.name,stores.producer;`,
        { type: Sequelize.QueryTypes.SELECT });

    let headers = Object.keys(data[0]);
    let body = [];

    body.push(headers);

    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            row.push(item[header]);
        });
        body.push(row);
    });

    let today = formatDate(new Date());

    let html = `
<html>
<head>
<style>
    body {
        font-family: muller, Arial, sans-serif;
        margin: 2.5% 10% 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h5 {
        font-weight: normal;
    }
    .header {
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        text-align: center;
    }
    .header h2 {
        margin-bottom: 10px;
    }
    .header h3 {
        margin-top: 0;
    }
    .data {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .logo {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    .info td:last-child,
    .info td:first-child{
        text-align: center;
    }
    table * {
        border: 1px solid;
    }
    th {
        padding: 10px 0;
    }
    td {
        padding: 5px 10px;
    }
    .footer {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .footer>div {
        margin: 10px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .fio {
        text-align: end;
    }
    .signature {
        color: #a0a0a0;
        font-size: 0.7em;
        border-bottom: 1px solid black;
        text-align: center !important;
    }
</style>
</head>
<body>
    <div class="header">
        <div class="data">${today}</div>
        <div>
            <h2>Магазин зоотоваров</h2>
            <h3>e-zoo.by</h3>
        </div>
        <div class="logo"><img src="https://e-zoo.by/img/header/logo.svg" /></div>
    </div>
    <div class="body">
        <h3>Отчёт по поставкам</h3>
        <table>
            ${body.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </table>
    </div>
    <div class="footer">
        <div>
            <div>Директор</div>
            <div class="signature">(Подпись)</div>
            <div class="fio">И.И. Иванов</div>
        </div>
        <div>
            <div>Складовщик</div>
            <div class="signature">(Подпись)</div>
            <div class="fio">Ф.Ф. Фёдоров</div>
        </div>
    </div>
</body>
</html>`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: 'out.pdf', format: 'A4' });
    await browser.close();

    res.download('out.pdf');
});

function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
}

module.exports = router;