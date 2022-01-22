const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT students.id AS student_id, students.name, cohorts.name AS cohort
FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
.then((result) => {
  // result.rows is an array of JS objects (1 table row = 1 object)
  result.rows.forEach((student) => {
    console.log(`${student.name} has an id of ${student.student_id} and was in the ${student.cohort} cohort.`);
  })
})
.catch((error) => {
  console.error('query error', error.stack);
});