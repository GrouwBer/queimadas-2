async function fetchLatestRecord() {
  try {
    const response = await fetch('http://localhost:3000/latest-record');
    const latestRecord = await response.json();
    document.getElementById("temp").textContent = `${latestRecord[0].Temperatura}`;
    document.getElementById("humidade").textContent = `${latestRecord[0].Umidade}%`;
    if (latestRecord[0].Qualidade_Ar < 50) {
      document.getElementById("aqi").style.color = "green";
      document.getElementById("aqi").textContent = `${latestRecord[0].Qualidade_Ar}`;
      document.getElementById("TextoAqi").style.backgroundColor = "green";
      document.getElementById("TextoAqi").textContent = `Muito Bom`;
    }
    else if (latestRecord[0].Qualidade_Ar < 100) {
      document.getElementById("aqi").style.color = "#f4e10d";
      document.getElementById("aqi").textContent = `${latestRecord[0].Qualidade_Ar}`;
      document.getElementById("TextoAqi").style.backgroundColor = "#f4e10d";
      document.getElementById("TextoAqi").textContent = `Moderado`;
    }
    else {
      document.getElementById("aqi").style.color = "red";
      document.getElementById("aqi").textContent = `${latestRecord[0].Qualidade_Ar}`;
      document.getElementById("TextoAqi").style.backgroundColor = "red";
      document.getElementById("TextoAqi").textContent = `Ruim`;
    }

  } catch (error) {
    console.error('Erro:', error);
  }
}

async function horas() {
  try {
    const response = await fetch('http://localhost:3000/horas');
    const horas = await response.json();
    document.getElementById("temp1").textContent = `${horas[1].Temperatura}`;
    document.getElementById("temp2").textContent = `${horas[2].Temperatura}`;
    document.getElementById("temp3").textContent = `${horas[3].Temperatura}`;
    document.getElementById("temp4").textContent = `${horas[4].Temperatura}`;
    document.getElementById("temp5").textContent = `${horas[5].Temperatura}`;

    document.getElementById("humidade1").textContent = `${horas[1].Umidade}%`;
    document.getElementById("humidade2").textContent = `${horas[2].Umidade}%`;
    document.getElementById("humidade3").textContent = `${horas[3].Umidade}%`;
    document.getElementById("humidade4").textContent = `${horas[4].Umidade}%`;
    document.getElementById("humidade5").textContent = `${horas[5].Umidade}%`;

    document.getElementById("aqi1").textContent = `${horas[1].Qualidade_Ar} AQI`;
    document.getElementById("aqi2").textContent = `${horas[2].Qualidade_Ar} AQI`;
    document.getElementById("aqi3").textContent = `${horas[3].Qualidade_Ar} AQI`;
    document.getElementById("aqi4").textContent = `${horas[4].Qualidade_Ar} AQI`;
    document.getElementById("aqi5").textContent = `${horas[5].Qualidade_Ar} AQI`;


  } catch (error) {
    console.error('Erro:', error);
  }
}




async function dias() {
  try {
    const response = await fetch('http://localhost:3000/dias');
    const dias = await response.json();
    console.log('Horas:', dias);
    document.getElementById("temperatura1").textContent = `${dias[24].Temperatura} °c`;
    document.getElementById("temperatura2").textContent = `${dias[24].Temperatura} °c`;
    document.getElementById("temperatura3").textContent = `${dias[24].Temperatura} °c`;

    document.getElementById("qualidadeAr11").textContent = `${dias[24].Qualidade_Ar} AQI`;
    document.getElementById("qualidadeAr22").textContent = `${dias[48].Qualidade_Ar} AQI`;
    document.getElementById("qualidadeAr33").textContent = `${dias[71].Qualidade_Ar} AQI`;
  } catch (error) {
    console.error('Erro:', error);
  }
}




horas(); 
setInterval(horas, 1000);
fetchLatestRecord();
setInterval(fetchLatestRecord, 10000);
dias();
setInterval(dias, 10000);

async function main() {
  updateTime();
  setInterval(updateTime, 1000);




  



  function updateTime() {
    var d = new Date();
    var hours = String(d.getHours()).padStart(2, '0');
    var minutes = String(d.getMinutes()).padStart(2, '0');
    var seconds = String(d.getSeconds()).padStart(2, '0');
    var formatteddatestr = `${hours}:${minutes}:${seconds}`;

    // Formatar a data para mostrar o nome do dia da semana e o dia do mês em português
    var diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    function formatarData(d) {
      var nomeDia = diasDaSemana[d.getDay()];
      var diaMes = d.getDate();
      var nomeMes = meses[d.getMonth()];
      return `${nomeDia}, ${diaMes} de ${nomeMes}`;
    }

    var dataFormatada = formatarData(d);
    document.getElementById("Data").textContent = dataFormatada;
    document.getElementById("Tempo").textContent = formatteddatestr;

    // Subtrair dias e formatar as datas
    var d1 = new Date(d);
    d1.setDate(d1.getDate() - 1);
    var dataFormatada1 = formatarData(d1);
    document.getElementById("dia1").textContent = dataFormatada1;

    var d2 = new Date(d);
    d2.setDate(d2.getDate() - 2);
    var dataFormatada2 = formatarData(d2);
    document.getElementById("dia2").textContent = dataFormatada2;

    var d3 = new Date(d);
    d3.setDate(d3.getDate() - 3);
    var dataFormatada3 = formatarData(d3);
    document.getElementById("dia3").textContent = dataFormatada3;

    // Subtrair horas e formatar as horas
    d.setHours(d.getHours() - 1);
    var hoursSubtracted1 = String(d.getHours()).padStart(2, '0');
    var formatteddatestrSubtracted1 = `${hoursSubtracted1}:${minutes}:${seconds}`;
    document.getElementById("hora1").textContent = formatteddatestrSubtracted1;

    d.setHours(d.getHours() - 1);
    var hoursSubtracted2 = String(d.getHours()).padStart(2, '0');
    var formatteddatestrSubtracted2 = `${hoursSubtracted2}:${minutes}:${seconds}`;
    document.getElementById("hora2").textContent = formatteddatestrSubtracted2;

    d.setHours(d.getHours() - 1);
    var hoursSubtracted3 = String(d.getHours()).padStart(2, '0');
    var formatteddatestrSubtracted3 = `${hoursSubtracted3}:${minutes}:${seconds}`;
    document.getElementById("hora3").textContent = formatteddatestrSubtracted3;

    d.setHours(d.getHours() - 1);
    var hoursSubtracted4 = String(d.getHours()).padStart(2, '0');
    var formatteddatestrSubtracted4 = `${hoursSubtracted4}:${minutes}:${seconds}`;
    document.getElementById("hora4").textContent = formatteddatestrSubtracted4;

    d.setHours(d.getHours() - 1);
    var hoursSubtracted5 = String(d.getHours()).padStart(2, '0');
    var formatteddatestrSubtracted5 = `${hoursSubtracted5}:${minutes}:${seconds}`;
    document.getElementById("hora5").textContent = formatteddatestrSubtracted5;
  }
}

main();