const express = require('express');
const router = express.Router();

const artpiece_controller = require('../controllers/artpieceController');
const artpiece_instance_controller = require('../controllers/artpieceInstanceController');
const category_controller = require('../controllers/categoryController');
const painter_controller = require('../controllers/painterController');

router.get('/', artpiece_controller.index);
router.get('/pieces', artpiece_controller.pieces_list);
router.get('/pieces/create', artpiece_controller.create_piece_get);
router.post('/pieces/create', artpiece_controller.create_piece_post);
router.get('/pieces/:id/update', artpiece_controller.update_piece_get);
router.post('/pieces/:id/update', artpiece_controller.update_piece_post);
router.get('/pieces/:id/delete', artpiece_controller.delete_piece_get);
router.post('/pieces/:id/delete', artpiece_controller.delete_piece_post);
router.get('/pieces/:id', artpiece_controller.piece_detail);

router.get('/piece_instance/create', 
 artpiece_instance_controller.create_piece_instance_get);
router.post('/piece_instance/create', 
 artpiece_instance_controller.create_piece_instance_post);
router.get('/piece_instance/:id/update', 
 artpiece_instance_controller.update_piece_instance_get);
router.post('/piece_instance/:id/update', 
 artpiece_instance_controller.update_piece_instance_post);
router.get('/piece_instance/:id/delete', 
 artpiece_instance_controller.delete_piece_instance_get);
router.post('/piece_instance/:id/delete', 
 artpiece_instance_controller.delete_piece_instance_post);
router.get('/piece_instance/:id', 
 artpiece_instance_controller.piece_instance_detail);

router.get('/categories', category_controller.categories_list);
router.get('/category/create', category_controller.create_category_get);
router.post('/category/create', category_controller.create_category_post);
router.get('/category/:id/update', category_controller.update_category_get);
router.post('/category/:id/update', category_controller.update_category_post);
router.get('/category/:id/delete', category_controller.delete_category_get);
router.post('/category/:id/delete', category_controller.delete_category_post);
router.get('/category/:id', category_controller.category_detail);

router.get('/painters', painter_controller.painters_list);
router.get('/painter/create', painter_controller.create_painter_get);
router.post('/painter/create', painter_controller.create_painter_post);
router.get('/painter/:id/update', painter_controller.update_painter_get);
router.post('/painter/:id/update', painter_controller.update_painter_post);
router.get('/painter/:id/delete', painter_controller.delete_painter_get);
router.post('/painter/:id/delete', painter_controller.delete_painter_post);
router.get('/painter/:id', painter_controller.painter_detail);

module.exports = router;




