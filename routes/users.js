var express = require('express');
var router = express.Router();
const sequelize = require('../models').sequelize;
const HTTPStatus = require('http-status');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  const {email, name, password} = req.body;
  if (!email) return res.status(HTTPStatus.BAD_REQUEST).send('email is required');
  if (!name) return res.status(HTTPStatus.BAD_REQUEST).send('name is required');
  if (!password) return res.status(HTTPStatus.BAD_REQUEST).send('password is required');
  
  const sql = `INSERT INTO "users" (email, name, password) VALUES (:email, :name, :password)`;
  sequelize.query(sql,{
    replacements: {
      email: email,
      name: name,
      password: password
    },
    type: sequelize.QueryTypes.INSERT
  }).then(function(){
    res.status(HTTPStatus.CREATED).json({
      email: email,
      name: name,
      password: password
    });
  }).catch(function(err){
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(HTTPStatus.BAD_REQUEST).send(err.errors[0].message)
    }
    console.error(err);
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err);
  });
});

router.post('/login', function(req, res, next){
  const {email, password} = req.body;

  if (!email) return res.status(HTTPStatus.BAD_REQUEST).send('email is required');
  if (!password) return res.status(HTTPStatus.BAD_REQUEST).send('password is required');

  const sql = `SELECT * FROM "users" WHERE email = :email AND password = :password`;
  sequelize.query(sql,{
    replacements: {
      email: email,
      password: password
    },
    type: sequelize.QueryTypes.SELECT
  }).then(function(user){
    if(user[0]){
      return res.status(HTTPStatus.OK).end();
    }
    return res.status(HTTPStatus.UNAUTHORIZED).send('email or password is incorrect');
  }).catch(function(err){
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err);
  });
});
module.exports = router;