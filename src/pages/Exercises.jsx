import React from 'react'
import TitleGrowEffect from "../components/TitleGrowEffect.jsx";
import { useSelector } from 'react-redux';
import PlanButton from '../components/PlanButton.jsx';
import './Exercise.css'
import { useEffect } from 'react';
import ExerciseTable from '../components/ExerciseTable.jsx';
const Exercises = () => {
    let user = useSelector((state) => state.auth.user);
    let tableUser = useSelector((state) => state.auth.exerciseTable)
    if(user === null) user = '';
    console.log(tableUser)
    useEffect(() => {
  console.log('Tabla de ejercicios:', tableUser);
}, [tableUser]);
  return (
    <>
    <section className='main_container'>
      <article>
        {tableUser && tableUser.map((el) => {
          return(<ExerciseTable key={el._id} tableName={el.name} exercises={el.exercises}/>)
        })}
      </article>
    <article>
    <TitleGrowEffect 
     title={`Bienvenido ${user.username ? user.username : 'nuevo usuario'}`}
            height={"40vh"}
            marginBotMD={"-40px"}
            marginBotxs={"-40px"}
            marginBotSM={"-40px"}
            marginBotLG={"-40px"}
            marginBotXL={"-40px"}
            fontSize={"3rem"}/>
    {user ? <h3>En este apartado tienes diversas elecciones para establecer tu rútina de ejercicios.</h3> : <h3 style={{color: '#ff0000', fontSize: '2rem', backgroundColor: '#000000'}}>Para utilizar las funcionalidad de la página es necesario crearse una cuenta</h3>}
    <h3>Porfavor seleccione una de las dos opciones:</h3>
    </article>
    <article className=''>
    <PlanButton/>
    </article>
    <article>

    </article>
    </section>
    </>

  )
}
export default Exercises;
