seletores = document.querySelectorAll('.seletor');
conteudoSeletores = document.querySelectorAll('.conteudo_seletor')

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