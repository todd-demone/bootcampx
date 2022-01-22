const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT students.id AS student_id, students.name, cohorts.name AS cohort
  FROM students
    JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE '${process.argv[2]}%'
  LIMIT ${process.argv[3] || 5};
`)
.then((result) => {
  // result.rows is an array of JS objects (1 table row = 1 object)
  result.rows.forEach((student) => {
    console.log(`${student.name} has an id of ${student.student_id} and was in the ${student.cohort} cohort.`);
  })
})
.catch((error) => {
  console.error('query error', error.stack);
});