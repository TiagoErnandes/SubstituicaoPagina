
let teste = [];
var leitorDeCSV = new FileReader();
window.onload = function init() {

    leitorDeCSV.onload = leCSV;
    const botao = document.querySelector('.executar');
    botao.addEventListener('click', mostrarResultado);



}
const fundoMips = document.querySelector('[data-modal="fundo"]')

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

//Trabalho 2


function mostrarResultado() {
    fecharModal();
    mostrarResultadoTeste();

    fundoMips.classList.remove('ativo');
    salva.classList.remove('ativo');
    var resultado = resultadoMemoria;

    console.log(resultado);

    var result = document.getElementById('resultado');
    result.innerText = resultado;

}



function convertBytes(valor) {
    let numero = +valor[0];


    if (valor[valor.length - 1] == 'MB') {
        return numero * 1024 * 1024;
    }
    if (valor[valor.length - 1] == 'KB') {
        return numero * 1024;
    }
    if (valor[valor.length - 1] == 'GB') {
        return numero * 1024 * 1024 * 1024;
    }
    if (valor[valor.length - 1] == 'B') {
        return numero;
    }

}







// Variaveis do campo arquivo txt

// 1 - linha tipo de mapeamento
let tipoMapeamento = 0;
// 2 - linha 
let stringRan = 0; //tamanho da memoria- trata os tipos diferentes como k,kb,mb,gb
let conversaoparaBytes = 0;//bytes na Palavra;
// 3 - linha
let terceiraLinha = [];
let numeroBytesPalavra = 0;

let palavrasnoBloco = 0; //palavra no bloco;
let blocos_viaConjunto = 0;// blocos via de conjunto // if (mapeamento) b = 1
let conjuntoNoCache = 0;// conjunto na cache // if (mapeamento associativo) b = 1
let quantosAcessosMemoria = 0;// quantos acessos á memoria deverão ser processados
let tamanhoCache = 0;
let quantidadeLinhaCache = 0;
let numBitsEndereco = 0;
let tamanhoBlocoBytes = 0;
let numeroBitsposicaoBloco = 0;
let numeroBitsnumeroConjunto = 0;
let numeroBitsTag = 0;
let resultadoMemoria = "";


// 4 - linha
let enderecosProcessados = [];



function mostrarResultadoTeste() {

    let valorTratadoTeste = valorTratado();

    tipoMapeamento = +valorTratadoTeste.shift();
    stringRan = valorTratadoTeste.shift();

    terceiraLinha = valorTratadoTeste.shift();


    numeroBytesPalavra = +terceiraLinha.shift();
    palavrasnoBloco = +terceiraLinha.shift();
    blocos_viaConjunto = +terceiraLinha.shift();
    conjuntoNoCache = +terceiraLinha.shift();
    quantosAcessosMemoria = +terceiraLinha.shift();



    tamanhoCache = numeroBytesPalavra * palavrasnoBloco * blocos_viaConjunto * conjuntoNoCache;


    quantidadeLinhaCache = tamanhoCache / quantosAcessosMemoria;
    conversaoparaBytes = convertBytes(stringRan);



    valorTratadoTeste.forEach(element => {
        enderecosProcessados.push(+element.shift());

    });

    tamanhoBlocoBytes = numeroBytesPalavra * palavrasnoBloco;




    numBitsEndereco = (conversaoparaBytes >>> 0).toString(2).length - 1;//qtosbitsecessario 

    numeroBitsposicaoBloco = (tamanhoBlocoBytes >>> 0).toString(2).length - 1;

    numeroBitsnumeroConjunto = ((conjuntoNoCache) >>> 0).toString(2).length - 1;

    numeroBitsTag = numBitsEndereco - numeroBitsposicaoBloco - numeroBitsnumeroConjunto;




    resultadoMemoria = `Tamanho da cache: ${bytesToSize(tamanhoCache)}
    Número de bits do endereço: ${numBitsEndereco}
    Número de bits para a posição no bloco: ${numeroBitsposicaoBloco}
    Número de bits para o número do conjunto: ${numeroBitsnumeroConjunto}
    Número de bits para a TAG: ${numeroBitsTag} \n`



    enderecosProcessados.forEach(item => {
        resultadoMemoria += calculos(item, tamanhoBlocoBytes, conjuntoNoCache) + "\n";

    });

}



function bytesToSize(bytes) {
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}



function calculos(enderecoMemoria, tamanhoBlocoBytes, conjuntoNoCache) {
    let numerodoBloco = Math.floor(enderecoMemoria / (tamanhoBlocoBytes));
    let posicaonoBloco = Math.floor(enderecoMemoria % tamanhoBlocoBytes);


    let tag = Math.floor(numerodoBloco / conjuntoNoCache);


    let numeroLinha = Math.floor(numerodoBloco % conjuntoNoCache);


    let space = "__";
    return `${tag} ${space} ${numeroLinha}   ${space}  ${posicaonoBloco}`
}




