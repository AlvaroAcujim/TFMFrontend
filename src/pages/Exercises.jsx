import React from 'react'
import TitleGrowEffect from "../components/TitleGrowEffect.jsx";
import { useSelector, useDispatch  } from 'react-redux';
import PlanButton from '../components/PlanButton.jsx';
import './Exercise.css'
import { useEffect } from 'react';
import ExerciseTable from '../components/ExerciseTable.jsx';
import { DeleteAndModifyButton } from '../components/DeleteAndModifyButton.jsx';
import Stack from '@mui/material/Stack';
import  {fetchUserExerciseTable}  from '../features/exerciseTable/exerciseTableSlice.js';
import {deleteTable} from '../features/exerciseTable/exerciseTableSlice.js';
import { useState } from 'react';
import BasicAlerts from '../components/BasicAlerts.jsx';
import { useNavigate } from 'react-router-dom';
import { setEditingTable, fetchTableImages } from '../features/exerciseTable/exerciseTableSlice.js';
import PersonIcon from '@mui/icons-material/Person';
const Exercises = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user) || '';
  const tableUser = useSelector((state) => state.exerciseTable.exerciseTable);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchUserExerciseTable()).unwrap()
    .then((tables) => {
      if (tables && tables.length > 0) {
        tables.forEach((table) => {
          dispatch(fetchTableImages(table._id));
        });
      }
    });
  }, [dispatch]);

  const handleDelete = (_id) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar esta tabla? Esta acción no se puede deshacer.');
    if (!confirmed) return;
    dispatch(deleteTable(_id))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
  };

  const handleEdit = (table) => {
    dispatch(setEditingTable(table));
     navigate('/createExerciseTable');
  };

  let style = user ? '0px' : '500px';
  return (
    <>
    <section className='main_container' style={{marginBottom: style}}>
      {user ?  (<><article>
    <TitleGrowEffect 
     title={`Bienvenido ${user.username ? user.username : 'nuevo usuario'}`}
            height={"40vh"}
            marginBotMD={"-40px"}
            marginBotxs={"-40px"}
            marginBotSM={"-40px"}
            marginBotLG={"-40px"}
            marginBotXL={"-40px"}
            fontSize={"3rem"}/>
    {user ? <h3>En este apartado tienes diversas elecciones para establecer tu rútina de ejercicios.</h3> : <TitleGrowEffect title={"¿ES SU PRIMERA VEZ?\n CREASE UNA CUENTA EN LA PARTE SUPERIOR DE LA PÁGINA,\n PUEDE CREARLA PULSANDO EL SIGUIENTE ICONO: "} height={'20vh'}  marginBotMD={'0px'} marginBotxs={'0px'} marginBotSM={'0px'} marginBotLG={'0px'} fontSize={'2rem'} icon={<PersonIcon sx={{ fontSize: 40, color: '#d2a119' }}/>} />}
    <h3>Porfavor seleccione una de las dos opciones:</h3>
    </article>
    <article className='' style={{marginBottom:'30px'}}>
      <PlanButton />
    
    </article>
    <article>
      <TitleGrowEffect 
     title={`Tablas generadas`}
            height={"25vh"}
            marginBotMD={"-40px"}
            marginBotxs={"-40px"}
            marginBotSM={"-40px"}
            marginBotLG={"-40px"}
            marginBotXL={"-40px"}
            fontSize={"2rem"}/>
        {tableUser && tableUser.map((el) => (
  <div key={el._id} style={{ border:'2px solid #f5c518', padding: '10px', marginBottom: '15px' }}>
    <span className='title'>Nombre de la tabla:</span> 
    <h2>{el.name}</h2>
    {el.exercisesByDay && el.exercisesByDay.map(element => (
      (element.exercises.length > 0) && (
        <ExerciseTable 
          key={element._id} 
          tableId={el._id} 
          day={element.day} 
          exercises={element.exercises} 
        />
      )
    ))}
    <Stack spacing={2} component={"section"} direction={{ xs: 'column', md: 'row' } }>
    <DeleteAndModifyButton type={'delete'} color={'#ff0909'} onClick={()=>handleDelete(el._id)}/>
    <DeleteAndModifyButton type={'edit'} color={'#fffb09'} onClick={()=>handleEdit(el)}/>
    </Stack>
  </div>
))}
      </article>
  <BasicAlerts text={'¡Tabla eliminada con éxito!'} show={success}/></>): <TitleGrowEffect title={"¿ES SU PRIMERA VEZ?\n CREASE UNA CUENTA EN LA PARTE SUPERIOR DE LA PÁGINA,\n PUEDE CREARLA PULSANDO EL SIGUIENTE ICONO: "} height={'20vh'}  marginBotMD={'0px'} marginBotxs={'0px'} marginBotSM={'0px'} marginBotLG={'0px'} fontSize={'2rem'} icon={<PersonIcon sx={{ fontSize: 40, color: '#d2a119' }}/>} />}
    
    </section>
    </>

  )
}
export default Exercises;
