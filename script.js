// Botão Leia Mais
const btn = document.getElementById('leiaMaisBtn');
const maisTexto = document.querySelector('.mais');

btn.addEventListener('click', () => {
    if (maisTexto.style.display === 'none' || maisTexto.style.display === '') {
        maisTexto.style.display = 'inline'; // Mostra o texto
        btn.textContent = 'Leia Menos'; // Altera o texto do botão
    } else {
        maisTexto.style.display = 'none'; // Oculta o texto
        btn.textContent = 'Leia Mais'; // Restaura o texto do botão
    }
});

// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1vMdD_THYKCh_vdTxZAoILCOlwNR0KkaI5UhdVYB7gXE';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'acoes' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpe qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
        data.forEach(function(row) {
            const rowData = row.map(item => item || ''); // Lida com valores nulos ou indefinidos

            const tableRow = document.createElement('tr');
            rowData.forEach(function(cellData) {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyAZGWyT7vuECbbLUY-aBQSCNx-UlDYA7T4',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);
                




