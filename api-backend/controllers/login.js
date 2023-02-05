
const sequelize = require('../util/database');

var initModels = require("../models/init-models");
const jwt = require("jsonwebtoken");
var models = initModels(sequelize);

module.exports = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) return res.status(400).json({message: 'Some parameters are undefined'});

    let loadedUser;
    const isAdministrator = req.query.isAdministrator;
    // check for administrator
    if (isAdministrator == 'true') {
        models.user.findOne({where: {email: email}})
            .then(administratorUser => {
                if (!administratorUser) {
                    loadedUser = administratorUser;
                    return res.status(401).json({message: 'Wrong credentials!'});
                }
                loadedUser = administratorUser;
                return bcrypt.compare(password, administratorUser.password);
            })
            .then(isEqual => {
                if (!loadedUser) return;
                if (!isEqual) {
                    return res.status(401).json({message: 'Wrong credentials!'});
                }
                const token = jwt.sign(
                    {
                        user: {
                            id: loadedUser.id,
                            username: loadedUser.username,
                            email: loadedUser.email,
                            role: loadedUser.role
                        }
                    },
                    'antegeiafile',
                    {expiresIn: '1h'}
                );
                res.status(200).json({
                    role: 'admin',
                    token: token
                });
            })
            .catch(err => {
                return res.status(500).json({message: 'Internal server error.'})
            });
    }
}