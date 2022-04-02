import { Schema, SchemaTypes } from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { IMatch } from './match.interface';

const MatchSchema = new Schema<IMatch>(
  {
    firstUserId: {
      required: [true, "field 'firstUserId' can not be null"],
      type: SchemaTypes.ObjectId,
      ref: ModelNameEnum.USER,
    },

    secondUserId: {
      required: [true, "field 'secondUserId' can not be null"],
      type: SchemaTypes.ObjectId,
      ref: ModelNameEnum.USER,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

MatchSchema.index({ firstUserId: 1, secondUserId: 1 }, { unique: true });

export default MatchSchema;
