import nodemailer from 'nodemailer'


// Nodemailer setup

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'paul.eferetin@students.beaminstitute.org',
        pass: process.env.GMAIL_PASSWORD
    }
})

export default transport