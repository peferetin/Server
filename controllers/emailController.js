import transport from '../middlewares/nodeMailer.js'

const sendEmail = async (req, res) => {

    const { subject, text, email } = req.body
    try {
        await transport.sendMail({
            from: email,
            to: 'paul.eferetin@students.beaminstitute.org',
            subject,
            text: `${text} from : ${email}`
        })
        res.json({ message: 'Message successfully sent' })
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}


export { sendEmail }