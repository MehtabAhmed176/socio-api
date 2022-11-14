import mongoose, { Schema } from 'mongoose'

const schema = new mongoose.Schema({
  body: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: [String]
})

// An interface that describes the properties
// that are requried to create a new Question
interface QuestionAttrs {
  body: string;
  owner: string,
  color?: string,
  expiredAt: string,
  comment: string[];
}

// An interface that describes the properties
// that a User Model has
interface QuestionModel extends mongoose.Model<QuestionDoc> {
  build(attrs: QuestionAttrs): QuestionDoc;
}

// An interface that describes the properties
// that a Question Document has
interface QuestionDoc extends mongoose.Document {
  body: string;
  owner: string,
  color?: string,
  expiredAt: string,
  comment?: string[];
}

const questionSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: [String],
    expiredAt: {
      type: Date,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

questionSchema.index({ location: '2dsphere' }); // 2dsphere indexes for speeding up geospatial queries

questionSchema.statics.build = (attrs: QuestionAttrs) => {
  return new Question(attrs);
};

const Question = mongoose.model<QuestionDoc, QuestionModel>('Question', questionSchema);

export { Question, QuestionDoc, QuestionAttrs };
