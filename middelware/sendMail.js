import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "2108ujjwal2108@gmail.com",
        pass: process.env.Pass
    }
})

export const sendMail = async (email, subject, message) => {

    try {

        const info = await transporter.sendMail({
            from: "Task scheduler",
            to: email,
            subject: subject,
            text: message
        })
        console.log("message send: ", info.messageId)
        return true

    } catch (error) {
        console.log(error)
        return false;

    }
}