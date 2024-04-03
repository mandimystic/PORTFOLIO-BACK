const contactRouter = require ('express').Router();
const nodemailer = require ('nodemailer'); // para enviar emails
const { PAGE_URL } = require ('../config');

contactRouter.post('/', async (request, response) => {

    try {
        const { fullname, email, message} = request.body

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.AM_EMAIL,
            pass: process.env.AM_PASS
          }
        });
  
      await transporter.sendMail({
          from:process.env.AM_EMAIL,// sender address
          to: process.env.AM_EMAIL, // list of receivers
          subject: "Nuevo contacto", // Subject line
          text: ``,
          html: `<p class="font-coco">Nombre: ${fullname}</p> 
                <p class="font-bold">e-mail: ${email}</p> 
                <p>Mensaje: ${message}</p>`, // html body, 
        });
  
        return response.status(201).json('E-mail enviado');;
  
      } catch (error) {
        console.log(error);
      }
  
      });
      
  module.exports = contactRouter;
