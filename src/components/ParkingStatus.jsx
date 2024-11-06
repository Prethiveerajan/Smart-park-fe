

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import BookTicket from './BookTicket';

const parkingSpaces = [
  { id: 1, name: 'Parking - 1', thumbnail: '/sample.png' },
  { id: 2, name: 'Parking - 2', thumbnail: '/parking_lot.png' },
];

const ParkingStatus = () => {
  const [availableSpaces, setAvailableSpaces] = useState({ parking1: 0, parking2: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    const fetchParkingStatus = async () => {
      setLoading(true);

      try {
        const response1 = await fetch('http://localhost:8000/api/parking/status1');
        const data1 = await response1.json();
        const parking1AvailableSpaces = data1.available_spaces;

        const response2 = await fetch('http://localhost:8000/api/parking/status2');
        const data2 = await response2.json();
        const parking2AvailableSpaces = data2.available_spaces;

        setAvailableSpaces({
          parking1: parking1AvailableSpaces,
          parking2: parking2AvailableSpaces,
        });
      } catch (error) {
        console.error('Error fetching parking status:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingStatus();
  }, []);

  const handleBooking = (parkingId, userName, contact, userId) => {
    // Here you can send the booking information to your backend or handle state updates
    console.log('Booking details:', { parkingId, userName, contact, userId });

    // Update available spaces by reducing the count
    setAvailableSpaces((prevState) => {
      const updatedSpaces = { ...prevState };
      if (parkingId === 1) {
        updatedSpaces.parking1 -= 1;
      } else if (parkingId === 2) {
        updatedSpaces.parking2 -= 1;
      }
      return updatedSpaces;
    });
  };

  return (
    <Box sx={{ padding: 4, marginLeft: '240px', marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Parking Status
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {parkingSpaces.map((space) => (
            <Grid item xs={12} sm={6} md={4} key={space.id}>
              <Card sx={{ cursor: 'default', '&:hover': { boxShadow: 4 } }}>
                <CardMedia
                  component="img"
                  image={space.thumbnail || '/default_thumbnail.png'}
                  alt={space.name}
                  sx={{ height: 180, width: '100%', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{space.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Spaces: {availableSpaces[`parking${space.id}`] || 0}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => {
                      setSelectedParking(space.id);
                      setOpenModal(true);
                    }}
                    disabled={availableSpaces[`parking${space.id}`] <= 0}
                  >
                    Book Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <BookTicket
        open={openModal}
        onClose={() => setOpenModal(false)}
        parkingId={selectedParking}
        availableSpaces={availableSpaces[`parking${selectedParking}`]}
        onBook={handleBooking}
      />
    </Box>
  );
};

export default ParkingStatus;
