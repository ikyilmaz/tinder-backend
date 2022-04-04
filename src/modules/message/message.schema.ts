import { Schema, SchemaTypes } from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { IMessage } from './message.interface';

const MessageSchema = new Schema<IMessage>(
  {
    senderUserId: {
      required: [true, "field 'senderUserId' can not be null"],
      type: SchemaTypes.ObjectId,
      ref: ModelNameEnum.USER,
    },

    matchId: {
      required: [true, "field 'matchId' can not be null"],
      type: SchemaTypes.ObjectId,
      ref: ModelNameEnum.MATCH,
    },
    content: {
      type: SchemaTypes.String,
      required: [true, "field 'content' can not be null"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default MessageSchema;
