import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

const TableStructureToCreate = ({ tableToCreate }) => {
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