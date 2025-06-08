import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './ExerciseTable.css'
import { Grow } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function ExerciseTable({ day,  exercises}) {
    const Item = ({ children }) => (
  <Paper sx={{ padding: 1, textAlign: 'center', backgroundColor: '#202020', minHeight:'100%'}}>
    {children}
  </Paper>
);
  return (
    <Box sx={{ flexGrow: 1, padding: '5px', marginBottom: '10px' }}>
  <Grid container spacing={2} columns={{ xs: 2, sm: 2, md: 12 }}>
    <Grid size={12} style={{ border:'2px solid #ffffff67'}}>
      <Item>
        <span className='title'>{day}</span>
      </Item>
    </Grid>
    {exercises.map((el, index) => (
    <>
      <Grid size={{ xs: 2, sm: 4, md: Grow }} style={{border:'5px solid #ffffff67', height: '100%', backgroundColor: '#202020', marginLeft:'auto', marginRight:'auto', marginTop:'20px'}}>
        <Item key={index} >
          <h1>{el.name}</h1>
          <p><span className='title'>Musculo principal: </span></p><h2>{el.muscle}</h2>
          <p><span className='title'>Músculos involucrados: </span></p>
          <ul className='list'>
              {el.musclesInvolved ? el.musclesInvolved.map((muscle, idx) => (
                <li key={idx}>{muscle}</li>
              )) : ''}
            </ul>
          <p><span className='title'>Equipamiento: </span>
          </p>
          <ul className='list'>
              {el.equipment.map((equip, idx) => (
                <li key={idx}>{equip}</li>
              ))}
            </ul>
          <img 
            className='exerciseImage'
            src={`http://127.0.01:3000/api/file/image/exercise/${el.image}`}
            alt={el.name}
            style={{ maxWidth: '100%' }}
          />
          <div style={{display: 'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'end', margin:'0px'}}>
          <Accordion style={{backgroundColor: '#0000007b'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color:'#f5c518'}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          
        >
          <p component="span" >Posición inicial:</p>
        </AccordionSummary>
        <AccordionDetails style={{backgroundColor: '##0000007b', margin:'auto'}}>
          {el.position}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: '#0000007b', margin:'auto'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color:'#f5c518'}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p component="span">Ejecución:</p>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
          {el.execution.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      </div>
        </Item>
      </Grid>
      </>
    ))}
  </Grid>
</Box>
  );
}