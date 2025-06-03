const idUsuario = sessionStorage.ID_USUARIO;
const data_cadastro = sessionStorage.DATA_CADASTRO;

const tooltipOptions = {
    text: function(date, value, dayjsDate) {
        if (!value) {
            return `Nenhuma aula concluída em ${dayjsDate.format('DD/MM/YYYY')}`;
        }
        const dataFormatada = dayjsDate.format('DD/MM/YYYY');
        const textoAulas = value === 1 ? 'aula concluída' : 'aulas concluídas';        
        return `${value} ${textoAulas} em ${dataFormatada}`;
    }
};

let data;

async function pegarAulas(){
    data = await fetch(`/aulas/calheatmap/${idUsuario}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
}

const cal = new CalHeatmap();

function criarHeatmap(cellSize){
    const inicioData = new Date(data_cadastro.substring(0, data_cadastro.indexOf("T")));

    cal.destroy();
    console.log(data);
    cal.paint({
        data: { source: data, x:'date',  y:'qtde_aulas' },
        date: {
            min: inicioData,
            start: new Date(),
            max: new Date(),
            locale: 'pt'
        },
        range: 12,
        domain: { type: 'month' },
        subDomain: { type: 'day', width: cellSize, height: cellSize },
        theme: 'dark',
        scale: {
            color: {
                range: ['black','lime'],
                interpolate: 'hsl',
              type: 'linear',
              domain: [0, 5],
            },
        },
    }, [[Tooltip, tooltipOptions]]);
    
}

let container = document.getElementById('cal-heatmap');
let cellSize = Math.floor(container.offsetWidth / 85); 

window.addEventListener('load', async () => {
    await pegarAulas();
    criarHeatmap(cellSize);
})

function proximoMesCalendario(){
    cal.next(1);
}
function anteriorMesCalendario(){
    cal.previous(1);
}

async function retornarAula(idCurso, idAula){
    let dadosAula = await fetch(`/aulas/retornar/${idCurso},${idAula}`).then(async function (awnser) {
        if (awnser.ok) {
            return awnser.json();
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
    return dadosAula[0];
}

function cardCurso(idCurso){
    const cardCurso = document.getElementById(`curso_${idCurso}`);
    if(cardCurso.classList.contains('closed')){
        cardCurso.classList.remove('closed');
    } else{
        cardCurso.classList.add('closed');
    }
}

function fazerAula(idCurso, idAula){
    sessionStorage.ID_CURSO = idCurso;
    sessionStorage.ID_AULA = idAula;
    window.location = './aula.html'
}

const cursosAndamentoContainer = document.querySelector('#curso_andamento_container')
function exibirCursosUsuario() {
    const idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/cursos/listar/usuario/${idUsuario}`).then(function (awnser) {
        if (awnser.ok) {
            if (awnser.status == 204) {
                cursosAndamentoContainer.innerHTML = "<p class='nenhum_curso'>Nenhum curso em andamento!<p>";
            }
            awnser.json().then(async function (awnser) {
                cursosAndamentoContainer.innerHTML = '';
                for (let i = 0; i < awnser.length; i++) {
                    const curso = awnser[i];
                    const progresso = curso.aulas_feitas / curso.qtde_aulas * 100
                    const aula = await retornarAula(curso.curso_id, curso.aulas_feitas+1);

                    cursosAndamentoContainer.innerHTML += `
                            <div class="curso closed" id="curso_${curso.curso_id}">
                                <div class="curso-nome" onclick="cardCurso(${curso.curso_id})">
                                    <h3>${curso.nome}
                                    <span class="material-symbols-outlined icon-seta">arrow_drop_down</span>
                                    </h3>
                                </div>
                                <span class='progresso-curso'>
                                    <div class="progresso-bar" id="progresso-curso-${curso.curso_id}"></div>
                                </span>
                                <p class="progresso_num">Progresso: ${progresso}%</p>
                                <div class="curso-progresso">
                                    <div class="continuar">
                                        <div>
                                            <p>Aula ${curso.aulas_feitas+1} | ${aula.duracao} min</p>
                                            <p>
                                                ${aula.nome}
                                            </p>
                                        </div>
                                        <button class="btn-green" onclick="fazerAula(${curso.curso_id}, ${aula.id})">Continuar</button>
                                    </div>
                                </div>
                            </div>
                    `;
                    document.getElementById(`progresso-curso-${curso.curso_id}`).style.width = progresso+'%';
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (awnser) {
        console.error(awnser);
    });
}
exibirCursosUsuario();