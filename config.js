// config.js
module.exports = {
    'secret': 'supersecret'
  };

router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token informado.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
      
      res.status(200).send(decoded);
    });
});