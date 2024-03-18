const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

function sendEmail({ email, code }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "maralienet@gmail.com",
                pass: "qytptgxlmfjhxchs",
            }
        });

        const mail_configs = {
            from: "maralienet@gmail.com",
            to: email,
            subject: "Код подтверждения",
            html: `
        <p>Ваш код подтверждения:
            <b>${code}</b>
        </p>
        `,
        };
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occurred` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}
function sendCheque({ email, code, prods,sum, total,sale }) {
    let orderItems = '';
    let count = 1;
    prods=JSON.parse(prods);
    prods.forEach(prod => {
        orderItems += `<div>${count++}. ${prod.name} 
        ${prod.price} BYN x ${prod.number} шт.</div>`;
    });
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "maralienet@gmail.com",
                pass: "qytptgxlmfjhxchs",
            }
        });

        const mail_configs = {
            from: "maralienet@gmail.com",
            to: email,
            subject: `Чек заказа №${code}`,
            html: `
            <div>
                Уважаемый покупатель! Ваш заказ <b>№${code}</b> подтверждён.<br/>
                В заказ входит:<br/>            
            </div>
            <div>
            ${orderItems}
            </div>
            <br/>
            <div>
                Стоимость: <b>${sum} BYN</b>
            </div>
            <div>
                Ваша скидка: <b>${sale}%</b>
            </div>
            <div>
                Итого: <b>${total} BYN</b>
            </div>
        `,
        };
        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occurred` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}


app.get("/", (req, res) => {
    sendEmail(req.query)
        .then((response) => res.send(response.message))
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.message);
        });
});
app.get("/cheque", (req, res) => {
    sendCheque(req.query)
        .then((response) => res.send(response.message))
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.message);
        });
});

app.listen(4000, () => {
    console.log(`running on port 4000`);
});