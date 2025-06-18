import { useState } from 'react';
import axios from 'axios';

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://tfmbackend-mr4r.onrender.com/api/users/register', userData);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error en el registro');
      return null;
    }
  };

  return { register, loading, error };
};

export default useRegisterUser;