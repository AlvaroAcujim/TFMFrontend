import React from 'react'
import './TitleGrowEffect.css'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const TitleGrowEffect = ({title, height, marginBotMD, marginBotxs, marginBotSM, marginBotLG, marginBotXL, fontSize}) => {
  return (
    <Box className='main__title' 
    component={"article"}
    sx={{
        minHeight: height,
        marginBottom: {
          xs: marginBotxs,
          sm: marginBotSM, 
          md: marginBotMD,
          lg: marginBotLG,
          xl: marginBotXL
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        
      }}>
       <Typography
        variant="h2"
        sx={{
          fontSize: {
            xs: '1.2rem',
            sm: '2rem',
            md: fontSize
          },
          fontWeight: 'bold',
          textAlign: 'center',
          
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
export default TitleGrowEffect;
