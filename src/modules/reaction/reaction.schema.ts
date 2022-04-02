import { Schema, SchemaTypes } from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { REACTION_TYPE } from './reaction.enum';
import { IReaction } from './reaction.interface';

const ReactionSchema = new Schema<IReaction>(
  {
    type: {
      type: SchemaTypes.String,
      required: [true, "field 'type' can not be null"],
      enum: {
        values: [
          REACTION_TYPE.LIKE,
          REACTION_TYPE.DISLIKE,
          REACTION_TYPE.SUPERLIKE,
        ],
        message: "field 'type' must be in \"'LIKE', 'SUPERLIKE', 'DISLIKE'\"",
      },
    },
    fromUserId: {
      required: [true, "field 'fromUserId' can not be null"],
      type: SchemaTypes.ObjectId,
      ref: ModelNameEnum.USER,
    },

    toUserId: {
      required: [true, "field 'toUserId' can not be null"],
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

ReactionSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export default ReactionSchema;
