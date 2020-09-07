const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);
router.get('/add-anime', adminController.getAddAnime);
router.post('/add-anime', adminController.postAnime);
router.get('/:animeId', adminController.getAnime);

module.exports = router;