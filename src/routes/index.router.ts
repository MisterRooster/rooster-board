import express, { Request, Response, NextFunction } from 'express';

// Required controller modules.
import { index_get } from "../controllers/message.controller";

const router = express.Router();

// GET home page.
router.get('/', index_get);

// GET about page.
router.get('/about', (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render('about', { title: 'Rooster Board | About' });
});

export default router;
