import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: {},
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contactus", contactusSchema);
