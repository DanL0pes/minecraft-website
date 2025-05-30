const cal = new CalHeatmap();

var data = [{ date: '2025-05-12', value: 3 },
    { date: '2025-05-13', value: 6 },
    { date: '2025-05-15', value: 10 }
];

const data_cadastro = sessionStorage.DATA_CADASTRO

function criarHeatmap(cellSize){
    const inicioData = new Date(data_cadastro.substring(0, data_cadastro.indexOf("T")));
    
    cal.destroy();
    cal.paint({
        data: { source: data, x:'date',  y:'value' },
        date: {
            min: inicioData,
            start: new Date(),
            max: new Date(),
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
    });
    
}

let container = document.getElementById('cal-heatmap');
let cellSize = Math.floor(container.offsetWidth / 80); 

window.addEventListener('load', () => {
    criarHeatmap(cellSize);
})
window.addEventListener('resize', () => {
    container = document.getElementById('cal-heatmap');
        cellSize = Math.floor(container.offsetWidth / 80); 
        criarHeatmap(cellSize);
    })
    
    const sideBar = document.querySelector('.sidebar');
    sideBar.addEventListener('mouseover', () => {
        setTimeout(() => {
            container = document.getElementById('cal-heatmap');
            cellSize = Math.floor(container.offsetWidth / 80); 
        criarHeatmap(cellSize);
    },1000)
})
sideBar.addEventListener('mouseout', () => {
    container = document.getElementById('cal-heatmap');
    cellSize = Math.floor(container.offsetWidth / 80); 
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

const cursosAndamentoContainer = document.querySelector('#curso_andamento_container')
function exibirCursosUsuario() {
    const idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/cursos/listar/usuario/${idUsuario}`).then(function (awnser) {
        if (awnser.ok) {
            if (awnser.status == 204) {
                cursosAndamentoContainer.innerHTML = "Nenhum curso em andamento!";
            }
            cursosAndamentoContainer.innerHTML = '';
            awnser.json().then(async function (awnser) {
                for (let i = 0; i < awnser.length; i++) {
                    const curso = awnser[i];
                    const progresso = curso.aulas_feitas / curso.qtde_aulas * 100
                    const aula = await retornarAula(curso.curso_id, curso.aulas_feitas+1);

                    cursosAndamentoContainer.innerHTML += `
                            <div class="curso">
                                <div class="curso-nome">
                                    <h3>${curso.nome}</h3>
                                </div>
                                <div class="curso-progresso">
                                    <span class='progresso-curso'>
                                        <div class="progresso-bar" id="progresso-curso-${curso.curso_id}"></div>
                                    </span>
                                    <p>Progresso: ${progresso}%</p>
                                    <div class="continuar">
                                        <div>
                                            <p>Aula ${curso.aulas_feitas+1} | ${aula.duracao} min</p>
                                            <p>
                                                ${aula.nome}
                                            </p>
                                        </div>
                                        <button class="btn-green">Continuar</button>
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