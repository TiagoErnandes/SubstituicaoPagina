Projeto: Algoritmos de Substituição de Página
Os sistemas operacionais tem como responsabilidade permitir o compartilhamento seguro de recursos de hardware
e software solicitados pelos processos. Basicamente, os sistemas operacionais devem gerenciar a execução de
processo, a alocação de memória, os sistemas de arquivos e os dispositivos de entrada e saída.
Na gerência de memória, a tarefa central é permitir que vários processos consigam um espaço na memória principal
para que possam executar. Nesse cenário, o sistema operacional deve garantir a execução do processo
independentemente da sua localização na memória, além de garantir a segurança, impedindo que processos
acessem o espaço de memória de outros processos. Também, o sistema operacional deve garantir a execução dos
processos mesmo em cenários com pouca memória disponível, fazendo uso do recurso de memória virtual e
paginação.
Este trabalho tem como objetivo levar a/o estudante a entender os conceitos e o funcionamento da memória virtual
e do sistema de paginação. Para isso, neste projeto você deve escrever um programa para simular o funcionamento
dos principais algoritmos de substituição de páginas estudados na disciplina.
Os algoritmos de substituição de páginas a serem implementados são os seguintes:
● FIFO (First In, First Out)
● OTM: Algoritmo Ótimo
● LRU: (Least Recently Used o u Menos Recentemente Utilizado)
O seu programa deverá ler da entrada padrão um conjunto de número inteiros onde o primeiro número representa a
quantidade de quadros de memória disponíveis na RAM e os demais representam a sequência de referências às
páginas, sempre um número por linha.
Seu programa deverá imprimir na saída o número de faltas de páginas obtido com a utilização de cada um dos
algoritmos.
Descrição da entrada:
A entrada é composta por uma série números inteiros, um por linha, indicando, primeiro a quantidade de quadros
disponíveis na memória RAM e, em seguida, a sequência de referências à memória.
Exemplo de entrada 1:
4
1
2
3
4
1

INSTITUTO FEDERAL DE MINAS GERAIS - CÂMPUS SABARÁ
Av. Serra da Piedade, 299 – Morada da Serra – Sabará – MG
CEP: 34515-640 | Tel: (31) 3670-1072

Página 2

2
5
1
2
3
4
5

Descrição da saída:
A saída é composta por linhas contendo a sigla de cada um dos três algoritmos e a quantidade de faltas de página
obtidas com a utilização de cada um deles.
Exemplo de saída 1:
FIFO 10
OTM 6
LRU 8

Exemplo de entrada 2:
3
7
0
1
2
0
3
0
4

INSTITUTO FEDERAL DE MINAS GERAIS - CÂMPUS SABARÁ
Av. Serra da Piedade, 299 – Morada da Serra – Sabará – MG
CEP: 34515-640 | Tel: (31) 3670-1072

Página 3

2
3
0
3
2
1
2
0
1
7
0
1

Exemplo de saída 2:
FIFO 15
OTM 9
LRU 12

Os arquivos de entrada estarão no formato .txt, bem como este também deverá ser o formato dos arquivos de saída.
O trabalho será desenvolvido em dupla e deverá ser desenvolvido na linguagem que ela achar mais adequada. A
entrega será através do ClassRoom, com limite da data e horário estipulada na plataforma. Deverão ser entregues o
código fonte e o executável. Esteja ciente que o professor não irá instalar nenhum software adicional para a
execução do seu programa. Por isso, certifique-se de que seu programa irá funcionar corretamente. O código fonte
deverá ter em seu cabeçalho o nome dos integrantes da dupla.
