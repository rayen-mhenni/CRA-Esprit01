const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const NoteFraisSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    type: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      ClientFrais: {
        type: Boolean,
        required: true,
      },
      justification: {
        type: String,
        required: true,
      },
    motif: {
        type: String,
        required: true,
      },

      HT: {
        type: Number,
        required: true,
      },

      TTC: {
        type: Number,
        required: true,
      },

      TVA: {
        type: Number,
        default:0,
        required: false,
      },

      MontantRemb: {
        type: Number,
        default:0,
        required: false,
      },

      TVADed: {
        type: Number,
        default:0,
        required: false,      },

      Immobilisation: {
        type: Boolean,
        required: false,
      },

      Status: {
        type: String,
        default:"Soumis",
        required: true,
      },
     
    }
    ,{
        timestamps: true,
      });

module.exports = NoteFrais = mongoose.model('NoteFrais', NoteFraisSchema)