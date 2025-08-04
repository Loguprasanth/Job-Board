import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  CircularProgress,
} from '@mui/material';
import JobCard from '../components/JobCard';
import { getAllJobs } from '../api/jobsApi';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const getGridColumns = () => {
    if (isXs) return 12;
    if (isSm) return 6;
    if (isMd) return 4;
    return 3;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box py={5}>
      <Container>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          All Jobs
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress color="primary" />
          </Box>
        ) : jobs.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No jobs found. Please check back later.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} lg={getGridColumns()} key={job._id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default JobListPage;
