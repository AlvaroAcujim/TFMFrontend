import * as yup from 'yup';

const searchSchema = yup.object().shape({
  exerciseName: yup
    .string()
    .required('Introduce un nombre')
    .min(2, 'Debe tener al menos 2 caracteres'),
});
export default searchSchema;