document.addEventListener('DOMContentLoaded', function () {
  const studentName = prompt('Qual o nome do aluno?');
  const studentAge = prompt('Qual a idade do aluno?');
  const studentClass = prompt('Qual a série do aluno?');
  const studentSchool = prompt('Qual o nome da escola?');
  const favoriteDiscipline = prompt('Qual a sua matéria favorita?');

  document.getElementById('student_name').innerText = studentName;
  document.getElementById('student_age').innerText = studentAge + ' anos';
  document.getElementById('student_class').innerText = studentClass;
  document.getElementById('student_school').innerText = studentSchool;
  document.getElementById('student_favorite_discipline').innerText = favoriteDiscipline;
  document.getElementById('disciplines_table_body').innerHTML = '';
  document.getElementById('general_average_result').innerHTML = '';
  document.getElementById('highest-average').innerHTML = '';

  const allAverages = []; // fora do bloco addEventListener para ser acessada dentro do evento e pela
  // função calculateAllAverages
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
    avaliarMedia(average);
  });
});

function calculateAverage(gradesArray) {
  let sum = 0;
  for (let i = 0; i < gradesArray.length; i++) {
    sum += gradesArray[i];
  }
  return sum / gradesArray.length;
}

function evaluateAverage(average) {
  const resultElement = document.getElementById('resultadoMedia');
  resultElement.innerHTML = '';
  if (average > 7) {
    resultElement.innerHTML += 'Parabéns, você passou na média!<br>';
  } else {
    resultElement.innerHTML += 'Infelizmente, você está de recuperação.<br>';
  }
}

function addDisciplineRow(discipline, grades, average) {
  const tbody = document.getElementById('disciplines_table_body');
  const newRow = `<tr>
                      <td>${discipline}</td>
                      <td>${grades[0].toFixed(1)}</td>
                      <td>${grades[1].toFixed(1)}</td>
                      <td>${grades[2].toFixed(1)}</td>
                      <td>${grades[3].toFixed(1)}</td>
                      <td>${average.toFixed(1)}</td>
                    </tr>`;
  tbody.innerHTML += newRow;
}

function printNames() {
  let student1 = document.getElementById('aluno1').value;
  let student2 = document.getElementById('aluno2').value;
  let student3 = document.getElementById('aluno3').value;
  let student4 = document.getElementById('aluno4').value;

  let students = [student1, student2, student3, student4];

  let result = '';
  students.forEach(function (name) {
    result += name + '<br>';
  });
  document.getElementById('resultadoNomes').innerHTML = result;
}

function findHighestAverageAmongSubjects(allAverages) {
  let highestAverage = allAverages[0];
  for (let average of allAverages) {
    if (average > highestAverage) {
      highestAverage = average;
    }
  }
  return highestAverage.toFixed(1);
}
//-------------------
function calculateAllAverages(allAverages) {
  const result = calculateAverage(allAverages);
  document.querySelector('#general_average_result').textContent = `A média geral do aluno é ${result.toFixed(1)}`;

  const highestSubjectAverage = findHighestAverageAmongSubjects(allAverages);
  document.getElementById('highest-average').textContent = `A maior média entre as matérias é ${highestSubjectAverage}`;
}
//------------------
