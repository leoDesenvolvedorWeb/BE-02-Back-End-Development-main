const mongoose = require("mongoose");
const Produto = require("./src/model/Produto"); // Ajuste o caminho conforme necessário

mongoose.connect('mongodb://localhost:27017/market-place', { useNewUrlParser: true, useUnifiedTopology: true });

async function removeDuplicates() {
    const produtos = await Produto.find({});

    const uniqueNomes = new Set();
    const uniqueCodigos = new Set();

    for (let produto of produtos) {
        if (uniqueNomes.has(produto.nome) || uniqueCodigos.has(produto.codigoBarra)) {
            await Produto.deleteOne({ _id: produto._id });
        } else {
            uniqueNomes.add(produto.nome);
            uniqueCodigos.add(produto.codigoBarra);
        }
    }
}

removeDuplicates()
    .then(() => {
        console.log("Duplicatas removidas.");
        mongoose.disconnect();
    })
    .catch(err => {
        console.error("Erro ao remover duplicatas:", err);
        mongoose.disconnect();
    });
 