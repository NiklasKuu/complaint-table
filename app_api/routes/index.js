var express = require('express');
var router = express.Router();

var rageController = require("../controller/rageController");

/* Api controller routes */
router.get('/rages',rageController.getAllRages);
router.post('/rages/new',rageController.createNewRage);
router.delete('/rages/:rageid', rageController.deleteRage);










module.exports = router;
