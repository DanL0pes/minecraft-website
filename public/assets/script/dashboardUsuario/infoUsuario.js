const email = sessionStorage.EMAIL_USUARIO;
const nome = sessionStorage.NOME_USUARIO;
const id = sessionStorage.ID_USUARIO;
const xp = sessionStorage.XP_USUARIO;
const foto = sessionStorage.FOTO_USUARIO
let rank;

b_nome_usuario = document.getElementById('nome_usuario');
b_rank_usuario = document.getElementById('rank_usuario');
b_foto_usuario = document.getElementById('foto_perfil');
b_rank = document.getElementById('rank');
b_xp = document.getElementById('xp');

if (email != null && nome != null) {
    b_nome_usuario.innerHTML = nome;
    if(b_xp !=undefined){
        b_xp.innerHTML = xp;
    }
    b_foto_usuario.src = `..${foto}`;
    if(xp <= 500){
        rank = 'Novato';
    } else if(xp <= 1000){
        rank = 'Experiente';
    } else if(xp > 1000){
        rank = 'Mestre';
    }
    b_rank_usuario.innerHTML = rank;
    b_rank_usuario.classList.add(rank.toLowerCase());
    if(b_rank != undefined){
        b_rank.innerHTML = rank;
        b_rank.classList.add(rank.toLowerCase());
    }
} else {
    // window.location = "../login.html";
}


