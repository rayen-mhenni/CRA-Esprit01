const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ContratSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    type: {
        type: String,
        required: true,
      },
      salaryBf: {
        type: Number,
        required: true,
      },
      salaryAf: {
        type: Number,
        required: true,
      },
      TotaleConges: {
        type: Number,
        required: true,
      }, 
      TotaleN: {
        type: Number,
        required: true,
      },
      TotaleCongesRest: {
        type: Number,
        required: true,
      },
      Prime: {
        type: Number,
        required: true,
      },
      Res: {
        type: Number,
        required: true,
      },
      chomage: {
        type: Number,
        required: true,
      },
      fraisges: {
        type: Number,
        required: true,
      },
      prov: {
        type: Number,
        required: true,
      },
      charge_soc: {
        type: Number,
        required: true,
      },
     salairebruit: {
        type: Number,
        required: true,
      },
      netavant: {
        type: Number,
        required: true,
      },
      rest_mois: {
        type: Number,
        required: true,
      },

      rest_Total: {
        type: Number,
        required: true,
      },
      Status: {
        type: String,
        default:"EN ATTENTE",
        required: true,
      },

    }
    ,{
        timestamps: true,
      });

module.exports = Contrat = mongoose.model('Contrat', ContratSchema)