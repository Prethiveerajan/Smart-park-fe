import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Alert } from '@mui/material';

const BookTicket = ({ open, onClose, parkingId, availableSpaces, onBook }) => {
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState(null);

  const handleBooking = () => {
    // Check if there are available spaces
    if (availableSpaces <= 0) {
      setError('No available parking spaces');
      return;
    }

    if (!userName || !contact) {
      setError('Please fill in all fields');
      return;
    }

    // Generate a unique user ID (you can replace this with your preferred method)
    const userId = `user_${Date.now()}`;

    // Call the onBook function passed as prop with user details and unique user ID
    onBook(parkingId, userName, contact, userId);

    // Close the modal after booking
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: 400,
        margin: 'auto',
        padding: 4,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}>
        <Typography variant="h6">Book Ticket for Parking</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Your Name"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Contact Number"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleBooking}>Book</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookTicket;
