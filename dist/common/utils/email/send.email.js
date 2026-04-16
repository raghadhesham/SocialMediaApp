"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const config_services_1 = require("../../../config/config.services");
const sendEmail = async ({ from, to, subject, html, attachments = [], }) => {
    const transporter = (0, nodemailer_1.createTransport)({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: config_services_1.config.email.EMAIL,
            pass: config_services_1.config.email.PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
        attachments,
    });
    return info.accepted.length ? true : false;
};
exports.sendEmail = sendEmail;
const generateOTP = async () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=send.email.js.map