const cal = new CalHeatmap();

var data = [{ date: '2025-05-12', value: 3 },
    { date: '2025-05-13', value: 6 },
    { date: '2025-05-15', value: 10 }
];

function criarHeatmap(){
    container = document.getElementById('cal-heatmap');
    const cellSize = Math.floor(container.offsetWidth / 80); 
    const inicioData = new Date();

    inicioData.setFullYear(new Date().getFullYear() - 1);
    console.log(inicioData)
    cal.destroy();
    cal.paint({
        data: { source: data, x:'date',  y:'value' },
        date: {
            start: inicioData
        },
        range: 13,
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
criarHeatmap();

window.addEventListener('resize', () => {
    criarHeatmap();
})