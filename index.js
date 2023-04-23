require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Configuração do APP

const app = express();
app.use(express.json());

//Configuração do Banco de dados
mongoose.connect(process.env.MONGODB_URL);
const Tarefa = require("./models/tarefa");

//Rotas

//Inserção de tarefas(POST)
app.post("/tarefas", async (req, res) => {
  try {
    //Criando um novo documento MONGO
    const { titulo, descricao, status } = req.body;
    const tarefa = new Tarefa({ titulo, descricao, status });
    //Inserir o documento na coleção tarefas
    await tarefa.save();
    res.status(201).json(tarefa); //201 se vai inserir dado
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});
//Listagem de todas as tarefas(GET)
app.get("/tarefas", async (req, res) => {
  //realiza uma busc de todos documentos
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});
//Listagem de uma tarefa(GET)
app.get("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tarefaExistente = await Tarefa.findById(id);
    //responde com um documento encontrado
    if (tarefaExistente) {
      res.status(200).json(tarefaExistente); //200 se vai buscar algum dado
    } else {
      //notifica o erro exatamente
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//atualização de uma tarefa(PUT)
app.put("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    // Caso encontre o id, realiza a atualização
    // Retorna o objeto encontrado
    const tarefaExistente = await Tarefa.findByIdAndUpdate(id, {
      titulo,
      descricao,
      status,
    });

    if (tarefaExistente) {
      res.json({ message: "Tarefa editada." });
    } else {
      res.status(404).json({ message: "Tarefa não encontrada." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});
//remoção de uma tarefa(DELETE)
app.delete("/tarefas/:id", async (req, res) => {
  try {
    //checa se a tarefa existe e então remove do banco
    const {id} = req.params;
    const tarefasRestantes = await Tarefa.find();
    const tarefaExistente = await Tarefa.findByIdAndRemove(id);
    if(tarefaExistente){
        res.json({message: "Tarefa excluída.", tarefasRestantes})
    }else{
        res.status(404).json({ message: "Tarefa não encontrada.", tarefasRestantes }); 
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});
//Escuta de eventos

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});

// Criar o model de tarefas
//As rotas GET, POST, PUT, DELETE
