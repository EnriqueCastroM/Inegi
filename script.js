// Función para obtener los datos de la API del INEGI
async function fetchDemographicData() {
    const token = ''; // Asegúrate de almacenar esto de manera segura
    const apiUrl = `https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001,1002000002,1002000003,6206824187/es/0700/true/BISE/2.0/${token}?type=json`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.Series;
    } catch (error) {
      console.error('Error fetching data: ', error);
      // Implementa aquí tu manejo de errores
    }
  }
  
  // Función para renderizar el gráfico
  function renderChart(data) {
    const ctx = document.getElementById('demographicChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.OBSERVATIONS[0].TIME_PERIOD),
        datasets: [{
          label: 'Población',
          data: data.map(item => Number(item.OBSERVATIONS[0].OBS_VALUE)),
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  
  // Llamada a la función cuando la página carga
  document.addEventListener('DOMContentLoaded', () => {
    fetchDemographicData().then(data => {
      if(data) {
        renderChart(data);
      }
    });
  });
  