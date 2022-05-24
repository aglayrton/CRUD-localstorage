const form = document.querySelector("#infos-prod");
const divErro = document.querySelector("#msg-erro");
const tabela = document.querySelector("#tbody");
let idx = form.idx.value; 
let usuarioId = Number(sessionStorage.getItem('logado'));
//LOGCHECKED
const session = localStorage.getItem("session");

checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "index.html"
        return;
    }

    /*const dataUser = localStorage.getItem(logado);
    if(dataUser){
        data = JSON.parse(dataUser);
    }*/

}


console.log(usuarioId);

//salva no localstorage
const atualizarLocalStorage = (produtos) => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
};

//recupera de la
const recuperarLocalStorage = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    return produtos;
};

const salvarProduto = (event) => {
    event.preventDefault();
    console.log("passou pelo evento");
    divErro.innerHTML = "";
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;
    const erros = [];

    if (!nome || nome.length < 2) {
        erros.push("<p>Nome inválido</p>");
    }
    if (!preco || preco <= 0) {
        erros.push("<p>Preço inválido</p>");
    }
    if (erros.length > 0) {
        divErro.innerHTML = erros.join(" ");
        return;
    }

    console.log(idx)

    if(idx == "novo"){
        const produtos = recuperarLocalStorage();
        let i = 1;
        let idt = 0;
        for(const pro of produtos){
            if(pro.usuarioId === usuarioId){
                //i+=1;
                idt = Number(pro.id);
            }
        }
//produtos.push({ id: produtos.length, nome, preco, prime, usuarioId});
        produtos.push({ id: idt+=1, nome, preco, prime, usuarioId});
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
        console.log(idx, "teste")
    }else{
        let produto = {
            id: idx, nome, preco, prime, usuarioId 
        }
        editar(idx, produto);
        preencherTabela();
        form.reset();
        idx = "novo";
        console.log('editar', idx);
    }
   
};

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = "";
    for (const produto of produtos) {

        if(produto.usuarioId === usuarioId){
            tabela.innerHTML += `
        <tr>
            <th scope="row">${produto.id}</th>
            <td>R$ ${produto.nome},00</td>
            <td>R$ ${produto.preco},00</td>
            <td>${produto.prime ? "Sim" : "Não"}</td>
            <td>
                <img type="button" width="40" src="./img/delet.svg" onclick="removerProduto(${produto.id})" />
                <img type="button" width="40" src="./img/editar.png" onclick="atualizaProduto(${produto.id})" />
            </td>
        </tr>
    `;
        }
    }
};

const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    if (indexProduto < 0)
        return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert("Produto removido");
    preencherTabela();
};

function editar(idx, produto){
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const indexProduto = produtos.findIndex((p) => p.id === idx);
    produtos[indexProduto] = produto;
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

const atualizaProduto = (id)=>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    //console.log(produtos[indexProduto]);
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.value = produtos[indexProduto].prime;
    idx = id;
    console.log(idx)
}

form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarProduto);
document.addEventListener("DOMContentLoaded", preencherTabela);

let sair = document.querySelector('#sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");


    window.location.href = "index.html";
}

