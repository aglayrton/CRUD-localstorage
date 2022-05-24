const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logado");

document.querySelector('#sair').addEventListener('click', (e)=>{
    e.preventDefault();
    sair()
});

function sair(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}


checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("logado", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html"
        return;
    }

    /*const dataUser = localStorage.getItem(logado);
    if(dataUser){
        data = JSON.parse(dataUser);
    }*/

}