document.addEventListener('DOMContentLoaded', function () {
    const studentName = prompt("Qual o nome do aluno?");
    const studentAge = prompt("Qual a idade do aluno?");
    const studentClass = prompt("Qual a série do aluno?");
    const studentSchool = prompt("Qual o nome da escola?");
    const favoriteDiscipline = prompt("Qual a sua matéria favorita?");

    document.getElementById('student_name').innerText = studentName;
    document.getElementById('student_age').innerText = studentAge + ' anos';
    document.getElementById('student_class').innerText = studentClass;
    document.getElementById('student_school').innerText = studentSchool;
    document.getElementById('student_favorite_discipline').innerText = favoriteDiscipline;

    document.getElementById('btn_add_discipline_row').addEventListener('click', function () {
        const discipline = prompt("Qual a matéria deseja cadastrar?");
        const grades = [];
        let i = 0;
        while (i < 4) {
            const grade = parseFloat(prompt(`Informe a nota ${i + 1} da matéria ${discipline}`));
            if (!isNaN(grade) && grade >= 0 && grade <= 10) {
                grades.push(grade);
                i++;
            } else {
                alert("Por favor, informe um número válido entre 0 e 10.");
            }
        }

        const average = calcularMedia(grades);
        addDisciplineRow(discipline, grades, average);
        avaliarMedia(average);
    });
});

function calcularMedia(notasArray) {
    let soma = 0;
    for (let i = 0; i < notasArray.length; i++) {
        soma += notasArray[i];
    }
    return soma / notasArray.length;
}

function avaliarMedia(media) {
    const resultElement = document.getElementById('resultadoMedia');
    resultElement.innerHTML = "";
    if (media > 7) {
        resultElement.innerHTML += "Parabéns, você passou na média!<br>";
    } else {
        resultElement.innerHTML += "Infelizmente, você está de recuperação.<br>";
    }
}

function addDisciplineRow(discipline, grades, average) {
    const tbody = document.getElementById('disciplines_table_body');
    const newRow = `<tr>
                      <td>${discipline}</td>
                      <td>${grades[0]}</td>
                      <td>${grades[1]}</td>
                      <td>${grades[2]}</td>
                      <td>${grades[3]}</td>
                      <td>${average.toFixed(2)}</td>
                    </tr>`;
    tbody.innerHTML += newRow;
}


function imprimirNomes() {
    let aluno1 = document.getElementById('aluno1').value;
    let aluno2 = document.getElementById('aluno2').value;
    let aluno3 = document.getElementById('aluno3').value;
    let aluno4 = document.getElementById('aluno4').value;

    let alunos = [aluno1, aluno2, aluno3, aluno4];

    let resultado = "";
    alunos.forEach(function(nome) {
        resultado += nome + "<br>";
    });
    document.getElementById('resultadoNomes').innerHTML = resultado;
}

function exibirTabuada(numero) {
    let resultado = "<table class='tabuada'><tr><th>Operação</th><th>Resultado</th></tr>";
    for (let i = 0; i <= 10; i++) {
        resultado += "<tr><td>" + numero + " x " + i + "</td><td>" + (numero * i) + "</td></tr>";
    }
    resultado += "</table>";
    document.getElementById('tabuada').innerHTML = resultado;
}

function toggleTabuada() {
    let tabuadaDiv = document.getElementById('tabuada');
    let tabuadaButton = document.getElementById('tabuadaButton');
    let numeroTabuada = parseInt(document.getElementById('numeroTabuada').value);

    if (isNaN(numeroTabuada) || numeroTabuada < 1) {
        alert("Por favor, insira um número válido para a tabuada.");
        return;
    }

    if (tabuadaDiv.style.display === "none") {
        exibirTabuada(numeroTabuada);
        tabuadaDiv.style.display = "block";
        tabuadaButton.textContent = "Fechar Tabuada";
    } else {
        tabuadaDiv.style.display = "none";
        tabuadaButton.textContent = "Mostrar Tabuada";
    }
}

function toggleMedia() {
    let resultadoMediaDiv = document.getElementById('resultadoMedia');
    let mediaButton = document.getElementById('mediaButton');

    if (resultadoMediaDiv.style.display === "none") {
        calcularNotas();
        resultadoMediaDiv.style.display = "block";
        mediaButton.textContent = "Fechar Média";
    } else {
        resultadoMediaDiv.style.display = "none";
        mediaButton.textContent = "Calcular Média";
    }
}

function toggleNomes() {
    let resultadoNomesDiv = document.getElementById('resultadoNomes');
    let nomesButton = document.getElementById('nomesButton');

    if (resultadoNomesDiv.style.display === "none") {
        imprimirNomes();
        resultadoNomesDiv.style.display = "block";
        nomesButton.textContent = "Fechar Nomes";
    } else {
        resultadoNomesDiv.style.display = "none";
        nomesButton.textContent = "Imprimir Nomes";
    }
}

function toggleQuestionario() {
    var questionarioDiv = document.getElementById('questionario');
    var questionarioButton = document.getElementById('questionarioButton');
    
    if (questionarioDiv.style.display === "none") {
        var nomeAluno = document.getElementById('questionario1').value;
        var idadeAluno = document.getElementById('questionario2').value;
        var serieAluno = document.getElementById('questionario3').value;
        var nomeEscola = document.getElementById('questionario4').value;
        var materiaFavorita = document.getElementById('questionario5').value;

        var confirmacao = confirm("Confirma os dados inseridos?\nNome do aluno: " + nomeAluno + "\nIdade do aluno: " + idadeAluno + "\nSérie do aluno: " + serieAluno + "\nNome da escola: " + nomeEscola + "\nMatéria favorita: " + materiaFavorita);

        if (confirmacao) {
            questionarioDiv.innerHTML = "<strong>Nome do aluno</strong>: " + nomeAluno + "<br>" +
                                        "<strong>Idade do aluno</strong>: " + idadeAluno + "<br>" +
                                        "<strong>Série do aluno</strong>: " + serieAluno + "<br>" +
                                        "<strong>Nome da escola</strong>: " + nomeEscola + "<br>" +
                                        "<strong>Matéria favorita</strong>: " + materiaFavorita + "<br>";
            questionarioDiv.style.display = "block";
            questionarioButton.textContent = "Esconder Respostas";
        } else {
            questionarioDiv.style.display = "none";
        }
    } else {
        questionarioDiv.style.display = "none";
        questionarioButton.textContent = "Mostrar Respostas";
    }
}


function toggleDisciplina() {
    var materiaDiv = document.getElementById('materia');
    var materiaButton = document.querySelector('.materiaButton');

    if (materiaDiv.style.display === "none") {
        var nomeMateria = prompt("Informe o nome da matéria:");
        if (!nomeMateria) return;
        
        var notas = [];
        var i = 1;
        while (i <= 4) {
            var nota = prompt("Informe a nota " + i + " (0-10):");
            if (nota === null) return;
            nota = parseFloat(nota);
            if (!isNaN(nota) && nota >= 0 && nota <= 10) {
                notas.push(nota);
                i++;
            } else {
                alert("Por favor, insira uma nota válida (0-10).");
            }
        }

        var disciplina = {
            nomeMateria: nomeMateria,
            notas: notas
        };

        var media = calcularMedia(notas);
        var resultado = "<p><strong>Nome da matéria</strong>: " + disciplina.nomeMateria + "</p>";
        resultado += "<p><strong>Notas</strong>: " + notas.join(", ") + "</p>";
        resultado += "<p><strong>Média</strong>: " + media.toFixed(2) + "</p>";

        materiaDiv.innerHTML = resultado;
        materiaDiv.style.display = "block";
        materiaButton.textContent = "Esconder Matéria";
    } else {
        materiaDiv.style.display = "none";
        materiaButton.textContent = "Informar Matéria";
    }
}

function calcularMedia(notasArray) {
    var soma = 0;
    for (var i = 0; i < notasArray.length; i++) {
        soma += notasArray[i];
    }
    return soma / notasArray.length;
}

function toggleMaior() {
    var resultadoMaiorDiv = document.getElementById('resultadoMaior');
    var maiorButton = document.getElementById('maiorButton');

    if (resultadoMaiorDiv.style.display === "none") {
        var numero1 = parseFloat(document.getElementById('numero1').value);
        var numero2 = parseFloat(document.getElementById('numero2').value);
        var numero3 = parseFloat(document.getElementById('numero3').value);
        var numero4 = parseFloat(document.getElementById('numero4').value);

        if (isNaN(numero1) || isNaN(numero2) || isNaN(numero3) || isNaN(numero4)) {
            alert("Por favor, insira todos os números corretamente.");
            return;
        }

        var numeros = [numero1, numero2, numero3, numero4];
        var maior = encontrarMaiorNumero(numeros);

        resultadoMaiorDiv.innerHTML = "<p><strong>O maior número</strong> é " + maior + "</p>";
        resultadoMaiorDiv.style.display = "block";
        maiorButton.textContent = "Esconder Maior";
    } else {
        resultadoMaiorDiv.style.display = "none";
        maiorButton.textContent = "Calcular Maior";
    }
}

function encontrarMaiorNumero(numerosArray) {
    var maior = numerosArray[0];
    for (var i = 1; i < numerosArray.length; i++) {
        if (numerosArray[i] > maior) {
            maior = numerosArray[i];
        }
    }
    return maior;
}
