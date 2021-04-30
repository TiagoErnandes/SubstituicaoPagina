
let teste = [];
var leitorDeCSV = new FileReader();
window.onload = function init() {
    leitorDeCSV.onload = leCSV;
    const botao = document.querySelector('.executar');
    botao.addEventListener('click', mostrarResultado);
}
const fundoMips = document.querySelector('[data-modal="fundo"]')
let resultadoTxt = [];

function pegaCSV(inputFile) {
    var file = inputFile.files[0];
    leitorDeCSV.readAsText(file);
}

function leCSV(evt) {

    var fileArr = evt.target.result.split('\n');
    teste = Array.from(fileArr)

    var strDiv = '<table>';
    for (var i = 0; i < fileArr.length; i++) {
        strDiv += '<tr>';

        var fileLine = fileArr[i].split('.');
        for (var j = 0; j < fileLine.length; j++) {
            strDiv += '<td>' + fileLine[j].trim() + '</td>';
        }
        strDiv += '</tr>';
    }
    strDiv += '</table>';
    var CSVsaida = document.getElementById('CSVsaida');

    CSVsaida.innerHTML = strDiv;

    return teste
}
let pegaseparado = [];


//Retira o espaço e virgula e separa o vetor
const valorTratado = function () {
    let newValor = [];
    for (let i = 0; i < teste.length; i++) {
        newValor.push(teste[i].replace(/\s{2,}/g, ' ').replaceAll(',', '').replaceAll('(', ' ').replaceAll(')', '').split(" "));
    }
    return newValor;
}


function mostrarResultado() {

    let ArrayNumero = transformaArrayNumeros(teste);
    calculaDados(ArrayNumero)
    fecharModal();

    fundoMips.classList.remove('ativo');
    salva.classList.remove('ativo');
    var resultado = '<table>';
    resultado += ` <tr>
    <th>Resultado</th>
    </tr> `
    resultadoTxt.forEach((linha) => {
        resultado += `<tr> <td>${linha} </td> </tr>`
    })
    resultado += '</table>';

    var result = document.getElementById('resultado');
    result.innerHTML = resultado;

}


function transformaArrayNumeros(arrayString) {
    let numbArray = arrayString.map((e) => +e);
    return numbArray
}


function calculaDados(numbArray) {
    let quantidadeQuadros = numbArray.shift();
    let cpu = numbArray.slice(0, quantidadeQuadros);
    let linhasNumeros = numbArray.slice(quantidadeQuadros);
    let quantidadeQuadrosLRU = quantidadeQuadros;
    let quantidadeQuadrosOTM = quantidadeQuadros;
    let cpuOTM = numbArray.slice(0, quantidadeQuadros);
    let cpuLRU = numbArray.slice(0, quantidadeQuadros);


    linhasNumeros.forEach((num) => {
        if (!cpu.includes(num)) {
            cpu.shift();
            cpu.push(num);
            quantidadeQuadros++;
        }
    })
    console.log("FIFO " + quantidadeQuadros)
    resultadoTxt.push(`FIFO ${quantidadeQuadros}`);
    let i = 0;
    while (i < linhasNumeros.length) {
        if (!cpuOTM.includes(linhasNumeros[i])) {
            ordem = cpuOTM.slice();
            aux = i - 1;
            while (ordem.length > 1 && aux < linhasNumeros.length) {
                if (ordem.includes(linhasNumeros[aux])) {

                    ordem.splice(ordem.indexOf(linhasNumeros[aux]), 1)

                }
                aux++;
            }
            cpuOTM.splice(cpuOTM.indexOf(ordem.pop()), 1);
            cpuOTM.push(linhasNumeros[i]);
            quantidadeQuadrosOTM++;
            i++;
        } else {
            i++;
        }
    }
    console.log('OTM', quantidadeQuadrosOTM)
    resultadoTxt.push(`OTM ${quantidadeQuadrosOTM}`);


    aux = 0;
    i = 0;
    var temp = -1;
    while (i < linhasNumeros.length) {

        if (!cpuLRU.includes(linhasNumeros[i])) {
            ordem = cpuLRU.slice();
            aux = i - 1;
            while (ordem.length > 1) {
                if (aux < 0) {
                    let totLinhaaux = +linhasNumeros.length;
                    let constante = -2;

                    temp = (totLinhaaux + aux + constante);


                }
                if (ordem.includes(linhasNumeros[aux]) || ordem.includes(linhasNumeros[temp])) {
                    ordem.splice(ordem.indexOf(linhasNumeros[aux]), 1)
                }
                aux -= 1;
            }
            cpuLRU.splice(cpuLRU.indexOf(ordem.pop()), 1);
            cpuLRU.push(linhasNumeros[i]);
            quantidadeQuadrosLRU++;
            i++;
        } else {
            i++;
        }
    }
    resultadoTxt.push(`LRU ${quantidadeQuadrosLRU}`);
    console.log(resultadoTxt);
}