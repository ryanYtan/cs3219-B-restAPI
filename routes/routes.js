let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'This is located at IP:PORT/api/',
    });
});

let personController = require('../controllers/personController');

router.route('/persons')
    .get(personController.index)
    .post(personController.insert);

router.route('/persons/:user_name')
    .get(personController.view)
    .patch(personController.update)
    .put(personController.update)
    .delete(personController.remove);

module.exports = router;
