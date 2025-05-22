let form = document.querySelector("#site01 #calc form");

form.addEventListener('submit', calc);

let sexInput = document.getElementById("sex");
let ageInput = document.getElementById("age");
let heightInput = document.getElementById("height");
let weightInput = document.getElementById("weight");
let activityLevelInput = document.getElementById("activityLevel");
let objectiveInput = document.getElementById("objective");

let sex = document.getElementById("sex").value;
let age = parseInt(document.getElementById("age")).value;
let height = parseFloat(document.getElementById("height")).value;
let weight = parseFloat(document.getElementById("weight")).value;
let activityLevel = parseFloat(document.getElementById("activityLevel")).value;
let objective = document.getElementById("objective").value;

function calc(event) {
    event.preventDefault();

    sex = document.getElementById("sex").value;
    age = parseInt(document.getElementById("age").value);
    height = parseFloat(document.getElementById("height").value);
    weight = parseFloat(document.getElementById("weight").value);
    activityLevel = parseFloat(document.getElementById("activityLevel").value);
    objective = document.getElementById("objective").value;

    // Fórmulas de TMB baseadas em sexo
    let bmr;
    if (sex === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calorias para manutenção
    let maintenanceCalories = bmr * activityLevel;

    // Ajustes para situações extremas (limites dos inputs)
    if (age <= 14 || age >= 90) {
        maintenanceCalories *= 0.95; // menor eficiência metabólica
    }

    if (weight <= 40 || weight >= 200) {
        maintenanceCalories *= 0.93; // ajuste para metabolismo anormal
    }

    if (height <= 120 || height >= 220) {
        maintenanceCalories *= 0.96; // metabolismo fora do padrão
    }

    // Objetivos
    let adjustedCalories = maintenanceCalories;
    switch (objective) {
        case 'p': // perder peso devagar
            adjustedCalories -= 250;
            break;
        case 'P': // perder peso rápido
            adjustedCalories -= 500;
            break;
        case 'g': // ganhar peso devagar
            adjustedCalories += 250;
            break;
        case 'G': // ganhar peso rápido
            adjustedCalories += 500;
            break;
    }

    // Garantir limites mínimos/seguros
    adjustedCalories = Math.max(1200, adjustedCalories);

    // Saída no console (ou pode ser exibida na página)
    console.log("TMB:", bmr.toFixed(2));
    console.log("Calorias para manter peso:", maintenanceCalories.toFixed(2));
    console.log("Calorias ajustadas para objetivo:", adjustedCalories.toFixed(2));

    // Exibição simples dentro da página
    const result = `
        <h3>Resultados</h3>
        <p>Taxa Metabólica Basal (TMB): <b>${bmr.toFixed(2)} kcal</b></p>
        <p>Calorias de Manutenção: <b>${maintenanceCalories.toFixed(2)} kcal</b></p>
        <p>Calorias para o Objetivo: <b>${adjustedCalories.toFixed(2)} kcal</b></p>
    `;

    document.querySelector("#result").innerHTML = result;
}

function initial() {
    ageInput.value = 15;
    heightInput.value = 167;
    weightInput.value = 66;
}
initial();


