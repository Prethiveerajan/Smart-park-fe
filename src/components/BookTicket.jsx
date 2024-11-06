
// import React, { useState } from 'react';
// import { Modal, Box, Typography, Button, TextField, Alert } from '@mui/material';

// const BookTicket = ({ open, onClose, parkingId, availableSpaces, onBook }) => {
//   const [userName, setUserName] = useState('');
//   const [contact, setContact] = useState('');
//   const [error, setError] = useState(null);

//   const userId = `user_${Date.now()}`; // or use a UUID

//   const handleBooking = async () => {
//     try {
//         const response = await fetch('http://localhost:8000/api/booking', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 parking_id: parkingId,
//                 user_name: userName,
//                 contact: contact,
//                 user_id: userId
//             }),
//         });

//         const data = await response.json();
//         console.log("Response from backend:", data); // Log the response from backend
        
//         if (response.ok) {
//             onBook(parkingId); // Trigger update in the parent component
//             console.log(data.message);
//         } else {
//             setError(data.message || "Booking failed");
//         }
//     } catch (error) {
//         console.error("Booking failed", error);
//         setError("Failed to book the parking space. Please try again.");
//     }
// };


//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{
//         width: 400,
//         margin: 'auto',
//         padding: 4,
//         backgroundColor: 'white',
//         borderRadius: 2,
//         boxShadow: 3,
//       }}>
//         <Typography variant="h6">Book Ticket for Parking</Typography>
//         {error && <Alert severity="error">{error}</Alert>}
//         <TextField
//           label="Your Name"
//           fullWidth
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           sx={{ marginTop: 2 }}
//         />
//         <TextField
//           label="Contact Number"
//           fullWidth
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//           sx={{ marginTop: 2 }}
//         />
//         <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
//           <Button variant="outlined" onClick={onClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleBooking}>Book</Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default BookTicket;

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Alert } from '@mui/material';

const BookTicket = ({ open, onClose, parkingId, availableSpaces, onBook }) => {
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Add state for success message

  const userId = `user_${Date.now()}`; // or use a UUID

  const handleBooking = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parking_id: parkingId,
                user_name: userName,
                contact: contact,
                user_id: userId
            }),
        });

        const data = await response.json();
        console.log("Response from backend:", data); // Log the response from backend
        
        if (response.ok) {
            setSuccessMessage("Booking successful!"); // Set success message
            setError(null); // Clear any previous error messages
            onBook(parkingId); // Trigger update in the parent component
            console.log(data.message);

            // Close the modal after 3 seconds
            setTimeout(() => {
                onClose(); // Close the modal
            }, 3000);
        } else {
            setError(data.message || "Booking failed");
            setSuccessMessage(''); // Clear success message if booking fails
        }
    } catch (error) {
        console.error("Booking failed", error);
        setError("Failed to book the parking space. Please try again.");
        setSuccessMessage(''); // Clear success message if error occurs
    }
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

        {successMessage && <Alert severity="success">{successMessage}</Alert>} {/* Display success alert */}
        {error && <Alert severity="error">{error}</Alert>} {/* Display error alert */}

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
