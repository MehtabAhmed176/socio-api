import express, { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Question } from '../models/question.model';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.post(
  '/api/users/question', currentUser, requireAuth,
  async (req: Request, res: Response) => {
    const { body, location } = req.body;
    const { currentUser } = req

    if (!body || !location) {
      throw new BadRequestError('cannot have empty question body or location');
    }
    
    let question = new Question({ ...req.body, owner: currentUser?.id })
    await question.save();
    return res.status(201).send(question);
  }
);

router.get(
  '/api/users/question', currentUser, requireAuth,
  async (req: Request, res: Response) => {
    const { long, lat, near } = req.query;
    const { currentUser } = req

    if (!long || !lat) {
      throw new BadRequestError('location is a required feild');
    }

    // write a function that could be used to build a query

    try {
      let question = await Question.find({
        owner: currentUser?.id,
        location:
        {
          $near:
          {
            $geometry: { type: "Point", coordinates: [long, lat] },
            $minDistance: 0,
            $maxDistance: near || 5000
          }
        }
      })
      // question.sort({
      //   createdAt: 'asc'
      // })
      console.log('question', question)
      return res.status(201).send(question);
    }
    catch (err) {
      throw new BadRequestError(`something went wrong${err}`);
    }
  }
);

export { router as questionRouter };
