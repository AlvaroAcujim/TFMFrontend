import {React, useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './ExerciseTable.css'
import { Grow } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchTableImages } from '../features/exerciseTable/exerciseTableSlice';
import { useSelector, useDispatch } from 'react-redux';
export default function ExerciseTable({ day,  exercises , tableId}) {
  
    const Item = ({ children }) => (
  <Paper sx={{ padding: 1, textAlign: 'center', backgroundColor: '#202020', minHeight:'100%'}}>
    {children}
  </Paper>
);
const EMPTY_ARRAY = [];
 const dispatch = useDispatch();
 const allExercises = useSelector((state) => state.exercise.allExercises || []);
  const tableImages = useSelector((state) => state.exerciseTable.tableImages[tableId] || EMPTY_ARRAY );
  useEffect(() => {
    if (tableImages.length === 0) {
    dispatch(fetchTableImages(tableId));
  }
  }, [dispatch, tableId, tableImages.length]);
  
  return (
    <Box sx={{ flexGrow: 1, padding: '5px', marginBottom: '10px', fontSize:'0.8rem' }}>
  <Grid container spacing={2} columns={{ xs: 2, sm: 2, md: 12 }}>
    <Grid size={12} style={{ border:'2px solid #ffffff67'}}>
      <Item>
        <span className='title'>{day}</span>
      </Item>
    </Grid>
    {exercises.map((el, index) => {
          const foundImage = tableImages.find(img => img.name === el.name);
          let imageUrl = '';
          if (foundImage) {
          imageUrl = foundImage.image;
        } else {
          const fallbackExercise = allExercises.find(ex => ex.name === el.name);
          imageUrl = fallbackExercise ? fallbackExercise.imageUrl : '';
        }
          return (
    <>
      <Grid key={index} size={{ xs: 1, sm: 4, md: 4, lg: 2 }} style={{border:'5px solid #ffffff67', height: '100%', backgroundColor: '#202020', marginLeft:'auto', marginRight:'auto', marginTop:'20px'}}>
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
              { el.equipment && el.equipment.map((equip, idx) => (
                <li key={idx}>{equip}</li>
              ))}
            </ul>
          <LazyLoadImage 
          className='exerciseImage'
            effect="blur"
            src={imageUrl ? imageUrl : el.image}
            alt={el.name}
            style={{ maxWidth: '100%' }}
          />
          <div style={{display: 'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'end', margin:'0px'}}>
          <Accordion style={{backgroundColor: '#0000007b', minWidth:'100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color:'#f5c518'}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
        
        >
          <p component="span">Posición inicial:</p>
        </AccordionSummary>
        <AccordionDetails style={{backgroundColor: '##0000007b', margin:'auto'}}>
          {el.position}
        </AccordionDetails>
      </Accordion>
      {el.execution && <Accordion style={{backgroundColor: '#0000007b', margin:'auto'}}>
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
      </Accordion>}
      </div>
        </Item>
      </Grid>
      </>
    )})}
  </Grid>
</Box>
  );
}