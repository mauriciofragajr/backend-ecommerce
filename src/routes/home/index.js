import express from 'express';
import transport from '../../modules/mailer';
// import authMiddleware from '../../middlewares/auth';

let homeRoute = express.Router();

// homeRoute.use(authMiddleware);

homeRoute.get('/testEmail', async (req, res) => {
    let mailOptions = {
        from: '"Mauricio Fraga Jr 👻" <mauriciofragajr@gmail.com>', // sender address
        to: 'mauriciofragajr@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    await transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send({
                code: 'ERRO',
                message: err
            });
        }
        res.send({
            code: 'OK',
            message: 'Message sent.',
            info
        });
    });
});

export default homeRoute;