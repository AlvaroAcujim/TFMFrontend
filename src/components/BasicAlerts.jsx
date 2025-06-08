import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

export function BasicAlerts({text, show}) {
  return (
    <Slide direction="left" in={show} mountOnEnter unmountOnExit timeout={1300}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          width: 'auto'
        }}
      >
        <Stack spacing={2}>
          <Alert severity="success" style={{ backgroundColor: '#202020', color: 'white', border: '2px solid #ffffff67' }}>
            {text}
          </Alert>
        </Stack>
      </Box>
    </Slide>
  );
}
export default BasicAlerts;