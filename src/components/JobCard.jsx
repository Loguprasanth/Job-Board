import React from 'react';
import { Box, Typography, Chip, Card } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useTheme, alpha } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


const JobCard = ({ job }) => {
  const theme = useTheme();
  const navigate = useNavigate();


  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        height: 420,
        borderRadius: 3,
        p: 3,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Top Section: Icon + Date */}
      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
        <Box
          width={48}
          height={48}
          borderRadius={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
        >
          <FontAwesomeIcon icon={faBriefcase} style={{ color: theme.palette.primary.main, fontSize: '18px' }} />
        </Box>
        <Typography variant="body2" color="text.secondary">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}

        </Typography>
      </Box>

      {/* Job Title & Company */}
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {job.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {job.company}
      </Typography>

      {/* Chips: Type & Mode */}
      <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
        <Chip label={job.type} size="small" sx={{ bgcolor: '#E0F2FF', color: '#007FFF' }} />
        <Chip label={job.mode} size="small" sx={{ bgcolor: '#F3E8FF', color: '#7E22CE' }} />
      </Box>

      {/* Description (Clamp to 3 lines) */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 4,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}

      >
      </Typography>

      {/* View Details Link */}
      <Box
  display="flex"
  alignItems="center"
  sx={{
    cursor: 'pointer',
    color: 'primary.main',
    '&:hover .view-details-text': {
      textDecoration: 'underline',
    },
  }}
    onClick={() => navigate(`/job/${job._id}`)}

>
  <Typography className="view-details-text" fontWeight="medium">
    View Details
  </Typography>
  <ArrowForwardIcon fontSize="small" sx={{ ml: 1 }} />
</Box>

    </Card>
  );
};

export default JobCard;
