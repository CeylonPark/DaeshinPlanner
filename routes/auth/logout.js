var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/logout', (request, response) => {
    delete request.session.displayName;
    response.redirect('/');
});