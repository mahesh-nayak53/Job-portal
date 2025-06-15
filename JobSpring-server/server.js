const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 


let jobs = [
  { _id: '1', jobTitle: 'Frontend Developer', companyName: 'ABC Corp', userEmail: 'maheshnayakgvt06@gmail.com' },
  { _id: '2', jobTitle: 'Backend Developer', companyName: 'XYZ Inc', userEmail: 'maheshnayakgvt06@gmail.com' },
  { _id: '3', jobTitle: 'Full Stack Developer', companyName: 'FooBar Ltd', userEmail: 'otheruser@gmail.com' },
  { _id: '4', jobTitle: 'QA Engineer', companyName: 'Tech Solutions', userEmail: 'maheshnayakgvt06@gmail.com' },
  { _id: '5', jobTitle: 'DevOps Engineer', companyName: 'CloudWorks', userEmail: 'maheshnayakgvt06@gmail.com' }
];


app.get('/myJobs/:email', (req, res) => {
  const email = req.params.email;
  const userJobs = jobs.filter(job => job.userEmail === email);
  res.json(userJobs);
});


app.delete('/job/:id', (req, res) => {
  const id = req.params.id;
  const index = jobs.findIndex(job => job._id === id);
  if (index !== -1) {
    jobs.splice(index, 1);
    return res.json({ acknowledged: true, message: 'Job deleted' });
  }
  res.status(404).json({ acknowledged: false, message: 'Job not found' });
});

const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
