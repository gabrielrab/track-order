const jwt = require('jsonwebtoken');
const {promisify} = require('util');

module.exports = async (req, res, next)=> {
    const authHeader = req.token.user;

    if(!authHeader){
        res.status(401).send({error: 'No token provid'});
    }

    const [scheme, token] = authHeader;

    try {
        const decoded = await promisify(jwt.sign)(token, "secret");
        
        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).send({error: 'Token invalid'});
    }
}
