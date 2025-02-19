const nodemailer = require('nodemailer')
const asyncHandler = require("express-async-handler")

const sendMail = asyncHandler(async ({ email, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"CuaHangDienTu"', // sender address
        to: email, // list of receivers
        subject: "Forgot password", // Subject line
        html: html, // html body
    });
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    console.log("Message sent: %s", info.messageId);
    return info
})

module.exports = {
    sendMail
}