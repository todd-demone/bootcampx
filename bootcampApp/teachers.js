const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT cohorts.name as cohort, teachers.name as teacher
FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`;

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(queryString, values)
.then((result) => {
  result.rows.forEach((teacher) => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch((error) => {
    console.error('query error: ', error.stack);
});