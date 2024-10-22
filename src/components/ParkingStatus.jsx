import React, { useEffect, useState } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';

const ParkingStatus = () => {
  const [availableSpaces, setAvailableSpaces] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/parking/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAvailableSpaces(data.available_spaces);
      } catch (error) {
        console.error('Error fetching parking status:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingStatus();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Box sx={{ padding: 4, marginLeft: '240px',marginTop:'40px'}}>
      <Typography variant="h4" gutterBottom>
        Parking Status
      </Typography>
      <Typography variant="h6">
        Available spaces: {availableSpaces}
      </Typography>
    </Box>
  );
};

export default ParkingStatus;
