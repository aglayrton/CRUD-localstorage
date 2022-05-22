const form = document.querySelector("#infos-prod") as HTMLFormElement;
const divErro = document.querySelector("#msg-erro") as HTMLDivElement;
const tabela = document.querySelector("#tbody") as HTMLElement;

interface Produto {
  id: number;
  nome: string;
  preco: number;
  prime: boolean;
}

const atualizarLocalStorage = (produtos: Array<Produto>) => {
  localStorage.setItem("produtos", JSON.stringify(produtos));
};

const recuperarLocalStorage = (): Array<Produto> => {
  const produtos: Array<Produto> = JSON.parse(
    localStorage.getItem("produtos") || "[]"
  );

  return produtos;
};

const preencherTabela = () => {
  const produtos = recuperarLocalStorage();

  tabela.innerHTML = "";

  for (const produto of produtos) {
    tabela.innerHTML += `
        <tr>
            <th scope="row">${produto.id}</th>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.prime ? "Sim" : "Não"}</td>
            <td>
                <img type="button" width="40" src="./img/delet.svg" onclick="removerProduto(${
                  produto.id
                })" />
            </td>
        </tr>
    `;
  }
};

const salvarProduto = (event: Event) => {
  event.preventDefault();

  console.log("passou pelo evento");

  divErro.innerHTML = "";

  const nome: string = form.nome.value;
  const preco: number = Number(form.preco.value);
  const prime: boolean = form.prime.checked;

  const erros: String[] = [];

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

  const produtos = recuperarLocalStorage();

  produtos.push({ id: produtos.length + 1, nome, preco, prime });

  atualizarLocalStorage(produtos);

  alert("Produto salvo com sucesso");

  preencherTabela();
  form.reset();
};

const removerProduto = (id: number) => {
  const produtos = recuperarLocalStorage();

  const indexProduto = produtos.findIndex((produto) => produto.id === id);

  if (indexProduto < 0) return;

  produtos.splice(indexProduto, 1);

  atualizarLocalStorage(produtos);

  alert("Produto removido");

  preencherTabela();
};

form?.addEventListener("submit", salvarProduto);
document.addEventListener("DOMContentLoaded", preencherTabela);
