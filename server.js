const express =require('express');
require('dotenv').config();
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(cors())
app.use(express.json())

app.get('/',(req, res)=>{
    res.sendFile(__dirname + 'public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailoptions = {
        from:req.body.email,
        to: 'krithckkishoret@gmail.com',
        text: req.body.message

    }

    transporter.sendMail(mailoptions,(error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('email sent: '+info.response);
            res.send('success')
        }
    })


})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})