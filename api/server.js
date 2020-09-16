const express = require('express');
const helmet = require('hemlet');
const morgan = require('morgan');
const cors = require('cors');
const bcryptjs = require('bcryptjs'); 
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router"); 
const connection = require("../data/knex-config");

const server = express();


const sessionConfig = {
    name: "castle",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true, 
    },
    store: new KnexSessionStore({ 
        knex: connection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    })
}


server.use(express.json(), helmet(), morgan('dev'), cors(), session(sessionConfig));

server.use('/api/users', protected, userRouter);
server.use('/api/auth', authRouter);

server.use('/', (req, res) => {res.send('Server is up...')});
server.get('/', (req, res) => {
    const password = req.headers.password;

    const rounds = process.env.BCRYPT_ROUNDS || 4; 
    const hash = bcryptjs.hashSync(password, rounds);
    res.json({ api: "up", password, hash });
});

function protected(req, res, next) {
    if (req.session.username) {
        next();
    } else {
        res.status(401).json({ you: "cannot pass!" });
    }
}


module.exports = server; 
