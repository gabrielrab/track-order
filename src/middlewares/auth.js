const jwt = require('jsonwebtoken');
const {promisify} = require('util');

module.exports = async (req, res, next)=> {
    const authHeader = req.token.user;

    if(!authHeader){
        res.status(401).render('login', {error: 'No token provid'});
    }

    const token = authHeader;

    try {
        const decoded = await promisify(jwt.sign)(token, "secret");
        
        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.render('login', {error: 'Token invalid'});
    }
}
