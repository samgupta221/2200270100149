import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data));
  }, []);

  const apply = async (id) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/jobs/apply/${id}`, {}, {
      headers: { Authorization: token }
    });
    alert('Applied to job');
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <b>{job.title}</b> @ {job.company}
            <p>{job.description}</p>
            <button onClick={() => apply(job._id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
