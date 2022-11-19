const form = document.getElementById("novoItem")
const lista = document.getElementById("lista") //buscando lista não ordenada
const itens = JSON.parse(localStorage.getItem("itens")) || []
//transforma esses dados do JSON.stringfy (que estão em strings), em dados/valores JavaScript e identifica como array e objeto

itens.forEach(elemento => { //método que mantém os dados armazenados no localStorage do navegador mesmo após atualização da página
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => { // adiciona os dados escritos ao clicar no botão, através do evento "submit"
    evento.preventDefault()

    const nome = evento.target.elements['nome'] //refatoração para a criação da variável que cria e esvazia ao enviar o item 'nome'
    const quantidade = evento.target.elements['quantidade'] //refatoração para a criação da variável que cria e esvazia ao enviar o item 'quantidade'

    const existe = itens.find(elemento => elemento.nome === nome.value) // toda vez que o formulário é enviado é verificado nos elementos se o item já existe

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id // Se o elemento é foi encontrado, apenas usa o id que já existe

        atualizaElemento(itemAtual) // caso o item é encontrado na lista, essa função atualiza o elemento/lista

        // Refatoração da condicional if else, atualizando um id para cada item
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0

        criaElemento(itemAtual) // caso o item não conste na lista, essa função cria o elemento

        itens.push(itemAtual) //da um push no array sempre que um elemento é criado

    }

    localStorage.setItem("itens", JSON.stringify(itens)) // JSON.stringfy: método para transformar objetos, arrays, listas em string para que o localStorage (que só lê strings) reconheça e armazene os dados.

    nome.value = "" //toda vez que o item for enviado, o formulário é esvaziado
    quantidade.value = "" //toda vez que o item for enviado, o formulário é esvaziado

})

function criaElemento(item) {
    const novoItem = document.createElement('li') //criando tag HTML
    novoItem.classList.add("item") //adicionando classe na tag
    
    const numeroItem = document.createElement('strong') //criando tag HTML
    numeroItem.innerHTML = item.quantidade //adicionando texto na tag HTML
    numeroItem.dataset.id = item.id // criando a propriedade "id" no item
    novoItem.appendChild(numeroItem) //adicionando tag dentro da tag li
    
    novoItem.innerHTML += item.nome //adicionando texto na tag HTML

    novoItem.appendChild(botaoDeleta(item.id)) //adicionando na lista o novo botão de deletar itens

    lista.appendChild(novoItem) //adicionando na lista o novo item criado

}

function atualizaElemento(item) { // atualiza a quantidade do elemento do html
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) { // criando uma função para remover um item da lista
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    //criando o evento de clique no botão "X"
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id) // função para deletar o elemento ao clicar
    })

    return elementoBotao
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))


}