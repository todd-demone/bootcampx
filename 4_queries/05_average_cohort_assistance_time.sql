SELECT 
  AVG(assistance_requests.completed_at - assistance_requests.started_at) as average_assistance_time,
  cohorts.name as name
FROM assistance_requests
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohorts.id = cohort_id
GROUP BY cohorts.name
ORDER BY average_assistance_time;