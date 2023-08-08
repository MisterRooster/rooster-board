const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  added: { type: Date, default: Date.now },
});

MessageSchema.virtual("added_formatted").get(function () {
  return DateTime.fromJSDate(this.added).toLocaleString(DateTime.DATE_MED);
});

MessageSchema.virtual("added_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.added).toISODate(); //format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Message", MessageSchema);