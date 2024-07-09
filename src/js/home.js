import { calculateAverage, evaluateAverage, addDisciplineRow, calculateAllAverages } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const disciplinesData = JSON.parse(localStorage.getItem('disciplinesData')) || [
        { nome: "Matemática", nota1: 7.5, nota2: 8.0, nota3: 6.0, nota4: 9.0 },
        { nome: "Português", nota1: 6.0, nota2: 7.5, nota3: 8.0, nota4: 7.0 },
        { nome: "História", nota1: 8.5, nota2: 9.0, nota3: 7.5, nota4: 8.0 }
    ];

    if (!localStorage.getItem('disciplinesData')) {
        localStorage.setItem('disciplinesData', JSON.stringify(disciplinesData));
    }

    if (studentData) {
        document.getElementById('student_name').textContent = studentData.name;
        document.getElementById('student_age').textContent = studentData.age + ' anos';
        document.getElementById('student_class').textContent = studentData.studentClass;
        document.getElementById('student_school').textContent = studentData.school;
        document.getElementById('student_favorite_discipline').textContent = studentData.favoriteDiscipline;
    } else {
        promptStudentInfo();
    }

    const tbody = document.getElementById('disciplines_table_body');
    disciplinesData.forEach(discipline => {
        const average = calculateAverage([discipline.nota1, discipline.nota2, discipline.nota3, discipline.nota4]);
        const newRow = `
            <tr>
                <td>${discipline.nome}</td>
                <td>${discipline.nota1}</td>
                <td>${discipline.nota2}</td>
                <td>${discipline.nota3}</td>
                <td>${discipline.nota4}</td>
                <td>${average.toFixed(1)}</td>
            </tr>`;
        tbody.innerHTML += newRow;
    });

    updateGeneralAverage(disciplinesData);
    updateHighestAverage(disciplinesData);

    document.getElementById('btn_add_discipline_row').addEventListener('click', function () {
        const nome = prompt('Digite o nome da matéria:');
        if (!nome) return;

        const nota1 = parseFloat(prompt('Digite a nota 1:'));
        const nota2 = parseFloat(prompt('Digite a nota 2:'));
        const nota3 = parseFloat(prompt('Digite a nota 3:'));
        const nota4 = parseFloat(prompt('Digite a nota 4:'));

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
            alert('Por favor, insira notas válidas.');
            return;
        }

        const average = calculateAverage([nota1, nota2, nota3, nota4]);

        const newDiscipline = { nome, nota1, nota2, nota3, nota4 };
        disciplinesData.push(newDiscipline);
        localStorage.setItem('disciplinesData', JSON.stringify(disciplinesData));

        const newRow = `
            <tr>
                <td>${nome}</td>
                <td>${nota1}</td>
                <td>${nota2}</td>
                <td>${nota3}</td>
                <td>${nota4}</td>
                <td>${average.toFixed(1)}</td>
            </tr>`;
        tbody.innerHTML += newRow;

        updateGeneralAverage(disciplinesData);
        updateHighestAverage(disciplinesData);
    });

    function calculateAverage(grades) {
        let sum = 0;
        grades.forEach(grade => sum += grade);
        return sum / grades.length;
    }

    function updateGeneralAverage(disciplines) {
        const allAverages = disciplines.map(discipline => calculateAverage([discipline.nota1, discipline.nota2, discipline.nota3, discipline.nota4]));
        const generalAverage = calculateAverage(allAverages);
        document.getElementById('general_average_result').textContent = `A média geral do aluno é ${generalAverage.toFixed(1)}`;
    }

    function updateHighestAverage(disciplines) {
        const allAverages = disciplines.map(discipline => calculateAverage([discipline.nota1, discipline.nota2, discipline.nota3, discipline.nota4]));
        const highestAverage = Math.max(...allAverages);
        document.getElementById('highest-average').textContent = `A maior média entre as matérias é ${highestAverage.toFixed(1)}`;
    }

    function promptStudentInfo() {
        const studentName = prompt('Qual o nome do aluno?');
        const studentAge = prompt('Qual a idade do aluno?');
        const studentClass = prompt('Qual a série do aluno?');
        const studentSchool = prompt('Qual o nome da escola?');
        const favoriteDiscipline = prompt('Qual a sua matéria favorita?');

        var confirmacao = confirm(
            'Confirma os dados inseridos?\nNome do aluno: ' +
            studentName +
            '\nIdade do aluno: ' +
            studentAge +
            '\nSérie do aluno: ' +
            studentClass +
            '\nNome da escola: ' +
            studentSchool +
            '\nMatéria favorita: ' +
            favoriteDiscipline
        );

        if (confirmacao) {
            const studentData = {
                name: studentName,
                age: studentAge,
                studentClass: studentClass,
                school: studentSchool,
                favoriteDiscipline: favoriteDiscipline
            };
            localStorage.setItem('studentData', JSON.stringify(studentData));

            document.getElementById('student_name').innerText = studentName;
            document.getElementById('student_age').innerText = studentAge + ' anos';
            document.getElementById('student_class').innerText = studentClass;
            document.getElementById('student_school').innerText = studentSchool;
            document.getElementById('student_favorite_discipline').innerText = favoriteDiscipline;
        } else {
            window.alert('Dados não confirmados');
            return;
        }
    }
});
