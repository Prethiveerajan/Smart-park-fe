// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Typography, TextField, Alert } from '@mui/material';

// function VideoUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     axios.post('http://localhost:8000/api/upload', formData)
//       .then(response => {
//         setMessage(response.data.message);
//         setError(null);
//       })
//       .catch(error => {
//         console.error(error);
//         setError('Upload failed, please try again');
//         setMessage(null);
//       });
//   };

//   return (
//     <Box sx={{ padding: 4, marginLeft: '240px',marginTop:'40px'}}>
//       <Typography variant="h4" gutterBottom>
//         Upload Video
//       </Typography>
//       <TextField
//         type="file"
//         onChange={handleFileChange}
//         fullWidth
//         sx={{ marginBottom: 2 }}
//       />
//       <Button variant="contained" onClick={handleUpload} sx={{ marginBottom: 2 }}>
//         Upload
//       </Button>
//       {message && <Alert severity="success">{message}</Alert>}
//       {error && <Alert severity="error">{error}</Alert>}
//     </Box>
//   );
// }

// export default VideoUpload;


import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, Alert } from '@mui/material';

function VideoUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [availableSpaces, setAvailableSpaces] = useState(null); // State to store available spaces
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
        setError('Please select a file to upload');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Clear previous state
    setMessage(null);
    setAvailableSpaces(null);
    setError(null);

    axios.post('http://localhost:8000/api/upload', formData)
        .then(response => {
            setMessage(response.data.message);
            setAvailableSpaces(response.data.available_spaces); // Set available spaces from response
        })
        .catch(error => {
            console.error(error);
            setError('Upload failed, please try again');
        });
};


  return (
    <Box sx={{ padding: 4, marginLeft: '240px', marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Upload Video
      </Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleUpload} sx={{ marginBottom: 2 }}>
        Upload
      </Button>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {availableSpaces !== null && (
        <Alert severity="info">Available Parking Spaces: {availableSpaces}</Alert>
      )}
    </Box>
  );
}

export default VideoUpload;
