const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const MaskData = require('maskdata');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!.@#$%^&*])(?=.{8,})/;

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 3,
    maskAtTheRate: false
};


exports.signup = (req, res, next) => {
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ error: "Email incorrect !" });
      }
    if (!PASSWORD_REGEX.test(req.body.password)) {
    return res.status(401).json({
        error:
        "Minimum: 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)",
    })}
    bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
        const user = User.create({
            email: req.body.email,
            name: req.body.name,
            firstname: req.body.firstname,
            password: hash,
            isAdmin: false,
        })
        .then((user) => {
            
            res.status(201).json({
                userId: user.id,
                isAdmin: user.isAdmin,
            });
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error: 'error : Compte existe déja'  }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({where:{ email: req.body.email }})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                    user.email = MaskData.maskEmail2(req.body.email, emailMask2Options)
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };