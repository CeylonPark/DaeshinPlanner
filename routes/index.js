var express = require('express');
var router = express.Router();

app.get('/', (req, res) => {
    if(req.session.displayName){
        res.send(`
            <h2>Hello, ${req.session.displayName} </h2>
            <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
            <h2>Please login...</h2>
            <a href="/auth/login">login</a>
        `);
    }
});

module.exports = router;