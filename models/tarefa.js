const { model, Schema } = require("mongoose");

//tarefa = título, descrição, status(finalizada, pendente)
const Tarefa = model(
  "tarefa", //nome do modelo(base para a coleção)
  new Schema({
    //validação do documento
    titulo: {
      type: String, //String, number, boolean
      required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: "pendente",
    },
  })
);

module.exports = Tarefa;