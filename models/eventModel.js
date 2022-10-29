const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    brandname: {
      type: String,
      required: true,
    },
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
  brandname,
  title,
  content,
  eventImage,
  postDate
) {
  // validation
  if (!brandname || !title || !content || !eventImage) {
    throw Error(
      "brandName and title and content and eventImage are must be filled"
    );
  }
  const event = await this.create({
    brandname,
    title,
    content,
    eventImage,
    postDate,
  });
  return event;
};

module.exports = mongoose.model("Event", eventSchema);
