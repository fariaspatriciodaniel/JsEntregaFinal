//utilizo fetch para consular stock
document.getElementById('stock').addEventListener('click', cargarStock); 

function cargarStock() {
    fetch('stock.json')
    .then(function(muestra){
        return muestra.json();
    })
    .then(function(disponibilidad){
        let html = '';
        disponibilidad.forEach(function(consulta) {
            html += `
            <p>${consulta.nombre} ${consulta.stock}</p>
            `;
        })
        document.getElementById('resultado').innerHTML = html;
    })
    }