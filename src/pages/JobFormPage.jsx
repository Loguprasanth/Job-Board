import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faPaperPlane,
  faFileLines,
  faArrowLeft,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createJob } from '../api/jobsApi'; 

const modules = {
  toolbar: [
    // Text style
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],

    // Text formatting
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],

    // Color options
    [{ 'color': [] }, { 'background': [] }],

    // Script (sub/super)
    [{ 'script': 'sub' }, { 'script': 'super' }],

    // List and alignment
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],



  ]

  
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'color', 'background',
  'script',
  'list', 'indent',
  'align',
  'link', 'image', 'video',
];


const JobFormPage = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    mode: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

const validate = () => {
  const errs = {};
  const plainText = formData.description.replace(/<[^>]+>/g, '').trim(); // Strip HTML and trim

  if (!formData.title.trim()) errs.title = 'Job title is required';
  if (!formData.company.trim()) errs.company = 'Company name is required';
  if (!formData.mode.trim()) errs.mode = 'Job mode is required';
  if (!formData.type.trim()) errs.type = 'Job type is required';
  if (!plainText) errs.description = 'Job description is required';

  return errs;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setLoading(true);
  try {
    await createJob(formData); 
    toast.success('Job Posted Successfully!');

    setFormSubmitted(true);
    setFormData({
      title: '',
      company: '',
      mode: '',
      type: '',
      description: '',
    });
    setErrors({});

    // Delay to let toast be visible before redirect
    setTimeout(() => {
      navigate('/');
    }, 2000);

  } catch (err) {
    toast.error('Error posting job. Try again.');
  } finally {
    setLoading(false);
  }
};



  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <ToastContainer position="top-right" />

      {/* Back Link */}
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

      {/* Title */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight={600}>
          Post a New Job
        </Typography>
        <Typography color="text.secondary">
          Fill out the form below to create your job listing
        </Typography>
      </Box>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        bgcolor="white"
        boxShadow={1}
        borderRadius={3}
        p={{ xs: 3, sm: 4 }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            name="title"
            label="Job Title"
            fullWidth
            placeholder="e.g. Senior UX Designer"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
          />

          <TextField
            name="company"
            label="Company"
            fullWidth
            placeholder="e.g. Acme Inc."
            value={formData.company}
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
            required
          />

          <FormControl fullWidth error={!!errors.mode}>
            <InputLabel id="job-mode-label">Job Mode</InputLabel>
            <Select
              labelId="job-mode-label"
              name="mode"
              value={formData.mode}
              label="Job Mode"
              onChange={handleChange}
              required
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="On-site">On-site</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
            {errors.mode && (
              <Typography variant="caption" color="error">
                {errors.mode}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth error={!!errors.type}>
            <InputLabel id="job-type-label">Job Type</InputLabel>
            <Select
              labelId="job-type-label"
              name="type"
              value={formData.type}
              label="Job Type"
              onChange={handleChange}
              required
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
             
            </Select>
            {errors.type && (
              <Typography variant="caption" color="error">
                {errors.type}
              </Typography>
            )}
          </FormControl>

          <Box>
            <Typography variant="subtitle"      color="text.secondary" 
>
              Job Description
            </Typography>
            <Box sx={{ marginTop:"10px",'.ql-editor': { minHeight: 100 } }}>

            <ReactQuill
  theme="snow"
  value={formData.description}
  onChange={handleQuillChange}
  modules={modules}
  placeholder="Describe the job here..."
formats={formats}


/>
</Box>
            {errors.description && (
              <Typography variant="caption" color="error">
                {errors.description}
              </Typography>
            )}
          </Box>

          <Box textAlign={{ xs: 'center', sm: 'left' }} pt={2}>
            <Button
              type="submit"
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <FontAwesomeIcon icon={faPaperPlane} />
                )
              }
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </Box>
        </Box>
      </Box>

   
    </Container>
  );
};

export default JobFormPage;
