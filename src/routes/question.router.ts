import express, { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Question, QuestionAttrs, QuestionDoc } from '../models/question.model';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import getGenderColor, { maleColors, femaleColors, otherColors } from '../helpers/gender.colors';
import { User, UserAttrs } from '../models/user'

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
    type QuestionType = QuestionAttrs & { owner: UserAttrs }
    // @TODO - write a function that could be used to build a query
    try {
      let questions: QuestionType[] = await Question.find({

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
      }).populate('owner').lean();
      // question.sort({
      //   createdAt: 'asc'
      // })
      const questionsResponse = [] as any
      questions.forEach((question) => {
        return questionsResponse
          .push({ ...question, color: getGenderColor(question.owner.gender) })
      })
      return res.status(201).send(questionsResponse);
    }
    catch (err) {
      throw new BadRequestError(`something went wrong${err}`);
    }
  }
);

export { router as questionRouter };
