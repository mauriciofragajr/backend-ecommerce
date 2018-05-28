import transport from './index';

const forgotPassword = (email, token) => {

    let mailOptions = {
        from: '"Joyn 1031👻" <ecommerce@joyn.com>', // sender address
        to: email, // list of receivers
        subject: 'Alteração de senha! ✔', // Subject line
        text: `Use o Token: ${token}`, // plain text body
        html: `Use o Token: <b>${token}</b>` // html body
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('e-mail error', err);
            throw err;
        }
        console.log('e-mail sent', info);
    });
};

export default forgotPassword;