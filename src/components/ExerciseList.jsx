import {React } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#202020',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
}));
const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

const ExerciseList = (({ exercises, tableToCreate, setTableToCreate }) => {

  const isExerciseInDay = (exerciseId, day) => {
    return tableToCreate[day]?.some(e => e._id === exerciseId);
  };

  const toggleExerciseInDay = (exercise, day) => {
    setTableToCreate(prev => {
      const dayExercises = prev[day] || [];
      const exists = dayExercises.find(e => e._id === exercise._id);

      let newDayExercises;
      if (exists) {
        // Quitar ejercicio del día
        newDayExercises = dayExercises.filter(e => e._id !== exercise._id);
      } else {
        // Añadir ejercicio al día
        newDayExercises = [...dayExercises, exercise];
      }
      
      return {
        ...prev,
        [day]: newDayExercises,
      };
    });
  };

  return (
    <>
      {exercises.map((exercise) => (
        <Item key={exercise._id}>
          <p>{exercise.name} - {exercise.muscle}</p>
          <LazyLoadImage
            className='exerciseImage'
            effect="blur"
            src={`http://127.0.0.1:3000/api/file/image/exercise/${exercise.image}`}
            alt={exercise.name}
            style={{ maxWidth: '100%' }}
          />
          <Stack spacing={1} direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {daysOfWeek.map(day => (
              <Button
                key={day}
                variant={isExerciseInDay(exercise._id, day) ? "outlined" : "text"}
                onClick={() => toggleExerciseInDay(exercise, day)}
              >
                {day}
              </Button>
            ))}
          </Stack>
        </Item>
      ))}
    </>
  );
});

export default ExerciseList;