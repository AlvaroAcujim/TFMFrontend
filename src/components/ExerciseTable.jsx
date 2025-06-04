import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './ExerciseTable.css'
export default function ExerciseTable({tableName , exercises}) {
    const Item = ({ children }) => (
  <Paper sx={{ padding: 1, textAlign: 'center', backgroundColor: '#202020' }}>
    {children}
  </Paper>
);
  return (
    <Box sx={{ flexGrow: 1 , padding: '5px', marginBottom: '10px'}}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Item><span className='title'>Nombre de la tabla:</span> <h2>{tableName}</h2></Item>
        </Grid>
        {exercises.map((el, index) => {
            return (
                <>
                <Grid size={12} >
          <Item><h1>{el.name}</h1></Item>
        </Grid>
        <Grid size={6}>
          <Item><span className='title'>Musculo principal: </span> <h3>{el.muscle}</h3></Item>
        </Grid>
        <Grid size={6}>
          <Item><span className='title'>Musculos involucrados: </span> <ul className='list'>{el.musclesInvolved.map(el => {return <li>{el}</li>})}</ul></Item>
        </Grid>
        <Grid size={12}>
          <Item><span className='title'>Equipamiento: </span> <ul className='list'>{el.equipment.map(el => {return <li>{el}</li>})}</ul></Item>
        </Grid>
        
        <Grid size={12}>
          <Item><img className='exerciseImage' src={`http://127.0.01:3000/api/file/image/exercise/${el.image}`}></img></Item>
        </Grid>
        <Grid size={12}>
          <Item><span className='title'>Posición inicial: </span>
            <ul className='list'>
                <li>{el.position}</li>
            </ul>
          </Item>
        </Grid>
        <Grid size={12}>
          <Item><span className='title'>Ejecución: </span>
            <ul className='list'>
                {el.execution.map(el => {return <li>{el}</li>})}
            </ul>
          </Item>
        </Grid>
                <span className='separator'></span>
        </>
            )
        })}
      </Grid>
    </Box>
  );
}