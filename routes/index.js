var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', (request, response) => {
    if(request.session.displayName){
        response.render('index', {title: 'Deashin Planner', body: `
            <h2>Hello, ${request.session.displayName} </h2>
            <a href="/auth/logout">logout</a>
        `});
    } else {
        response.render('index', {title: 'Deashin Planner', body: `
            <h2>Please login...</h2>
            <a href="/auth/login">login</a>
        `});
    }
});