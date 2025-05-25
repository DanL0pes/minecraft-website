function abrirCursos(tipo){
    let cards; 
    if(tipo == 'andamento'){
        cards = document.getElementById('cards-andamento'); 
    }
    if(cards.classList.contains('aberto')){
        cards.classList.remove('aberto');
    }else{
        cards.classList.add('aberto');
    }
}