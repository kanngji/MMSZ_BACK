const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// static event method
eventSchema.statics.checkevent = async function (
  title,
  content,
  eventImage,
  postDate
) {
  // validation
  if (!title || !content || !eventImage) {
    throw Error("title and content and eventImage are must be filled");
  }
  const event = await this.create({ title, content, eventImage, postDate });
  return event;
};

module.exports = mongoose.model("Event", eventSchema);
