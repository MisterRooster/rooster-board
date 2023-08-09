import mongoose from "mongoose";
import { DateTime } from "luxon";

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Username is required'],
    minlength: 1,
  },
  text: {
    type: String, 
    required: [true, 'Text is required'],
    minlength: 1,
  },
  added: { type: Date, default: Date.now },
});

messageSchema.virtual("added_formatted").get(function () {
  return DateTime.fromJSDate(this.added).toLocaleString(DateTime.DATE_MED);
});

messageSchema.virtual("added_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.added).toISODate(); //format 'YYYY-MM-DD'
});

export default mongoose.model("Message", messageSchema);