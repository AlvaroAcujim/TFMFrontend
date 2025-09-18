import React from 'react'
import GrowCarts from '../components/GrowCarts';
import './home.css';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TitleGrowEffect from '../components/TitleGrowEffect';
import PlanButton from '../components/PlanButton';
import { useSelector  } from 'react-redux';

const Home = () => {
   const user = useSelector((state) => state.auth.user) || '';
  return (
    <section>
    <TitleGrowEffect title={"Excuses don't burn calories"} height={'70vh'} marginBotMD={'300px'} marginBotxs={'180px'} marginBotSM={'270px'} marginBotLG={'500px'} marginBotXL={'-80px'} fontSize={'3rem'}/>
      <GrowCarts carts={[
        {title: 'Asesoramiento',
          delay: 1000,
          description: 'Disponemos de un equipo completo de personal capacitado para ayudarte tanto en la alimentación como para prepararte una tabla de ejercicios.',
          icon: <PersonSearchIcon sx={{ fontSize: 40, color: '#d2a119' }}></PersonSearchIcon>
        },
        {title: 'Tablas dinámicas',
          delay: 2000,
          description: 'Ofrecemos a nuestros usuarios un creador de tablas. Tanto para miembros que deseen entrenar en casa como en el gimnasio.',
          icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#d2a119' }}></FitnessCenterIcon>
        },
        {title: '¿Equipo en casa?',
          delay: 3000,
          description: 'Si dispones del equipo necesario para hacer ejercicio en casa, esta es tu página. ¡Puedes acceder a la sección de ejercicios en casa y filtrar por el equipamiento que dispongas!',
          icon: <MapsHomeWorkIcon sx={{ fontSize: 40, color: '#d2a119' }}></MapsHomeWorkIcon>
        },
        {title: 'Elección libre',
          delay: 4000,
          description: '¿Hay ejercicios que te llaman más que otros? Puedes seleccionar únicamente los ejercicios que te interesan hacer o con los que te sientas más cómodo.',
          icon: <SelfImprovementIcon sx={{ fontSize: 40, color: '#d2a119' }}></SelfImprovementIcon>
        }
      ]}/>
      {user && <TitleGrowEffect title={"SELECCIONE SU PLAN"} height={'20vh'}  marginBotMD={'0px'} marginBotxs={'0px'} marginBotSM={'0px'} marginBotLG={'0px'} fontSize={'2rem'}/>}
      {user ? <PlanButton/> : <TitleGrowEffect title={"¿ES SU PRIMERA VEZ? CREASE UNA CUENTA EN LA PARTE SUPERIOR DE LA PÁGINA Y UTILICE NUESTRA FUNCIONALIDAD PRINCIPAL CON EL ICONO: "} height={'20vh'}  marginBotMD={'0px'} marginBotxs={'0px'} marginBotSM={'0px'} marginBotLG={'0px'} fontSize={'2rem'} icon={<FitnessCenterIcon sx={{ fontSize: 40, color: '#d2a119' }}/>}/>}
      
    </section>
  )
}
export default Home;