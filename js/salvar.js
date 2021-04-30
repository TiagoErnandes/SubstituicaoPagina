
const salva = document.querySelector('[data-salva="salva"]');
let texto = document.getElementById('resultado');



function salvar() {


  let blob = new Blob([texto.innerText],

    {
      type: "text/plain;charset=utf8"
    }
  );
  saveAs(blob, "resultado" + ".txt");
}
salva.addEventListener('click', salvar);