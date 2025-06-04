import React from 'react'
import './NavBar.css'
import logo from '../assets/tableFitLogo.jpg'
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <div>
        <img src={logo} alt='Logo from tablefit' className='logo'></img>
        <ul>
            <li>
                <Tooltip title="Home">
                    <Link to="/"><HomeFilledIcon sx={{ fontSize: 40, color: '#d2a119' }}/></Link>
                </Tooltip>
                    </li>
            <li>
                <Tooltip title="login">
                    <Link to="/login"><PersonIcon sx={{ fontSize: 40, color: '#d2a119' }}/> </Link>
                </Tooltip>
            </li>
            <li>
                <Tooltip title="Exercise Table">
                    <Link to="/exercises"><FitnessCenterIcon sx={{ fontSize: 40, color: '#d2a119' }}/></Link>
                </Tooltip>
            </li>
        </ul>
    </div>
  )
}
export default NavBar;