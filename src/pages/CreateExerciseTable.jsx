import {React, useEffect, useState, useMemo} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch  } from 'react-redux';
import { fetchExercisesWithImages } from '../features/exercise/exerciseSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ExerciseList from '../components/ExerciseList';
import TableStructureToCreate from '../components/TableStructureToCreate';
import { createExerciseTable, updateExerciseTable } from '../features/exerciseTable/exerciseTableSlice';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { clearEditingTable } from '../features/exerciseTable/exerciseTableSlice';
export const CreateExerciseTable = () => {
  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#020202',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
}));
 const location = useLocation();
  const requiredGym = location.state?.requiredGym ?? false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editingTable = useSelector((state) => state.exerciseTable.editingTable);
  const { exercises } = useSelector((state) => state.exercise);
  const [searchName, setSearchName] = useState('');
const { register: registerSearch, handleSubmit: handleSearchSubmit } = useForm();
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [tableToCreate, setTableToCreate] = useState({
    Lunes: [],
    Martes: [],
    Miercoles: [],
    Jueves: [],
    Viernes: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit } = useForm();
  const itemsPerPage = 10;

  
  useEffect(() => {
    if (editingTable) {
      // Transformar la tabla editada al formato de tableToCreate
      const newTable = { ...tableToCreate };
      editingTable.exercisesByDay.forEach(dayObj => {
        const dayName = capitalizeFirstLetter(dayObj.day.toLowerCase());
        newTable[dayName] = dayObj.exercises;
      });
      setTableToCreate(newTable);
    }
  }, [editingTable, dispatch]);
  
  useEffect(() => {
     if (requiredGym !== undefined) {
    dispatch(fetchExercisesWithImages(requiredGym));
  } else {
    dispatch(fetchExercisesWithImages());
  }
  }, [dispatch, requiredGym]);
  
  const capitalizeFirstLetter = (str) => {
    const daysMap = {
      lunes: 'Lunes',
      martes: 'Martes',
      miercoles: 'Miercoles',
      miércoles: 'Miercoles',
      jueves: 'Jueves',
      viernes: 'Viernes'
    };
    return daysMap[str.toLowerCase()] || str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
    const matchMuscle = selectedMuscle && selectedMuscle !== 'Todos'
      ? exercise.muscle === selectedMuscle
      : true;
    const matchName = searchName
      ? exercise.name.toLowerCase().includes(searchName.toLowerCase())
      : true;

    return matchMuscle && matchName;
     });
  }, [exercises, selectedMuscle, searchName]);

   const exercisesByDay = useMemo(() => {
    return Object.entries(tableToCreate).map(([day, exercises]) => ({
      day,
      exercises: exercises.map(ex => ex._id)
    }));
  }, [tableToCreate]);
  useEffect(() => {
    console.log('exercisesByDay:', exercisesByDay);
  }, [exercisesByDay]);

  const paginatedExercises = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExercises.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredExercises, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleMuscleChange = (e) => {
    setSelectedMuscle(e.target.value);
    setCurrentPage(1);
  };
  const handleSearchByName = (data) => {
  setSearchName(data.exerciseName);
  setCurrentPage(1); // Resetear la paginación al buscar
};
 const onSubmit = async(data) => {
  if (!data.tableName) {
    alert('Escriba un nombre');
    return;
  }

  const payload = {
    name: data.tableName,
    exercisesByDay,
  };

  try {
    if (editingTable && editingTable._id) {
      await dispatch(updateExerciseTable({
        tableId: editingTable._id,
        name: data.tableName,               
        updatedExercisesByDay: exercisesByDay
      })).unwrap();
    } else {
      await dispatch(createExerciseTable(payload)).unwrap();
    }
    dispatch(clearEditingTable()); 
    navigate('/exercises');
  } catch (error) {
    alert('Error al guardar la tabla: ' + error);
  }

};


  return (
    <>
    <section className='main_container'>
      <div>
      <article>
         <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{xs:12, md:2}} style={{backgroundColor:'#1f1f1f', minHeight:'400px'}}>
          <Item sx={{ minHeight: '100%', boxSizing: 'border-box' }}>
            <h2>Tu tabla:</h2>
            <TableStructureToCreate tableToCreate={tableToCreate} setTableToCreate={setTableToCreate} />
            <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      label="Nombre de la tabla"
      {...register("tableName", { required: true })}
      fullWidth
      sx={{ input: { color: 'white' } }}
    />
    <Button type="submit" style={{color: '#f5c518'}}>{'Guardar tabla'}</Button>
  </form>
            </Item>
        </Grid>
        <Grid size={{xs:12, md:10}}>
          <Stack spacing={2}>
            <Item>
              <label htmlFor="muscle-select">Filtrar por grupo muscular:</label>
          <Select
          id="muscle-select"
          value={selectedMuscle}
          onChange={handleMuscleChange}
          autoWidth
          label=""
          sx={{
        backgroundColor: "#f5c518",
        color: "black",
        "& .MuiSelect-icon": { color: "black" }, 
        marginLeft: '10px'
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: "black",
            color: "white",
          },
        },
      }}
        >
          <MenuItem sx={{backgroundColor:"black"}} value="Todos">Todos</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Piernas">Piernas</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Pectorales">Pectorales</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Espalda">Espalda</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Bíceps">Bíceps</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Tríceps">Tríceps</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Abdominales">Abdominales</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Hombros">Hombros</MenuItem>
          <MenuItem sx={{backgroundColor:"black"}} value="Gemelos">Gemelos</MenuItem>
        </Select>
            </Item>
            <Item>
              <label htmlFor="muscle-select">Filtrar Nombre:</label>
              <form onSubmit={handleSearchSubmit(handleSearchByName)} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
    <TextField
      id="exercise-search"
      label="Nombre del ejercicio"
      {...registerSearch("exerciseName")}
      fullWidth
      inputProps={{
    list: 'exercise-names',
    style: { textAlign: 'center', color: 'white' }
  }}
      sx={{ input: { color: 'white', textAlign: 'center' } }}
    />
    <datalist id="exercise-names">
      {
      exercises.map((exercise) => (
        <option key={exercise._id} value={exercise.name} />
      ))}
    </datalist>
    <Button type="submit" style={{ color: '#f5c518' }}>Buscar</Button>
  </form>
            </Item>
             <ExerciseList exercises={paginatedExercises} tableToCreate={tableToCreate} setTableToCreate={setTableToCreate}/>
                    <Item sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Anterior
                      </button>
                      <span>Página {currentPage} de {totalPages}</span>
                      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Siguiente
                      </button>
                    </Item>

          </Stack>
        </Grid>
        
      </Grid>
    </Box>
      </article>
      </div>
    </section>
    </>
  )
}
export default CreateExerciseTable