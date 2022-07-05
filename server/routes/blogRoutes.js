const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

/**
 * App Routes
 */
router.get('/', blogController.homepage);
router.get('/blog/:id', blogController.exploreBlogPost);
router.get('/categories', blogController.exploreCategories);
router.get('/categories/:id', blogController.exploreCategoriesByID);
router.get('/test', blogController.exploreTest);
router.get('/submit-blog', blogController.submitBlog);
router.post('/submit-blog', blogController.submitBlogOnPost);
router.post('/submit-details', blogController.submitDetails);

module.exports = router;