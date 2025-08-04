import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../api/jobsApi';
import { formatDistanceToNow } from 'date-fns';
import { useTheme, alpha } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faPaperPlane,
  faFileLines,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';


const JobDetailPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        console.error('Failed to fetch job details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Box py={10} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!job) return null;

  return (
    <Box py={5}>
      <Container maxWidth="md">
        {/* Back Link */}
        <Box mb={4}>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              cursor: 'pointer',
              width: 'fit-content',
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 8, fontSize: 14 }} />
            <Typography variant="body2" fontWeight={500}>
              Back to Listings
            </Typography>
          </Box>
        </Box>

        {/* Job Header Card */}
        <Box
          bgcolor="white"
          boxShadow={1}
          borderRadius={3}
          p={4}
          mb={4}
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={3}
        >
          <Box
            width={64}
            height={64}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
            borderRadius={2}
            flexShrink={0}
          >
            <FontAwesomeIcon icon={faBuilding} style={{ fontSize: 24, color: theme.palette.primary.main }} />
          </Box>

          <Box flexGrow={1}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ md: 'center' }}
              gap={2}
            >
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {job.title}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                  <Typography color="primary" fontWeight={500}>
                    {job.company}
                  </Typography>
                  <Typography>•</Typography>
                  <Typography>{job.mode || 'Remote'}</Typography>
                  <Typography>•</Typography>
                  <Typography>{job.type}</Typography>
                </Box>
              </Box>

              <Tooltip title="Apply functionality coming soon!" arrow>
                <span>
                  <Button
                    variant="contained"
                    startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                    sx={{ borderRadius: 2 }}
                    disabled
                  >
                    Apply Now
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Job Description */}
        <Box bgcolor="white" boxShadow={1} borderRadius={3} p={4}>
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            display="flex"
            alignItems="center"
            mb={3}
          >
            <FontAwesomeIcon icon={faFileLines} style={{ marginRight: 8, color: theme.palette.primary.main }} />
            Job Description
          </Typography>

          <Typography mb={2}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
>       
</Typography>

          <Divider sx={{ my: 4 }} />

          <Tooltip title="Apply functionality coming soon!" arrow>
            <span>
              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2 }}
                startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                disabled
              >
                Apply for this Position
              </Button>
            </span>
          </Tooltip>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={2}
          >
            Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default JobDetailPage;
