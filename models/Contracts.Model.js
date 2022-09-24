const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ContractsSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    type: {
        type: String,
        required: true,
      },
      Client: {
        type: String,
        required: true,
      },
      dateDebut: {
        type: Date,
        required: true,
      },
      dateFin: {
        type: Date,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },
    LieuServ: {
        type: String,
        required: true,
      },

      NumRue: {
        type: String,
        required: true,
      },

      NomRue: {
        type: String,
        required: true,
      },

      code: {
        type: Number,
        required: true,
      },

      Ville: {
        type: String,
        required: true,
      },

      Pays: {
        type: String,
        required: true,
      },

      Fact_delaiDePayement: {
        type: String,
        required: true,
      }, 

      Fact_ModeDenvoi: {
        type: String,
        required: true,
      }, 

      Fact_conditions: {
        type: String,
        required: true,
      }, 

      Fact_procedure: {
        type: String,
        required: true,
      }, 

      Status: {
        type: String,
        default:"EN ATTENTE",
        required: true,
      }, 


      Fact_justification: {
        type: Boolean,
        required: true,
      },


     
    }
    ,{
        timestamps: true,
      });

module.exports = Contracts = mongoose.model('Contracts', ContractsSchema)