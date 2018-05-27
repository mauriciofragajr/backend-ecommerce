import express from 'express';
import User from '../../models/User';
import transport from '../../modules/mailer';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import welcomeEmail from '../../modules/mailer/welcome';
import crypto from 'crypto';
import forgotPassword from '../../modules/mailer/forgotPassword';

dotenv.config();

let authRoute = express.Router();

function generateToken(params = {}) {
    return jwt.sign({
        params
    }, process.env.SECRET_KEY, {
        expiresIn: 86400,
    });
};

authRoute.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    }).select('+password');

    if (!user)
        return res.status(400).send({
            error: "User not found!"
        });

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({
            error: "Invalid password"
        });
    }

    user.password = undefined;

    res.send({
        user,
        token: generateToken({
            id: user.id
        })
    });
});

authRoute.post('/register', async (req, res) => {
    const {
        email
    } = req.body;
    try {
        if (await User.findOne({
                email
            })) {
            return res.status(400).send({
                error: 'User already exists!'
            });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        const token = generateToken({
            id: user.id,
            email: user.email
        });

        await welcomeEmail(user.email, user.name);

        return res.send({
            user,
            token
        });

    } catch (err) {
        return res.status(400).send({
            msg: 'Registration failed',
            err
        });
    }
});

authRoute.post('/forgotPassword', async (req, res) => {
    const {
        email
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user)
            return res.status(400).send({
                error: "User not found!"
            });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        await forgotPassword(email, token);

        res.send({
            code: 'OK',
            message: 'message sent'
        });


    } catch (err) {
        console.log(err);

        res.status(400).send({
            error: 'Error on forgot password, try again'
        });
    }
});

authRoute.post('/resetPassword', async (req, res) => {
    const {
        email,
        token,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        }).select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({
                error: "User not found!"
            });

        if (token !== user.passwordResetToken)
            return res.status(400).send({
                error: 'Token invalid'
            });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({
                error: 'Token expired, generate a new one'
            });

        user.password = password;

        await user.save();

        res.send({
            code: 'OK',
            message: 'user password changed'
        });

    } catch (err) {
        res.status(400).send({
            error: 'Cannot reset password, try again'
        })
    }
});

export default authRoute;