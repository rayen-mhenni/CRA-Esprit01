const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CraSchema = new Schema({
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
  )


module.exports = Cra = mongoose.model('cras', CraSchema);