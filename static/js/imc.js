// IMC DADOS RELEVANTES
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// SELECAO DE ELEMENTOS
const imcTable = document.querySelector("#imc-table")

const heightInput = document.querySelector("#height")
const weightInput =document.querySelector("#weight")
const calcBtn = document.querySelector("#calc-btn")
const clearBtn = document.querySelector("#clear-btn")

const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info span")

const backBtn = document.querySelector("#back-btn")

// funcoes
function createTable(data) {
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div)
    });
}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, ""); //exp regulares somente 0a9 e ',' global, fora isso deixa vazio
}
//calcula o IMC
function calcImc(weight,height) {
    //.tofixed(1) retorna apenas 1 casa decimal
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

function clearInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList = "";
}

function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}

//inicializacao
createTable(data);

//eventos --------------------------------------------------

//tratar valores nao permitidos (expressoes regulares)
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value);

        e.target.value = updateValue;
    });
});

//calculo do IMc
calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //sinal de + abaixo convert str em int
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    console.log(weight, height);
    if(!weight || !weight) return;

    //chama a função que calcula IMC
    const imc = calcImc(weight, height);

    //pecorre "data" procurando a faixa de IMC
    let info;
    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });
    //se nao tem informacao retorna
    if (!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;
    console.log("deu",imc, info);

    switch (info) {
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;
        case "Obesidade Grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("righ");
            break;
    }

    showOrHideResults();
});

//limpa os inputs de peso e altura
clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
});

//botao voltar
backBtn.addEventListener("click", () => {
    //limpa os inputs
    clearInputs();
    //botao voltar (hide na tela results)
    showOrHideResults();
});