document.addEventListener('DOMContentLoaded', function() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (studentData) {
        document.getElementById('student_name').textContent = studentData.name;
        document.getElementById('student_age').textContent = studentData.age + ' anos';
        document.getElementById('student_class').textContent = studentData.studentClass;
        document.getElementById('student_school').textContent = studentData.school;
        document.getElementById('student_favorite_discipline').textContent = studentData.favoriteDiscipline;
    } else {
        console.error('Nenhum dado de aluno encontrado!');
    }
});
