
import { celebrate, Joi } from 'celebrate';
import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

class Routes {
  public routes: express.Router;

  public upload: multer.Multer;

  public constructor() {
    this.routes = express.Router();
    this.upload = multer(multerConfig);

    this.setRoutes();
  }

  private setRoutes(): void {
    const pointsController = new PointsController();
    const listController = new ItemsController();

    this.routes.get('/items', listController.index);

    this.routes.post(
      '/points',
      this.upload.single('image'),
      celebrate({
        body: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.number().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          city: Joi.string().required(),
          uf: Joi.string().required().max(2),
          items: Joi.string().required(),
        }),
      }, {
        abortEarly: false,
      }),
      pointsController.create,
    );

    this.routes.get('/points', pointsController.index);
    this.routes.get('/points/:id', pointsController.show);
  }
}

export default new Routes().routes;
