const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT cohorts.name as cohort, teachers.name as teacher
  FROM assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = '${process.argv[2]}'
  ORDER BY teachers.name;
`)
.then(
function fulfillmentHandler(result) {
  result.rows.forEach(function printTeacher(teacher) {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
}
)
.catch(
  function rejectionHandler(error) {
    console.error('query error: ', error.stack);
  }
);