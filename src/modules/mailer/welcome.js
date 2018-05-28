import transport from './index';

const welcomeEmail = (email, name) => {

    let mailOptions = {
        from: '"Joyn 1031👻" <ecommerce@joyn.com>', // sender address
        to: email, // list of receivers
        subject: 'Cadastro Efetuado! ✔', // Subject line
        text: `Seja bem-vindo(a), ${name}!`, // plain text body
        html: `<b>Seja bem-vindo(a), ${name}!</b>` // html body
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('e-mail error', err);
            return;
        }
        console.log('e-mail sent', info);
    });
};

export default welcomeEmail;