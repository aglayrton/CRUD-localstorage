//CRIAR FORA DO EVENTO UM VETOR - VARIAVEL COMPOSTA - ELA RECEBE MAIS DE UM VALOR
//let db = [];

document.querySelector('#cadastro').addEventListener('click', (w)=>{
    w.preventDefault();
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;

    salvar(email, senha);
});


function salvar(e, s){
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //crio um objeto
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }
    //jogo o obejto dentro do vetor
    db.push(usuario);
    //salvo no localstorage
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'index.html';    
}
