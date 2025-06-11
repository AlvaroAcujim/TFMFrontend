import React from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import { useInView } from 'react-intersection-observer';
import './GrowCarts.css'

const GrowCarts = ({carts}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,       
    triggerOnce: true      
  });

  const card = (key, title, delay, description, icon) => (
    <Grow in={inView} timeout={delay} key={key} >
      <article className='cart'>
        {icon}
        <h2>{title}</h2>
        <h4>{description}</h4>
      </article>
    </Grow>
  );

  return (
    <Box ref={ref} component={"section"} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '48px'} }>
      {
      carts.map((el, index) => {
        return card(index, el.title, el.delay, el.description, el.icon)
      })
      }
    </Box>
  );
};

export default GrowCarts;