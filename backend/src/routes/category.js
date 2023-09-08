const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategoryById);
router.delete('/delete/:id', categoryController.deleteCategoryById);

module.exports = router;
