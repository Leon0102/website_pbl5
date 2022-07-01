const express = require('express');
const router = express.Router();
const { getAll,historyOfTimes } = require('../controllers/HistoryController');

router.route('/').get(getAll);
router.route('/').post(historyOfTimes);

module.exports = router;
