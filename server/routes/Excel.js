const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const ExcelJS = require('exceljs');

const { Orders } = require('../models');

router.get('/exportToExcel/cheque/period/:from/:to', async (req, res) => {
    const { from, to } = req.params;
    let data = await Orders.sequelize.query(
        `SELECT orderCode as Номер_заказа, GROUP_CONCAT(concat(prods.brand,' ',prods.name) SEPARATOR ', ') as Наименование, orders.createdAt as Дата_заказа, round(sum(total*number),2) as Сумма_заказа,
        email as Покупатель
        FROM orders
        join users on users.id=orders.userId
        join prods on prods.id=orders.prodId
        WHERE orders.createdAt >= "${from}" AND orders.createdAt < DATE_ADD("${to}", INTERVAL 1 DAY)        
        GROUP BY orders.createdAt,orderCode,email`,
        { type: Sequelize.QueryTypes.SELECT });

    let fullTotal = await Orders.sequelize.query(
        `SELECT round(sum(total*number),2) as Всего_за_период FROM orders
        WHERE orders.createdAt >= "${from}" AND orders.createdAt < DATE_ADD("${to}", INTERVAL 1 DAY)`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за период с ${from} по ${to}`);

    let headers = Object.keys(data[0]).concat('Всего_за_период');
    worksheet.addRow(headers);

    let fulltotal = false;
    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            if (header === 'Всего_за_период' && !fulltotal) {
                row.push(fullTotal[0].Всего_за_период);
                fulltotal = true;
            } else {
                row.push(item[header]);
            }
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

router.get('/exportToExcel/cheque/month', async (req, res) => {
    let data = await Orders.sequelize.query(
        `SELECT orderCode as Номер_заказа, GROUP_CONCAT(concat(prods.brand,' ',prods.name) SEPARATOR ', ') as Наименование, orders.createdAt as Дата_заказа, round(sum(total*number),2) as Сумма_заказа,
        email as Покупатель
        FROM orders
        join users on users.id=orders.userId
        join prods on prods.id=orders.prodId
        WHERE month(orders.createdAt) = month(now())        
        GROUP BY orders.createdAt,orderCode,email`,
        { type: Sequelize.QueryTypes.SELECT });

    let fullTotal = await Orders.sequelize.query(
        `SELECT round(sum(total*number),2) as Всего_за_период FROM orders
        WHERE month(orders.createdAt) = month(now())`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за месяц`);

    let headers = Object.keys(data[0]).concat('Всего_за_период');
    worksheet.addRow(headers);

    let fulltotal = false;
    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            if (header === 'Всего_за_период' && !fulltotal) {
                row.push(fullTotal[0].Всего_за_период);
                fulltotal = true;
            } else {
                row.push(item[header]);
            }
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

router.get('/exportToExcel/sellings/period/:from/:to', async (req, res) => {
    const { from, to } = req.params;
    let data = await Orders.sequelize.query(
        `SELECT date(orders.createdAt) as Дата_продажи,concat(prods.brand,' ',prods.name) as Наименование,
        sum(number) as Количество, round(sum(total*number),2) as Сумма
        FROM orders
        join prods on prods.id=orders.prodId
        WHERE orders.createdAt >= "${from}" AND orders.createdAt < DATE_ADD("${to}", INTERVAL 1 DAY)        
        GROUP BY date(orders.createdAt),prods.name,prods.brand`,
        { type: Sequelize.QueryTypes.SELECT });

    let fullTotal = await Orders.sequelize.query(
        `SELECT round(sum(total*number),2) as Всего_за_период FROM orders
        WHERE orders.createdAt >= "${from}" AND orders.createdAt < DATE_ADD("${to}", INTERVAL 1 DAY)`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за период с ${from} по ${to}`);

    let headers = Object.keys(data[0]).concat('Всего_за_период');
    worksheet.addRow(headers);

    let fulltotal = false;
    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            if (header === 'Всего_за_период' && !fulltotal) {
                row.push(fullTotal[0].Всего_за_период);
                fulltotal = true;
            } else {
                row.push(item[header]);
            }
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

router.get('/exportToExcel/sellings/month', async (req, res) => {
    let data = await Orders.sequelize.query(
        `SELECT date(orders.createdAt) as Дата_продажи,concat(prods.brand,' ',prods.name) as Наименование,
        sum(number) as Количество, round(sum(total*number),2) as Сумма
        FROM orders
        join prods on prods.id=orders.prodId
        WHERE month(orders.createdAt) = month(now())        
        GROUP BY date(orders.createdAt),prods.name,prods.brand`,
        { type: Sequelize.QueryTypes.SELECT });

    let fullTotal = await Orders.sequelize.query(
        `SELECT round(sum(total*number),2) as Всего_за_период FROM orders
        WHERE month(orders.createdAt) = month(now())`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за месяц`);

    let headers = Object.keys(data[0]).concat('Всего_за_период');
    worksheet.addRow(headers);

    let fulltotal = false;
    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            if (header === 'Всего_за_период' && !fulltotal) {
                row.push(fullTotal[0].Всего_за_период);
                fulltotal = true;
            } else {
                row.push(item[header]);
            }
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

router.get('/exportToExcel/supply/period/:from/:to', async (req, res) => {
    const { from, to } = req.params;
    let data = await Orders.sequelize.query(
        `select date(deliveries.createdAt) as Дата_поставки,prods.name as Наименование,
        stores.producer as Поставщик, sum(deliveries.number) as Количество from deliveries
        join prods on prods.id=deliveries.prodId
        join stores on prods.id=stores.prodId
        WHERE deliveries.createdAt >= "${from}" AND deliveries.createdAt < DATE_ADD("${to}", INTERVAL 1 DAY)        
        group by date(deliveries.createdAt),prods.name,stores.producer`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за период с ${from} по ${to}`);

    let headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            row.push(item[header]);
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

router.get('/exportToExcel/supply/month', async (req, res) => {
    let data = await Orders.sequelize.query(
        `select date(deliveries.createdAt) as Дата_поставки,prods.name as Наименование,
        stores.producer as Поставщик, sum(deliveries.number) as Количество from deliveries
        join prods on prods.id=deliveries.prodId
        join stores on prods.id=stores.prodId
        WHERE month(deliveries.createdAt) = month(now())        
        group by date(deliveries.createdAt),prods.name,stores.producer`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за месяц`);

    let headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    
    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            row.push(item[header]);
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

router.get('/exportToExcel/remains', async (req, res) => {
    let data = await Orders.sequelize.query(
        `select prods.name as Наименование,sum(number) as Количество from stores
        join prods on prods.id=stores.prodId       
        group by prods.name
        order by Количество;`,
        { type: Sequelize.QueryTypes.SELECT });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(`Отчёт за месяц`);

    let headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    
    data.forEach((item) => {
        let row = [];
        headers.forEach(header => {
            row.push(item[header]);
        });
        worksheet.addRow(row);
    });

    await workbook.xlsx.writeFile(`out.xlsx`);

    res.download(`out.xlsx`);
});

module.exports = router;