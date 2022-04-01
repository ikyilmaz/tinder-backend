import { Schema, SchemaTypes } from 'mongoose';
import { IUser } from './user.interface';
import * as bcrypt from 'bcryptjs';
import { USER_ROLE } from './user.enum';

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: SchemaTypes.String,
      required: false,
    },
    lastName: {
      type: SchemaTypes.String,
      required: false,
    },
    username: {
      type: SchemaTypes.String,
      required: [true, "field 'username' can not be null"],
      unique: true,
      minlength: 2,
      maxlength: 36,
    },
    password: {
      type: SchemaTypes.String,
      required: [true, "field 'password' can not be null"],
    },
    role: {
      type: SchemaTypes.String,
      enum: {
        values: [USER_ROLE.admin, USER_ROLE.user],
        message: "field 'role' must be in \"'admin', 'user'\"",
      },
      default: USER_ROLE.user,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// hash the password before save
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew)
    this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default UserSchema;
