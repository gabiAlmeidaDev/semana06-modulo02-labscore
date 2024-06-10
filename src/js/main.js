import { calculateAverage, evaluateAverage, addDisciplineRow, calculateAllAverages } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
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
    document.getElementById('student_name').innerText = studentName;
    document.getElementById('student_age').innerText = studentAge + ' anos';
    document.getElementById('student_class').innerText = studentClass;
    document.getElementById('student_school').innerText = studentSchool;
    document.getElementById('student_favorite_discipline').innerText = favoriteDiscipline;

    document.getElementById('disciplines_table_body').innerHTML = '';
    document.getElementById('general_average_result').innerHTML = '';
    document.getElementById('highest-average').innerHTML = '';
  } else {
    window.alert('Dados não confirmados');
    return;
  }

  const allAverages = [];
  document.getElementById('btn_add_discipline_row').addEventListener('click', function () {
    const discipline = prompt('Qual a matéria deseja cadastrar?');
    const grades = [];
    let i = 0;
    while (i < 4) {
      const grade = parseFloat(prompt(`Informe a nota ${i + 1} da matéria ${discipline}`));
      if (!isNaN(grade) && grade >= 0 && grade <= 10) {
        grades.push(grade);
        i++;
      } else {
        alert('Por favor, informe um número válido entre 0 e 10.');
      }
    }

    const average = calculateAverage(grades);
    allAverages.push(average);
    calculateAllAverages(allAverages);
    addDisciplineRow(discipline, grades, average);
    evaluateAverage(average);
  });
});
