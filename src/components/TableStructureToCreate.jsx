import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

const TableStructureToCreate = ({ tableToCreate, setTableToCreate  }) => {
  const handleDelete = (day, exerciseId) => {
    const updatedDayExercises = tableToCreate[day].filter(ex => ex._id !== exerciseId);
    const updatedTable = {
      ...tableToCreate,
      [day]: updatedDayExercises
    };
    setTableToCreate(updatedTable);
  };
  return (
    <>
      {daysOfWeek.map(day => (
        <Accordion key={day} style={{backgroundColor: '#0000007b', margin: 'auto'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#f5c518' }} />}
            aria-controls={`${day}-content`}
            id={`${day}-header`}
          >
            <p>{day}</p>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: '#0000007b', margin: 'auto' }}>
            {tableToCreate[day]?.length > 0 ? (
              <ul style={{display:'flex', flexDirection:'column'}}>
                {tableToCreate[day].map(exercise => (
                  <li key={exercise._id}>
                    {exercise.name} - {exercise.muscle}
                    <IconButton
                      onClick={() => handleDelete(day, exercise._id)}
                      aria-label="delete"
                      size="small"
                      sx={{ color: '#f44336' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay ejercicios asignados.</p>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default TableStructureToCreate;