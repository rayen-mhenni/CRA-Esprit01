import mongoose from "mongoose";

const CraSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mounth: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Cra = mongoose.model("Cra", CraSchema);

export default Cra;
