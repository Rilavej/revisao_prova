/*
Implementar métodos HTTP para GET, PUT, DELETE enviando dados no corpo da requisição
*/


// const path = require('path')
const lista = require('../my_list.js')
const controller = {}

var maior_id = lista.length

controller.pessoas = function(req, res) {
    // res.sendFile('C:\\Users\\rlvsa\\OneDrive\\Área de Trabalho\\lista3\\my_list.js')
    res.send(lista)
}   
controller.pessoa_id = function(req, res) {
    let pessoa = null
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == req.params.id) {
            pessoa = lista[i]
        }
    }
    if (pessoa != null) {
        res.status(200).send(pessoa)
    }
    else {
        res.status(404).send('<h1>id inválido</h1>')
    }
}
controller.create = (req, res) => {
    let pessoa = {id: maior_id + 1} // Fatorar. Se o tamanho da lista for menor que o id do último elemento, poderá gerar id duplicado
    pessoa = {...pessoa, ...req.body}
    pessoa.idade = Number(pessoa.idade)
    lista.push(pessoa)
    maior_id ++
    res.status(200).send(`Pessoa cadastrada com id:\n${pessoa.id}`)
}
controller.update = function(request, response) {
    let updateStatus
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == request.params.id) {
            let newPerson = request.body
            newPerson.idade = Number(newPerson.idade)
            let objetoId = {"id":Number(request.params.id)}
            newPerson = {...objetoId, ...newPerson}
            lista[i] = newPerson
            lista[i].id = Number(request.params.id) // Refatorar. Resolve comflito com PUT via corpo da requisição
            updateStatus = true
        }
    }
    if (updateStatus == true) {
        response.status(200).send(lista)
    }
    else {
        response.status(404).send(`pessoa com id ${request.params.id} não encontrada para atualizar!`)
    }
}
controller.delete = (req, res) => {
    let i = 0
    let updateStatus
    while (i < lista.length) {
        if (lista[i].id == req.params.id) {
            lista.splice(i, 1)
            updateStatus = true
        }
        i++
    }
    if (updateStatus == true) {
        res.status(200).send(lista)
    }
    else {
        res.status(404).send(`pessoa com id ${req.params.id} não encontrada para deletar!`)
    }
}
controller.atualizar = (req,res) => {
    let status
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == req.body.id) {
            req.body.id = Number(req.body.id)
            req.body.idade = Number(req.body.idade)
            lista[i] = req.body
            res.status(200).send(`Cadastro atualizado: \n\n${lista[i]}`)
            status = true
        }
    }
    if (status != true) {
        res.status(404).send(`ID ${req.body.id} não consta na base!`)
    }

}
module.exports = controller