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