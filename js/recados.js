const form = document.querySelector("#infos-prod");
const divErro = document.querySelector("#msg-erro");
const tabela = document.querySelector("#tbody");
let idx = form.new.value; 

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

    if(idx == "new"){
        const produtos = recuperarLocalStorage();
        produtos.push({ id: produtos.length + 1, nome, preco, prime });
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
        console.log(idx)
    }else{
        let produto = {
            id: idx, nome, preco, prime 
        }
        editar(idx, produto);
        preencherTabela();
        form.reset();
        idx = "new";
    }
   
        
};

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = "";
    for (const produto of produtos) {
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
    idx = id;
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.value = produtos[indexProduto].prime;
}

form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarProduto);
document.addEventListener("DOMContentLoaded", preencherTabela);