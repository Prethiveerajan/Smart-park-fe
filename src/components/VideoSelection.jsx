import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Typography, Grid, Alert } from '@mui/material';

const videos = [
  { id: 1, name: 'Car Park', src: 'carPark.mp4', thumbnail: '/parking_lot.png' },
  { id: 2, name: 'Parking 1', src: 'parking1.mp4', thumbnail: '/sample.png' },
];

const VideoSelection = () => {
  const navigate = useNavigate();
  const [availableSpaces, setAvailableSpaces] = useState(null);
  const [error, setError] = useState(null);

  const handleVideoSelect = async (videoName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/parking/select/${videoName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.available_spaces !== undefined) {
        setAvailableSpaces(data.available_spaces);
        navigate(`/status`);
      } else {
        setError('Available spaces not found in response');
      }
    } catch (error) {
      console.error('Error fetching parking status:', error);
      setError(error.message);
    }
  };

  return (
    <Box sx={{padding: 4, marginLeft: '240px',marginTop:'40px' }}>
      <Typography variant="h4" gutterBottom>
        Select a Video
      </Typography>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card onClick={() => handleVideoSelect(video.src)} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
              <CardMedia component="img" image={video.thumbnail} alt={video.name} />
              <CardContent>
                <Typography variant="h6">{video.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {availableSpaces !== null && (
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Available Spaces: {availableSpaces}
        </Typography>
      )}
      {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default VideoSelection;
