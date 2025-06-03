seletores = document.querySelectorAll('.seletor');
conteudoSeletores = document.querySelectorAll('.conteudo_seletor')

conteudoSeletores[0].style.display = 'flex';

function atualizarSeletor(event){
    seletores.forEach(seletor => {
        seletor.classList.remove('ativo');
    });
    conteudoSeletores.forEach(conteudo => {
        conteudo.style.display = 'none';
    });
    event.target.classList.add('ativo');
    if(event.target.id == 'jogo_seletor'){
        conteudoSeletores[0].style.display = 'flex';
    } else if(event.target.id == 'criador_seletor'){
        conteudoSeletores[1].style.display = 'flex';
    } else if(event.target.id == 'updates_seletor'){
        conteudoSeletores[2].style.display = 'flex';
    }
    
}


const titulo = document.querySelector('.titulo-encantado');
const textoOriginal = titulo.textContent;
const caracteresAleatorios = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&!';
let intervalo = null;

titulo.addEventListener('mouseover', () => {  
  let i = 0;
  
  clearInterval(intervalo);
  
  intervalo = setInterval(() => {
    let tituloValor = '';
    vetorTitulo = textoOriginal.split("");
    vetorNovo = [];
    for(let j = 0; j < vetorTitulo.length; j++) {
        if(j < i) {
            vetorNovo.push(textoOriginal[j]);
        } else{
            vetorNovo.push(caracteresAleatorios[Math.floor(Math.random() * caracteresAleatorios.length)])
        }
    };
    tituloValor = vetorNovo.join('');
    titulo.innerHTML = tituloValor;
    
    if(i >= textoOriginal.length){ 
      clearInterval(intervalo);
    }
    
    i += 1 / 3;
  }, 30);
});

const btnIniciarJornada = document.getElementById('btn_iniciar_jornada');
btnIniciarJornada.addEventListener('mouseenter',() => {
    btnIniciarJornada.innerText = 'ENTRAR NO DESAFIO!'
});
btnIniciarJornada.addEventListener('mouseleave',() => {
    btnIniciarJornada.innerText = 'INICIAR MINHA JORNADA'
});
btnIniciarJornada.addEventListener('click',() => {
    window.location = './login.html'
});