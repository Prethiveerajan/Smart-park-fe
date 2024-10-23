// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Alert, CircularProgress } from '@mui/material';

// const ParkingStatus = () => {
//   const [availableSpaces, setAvailableSpaces] = useState({ parking1: null, parking2: null });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchParkingStatus = async () => {
//       setLoading(true); // Reset loading state

//       try {
//         // Fetch data for parking -1
//         const response1 = await fetch('http://localhost:8000/api/parking/status');
//         if (!response1.ok) {
//           throw new Error(`HTTP error! status: ${response1.status}`);
//         }
//         const data1 = await response1.json();
//         const parking1AvailableSpaces = data1.available_spaces; // Assuming the response has this structure

//         // Fetch data for parking -2
//         const response2 = await fetch('http://localhost:8000/api/parking/status2');
//         if (!response2.ok) {
//           throw new Error(`HTTP error! status: ${response2.status}`);
//         }
//         const data2 = await response2.json();
//         const parking2AvailableSpaces = data2.available_spaces; // Assuming the response has this structure

//         // Update state with fetched data
//         setAvailableSpaces({
//           parking1: parking1AvailableSpaces,
//           parking2: parking2AvailableSpaces,
//         });
//       } catch (error) {
//         console.error('Error fetching parking status:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParkingStatus();
//   }, []);

//   return (
//     <Box sx={{ padding: 4, marginLeft: '240px', marginTop: '40px', textAlign: 'center' }}>
//       <Typography variant="h4" gutterBottom>
//         Parking Status
//       </Typography>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Alert severity="error" sx={{ marginTop: 2 }}>
//           Error: {error}
//         </Alert>
//       ) : (
//         <Box sx={{ marginTop: 2 }}>
//           <Typography variant="h6">
//             Parking -1 Available Spaces: {availableSpaces.parking1 || 0}
//           </Typography>
//           <Typography variant="h6">
//             Parking -2 Available Spaces: {availableSpaces.parking2 || 0}
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ParkingStatus;


import React, { useEffect, useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';

const parkingSpaces = [
  { id: 1, name: 'Parking - 1', thumbnail: '/sample.png' }, // Add actual thumbnail paths
  { id: 2, name: 'Parking - 2', thumbnail: '/parking_lot.png' },
];

const ParkingStatus = () => {
  const [availableSpaces, setAvailableSpaces] = useState({ parking1: null, parking2: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingStatus = async () => {
      setLoading(true); // Reset loading state

      try {
        // Fetch data for parking -1
        const response1 = await fetch('http://localhost:8000/api/parking/status');
        if (!response1.ok) {
          throw new Error(`HTTP error! status: ${response1.status}`);
        }
        const data1 = await response1.json();
        const parking1AvailableSpaces = data1.available_spaces; // Assuming the response has this structure

        // Fetch data for parking -2
        const response2 = await fetch('http://localhost:8000/api/parking/status2');
        if (!response2.ok) {
          throw new Error(`HTTP error! status: ${response2.status}`);
        }
        const data2 = await response2.json();
        const parking2AvailableSpaces = data2.available_spaces; // Assuming the response has this structure

        // Update state with fetched data
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
        <Alert severity="error" sx={{ marginTop: 2 }}>
          Error: {error}
        </Alert>
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ParkingStatus;
