const Usuario = require("../model/Usuario");

const findUserByIdService = (id) => {
    return Usuario.findById(id);
}

const findAllUsersService = (limit, offset) => {
    return Usuario.find().limit(limit).skip(offset);
}

const createUserService = (body) => {
    return Usuario.create(body);
}

const updateUserService = (id, body) => {
    return Usuario.findByIdAndUpdate(id, body, { returnDocument: "after" });
}

const removeUserService = (id) => {
    return Usuario.findByIdAndRemove(id);
}

const addUserAddressService = (id, endereco) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push:{
                enderecos: endereco,
            }
        },
        {
            rawResult: true,
        }
    );
}

const removeUserAddressService = (id, addressId) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull:{
                enderecos: {
                    _id: addressId
                },
            }
        },
        {
            rawResult: true,
        }
    );
}

const addUserFavProductService = (id, produto) => {
    console.log(produto)
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                produtos_fav:{
                    _id: produto._id,
                }
            }
        },
        {
            rawResult: true,
        }
    );
}

const removeUserFavProductService = (id,produto) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                produtos_fav:{
                    _id: produto._id,
                }
            }
        },
        {
            rawResult: true,
        }
    );
}

async function Minhafuncao(produto) {
    const produtoFav = {
    _id: produto._id || new ObjectId(), // Gera um ID se estiver null
    nome: produto.nome
};

}
async function AtualizarUsuario() {
  await db.collection('usuarios').updateOne(
    { _id: usuarioId },
    { $addToSet: { produtos_fav: produtoFav } }
);

}




module.exports = {
    findUserByIdService,
    findAllUsersService,
    createUserService,
    updateUserService,
    removeUserService,
    addUserAddressService,
    removeUserAddressService,
    addUserFavProductService,
    removeUserFavProductService
}