const containerComentarios = document.getElementById('box_comentarios');
const btnVerComentarios = document.getElementById('btn_ver_comentarios');

function abaComentarios(){
    if(containerComentarios.style.display == 'none'){
        containerComentarios.style.display = 'flex';
        btnVerComentarios.innerText = 'Ocultar comentários';
    } else{
        containerComentarios.style.display = 'none';
        btnVerComentarios.innerText = 'Ver comentários';
    }
}

const modalPergunta = document.getElementById('modalPerguntar');
function fazerPergunta(){
    modalPerguntar.style.display = 'flex';
}
function cancelarPergunta(){
    modalPerguntar.style.display = 'none';
}