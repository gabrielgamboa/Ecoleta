import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsControllers';

const routes = express.Router();

//instanciando as classes que possuem os métodos
// de criação e listagem de usuários
const pointsController = new PointsController();
const itemController = new ItemsController();

routes.get('/items', itemController.index);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
routes.post('/points',pointsController.create);




//index, show, create, update, delete

module.exports = routes;