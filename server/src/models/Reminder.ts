import { Schema, model } from 'mongoose';

const reminderSchema = new Schema(
  {
    user: {
      type: String,
    },
    user_email: {
      type: String,
    },
    token_price: {
      type: String,
      unique: true,
    },
    fullfilled: {
      type: Boolean,
      default: false,
    },
    readed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const reminderModel = model('Reminders', reminderSchema);

export default reminderModel;
