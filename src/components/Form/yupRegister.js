import * as yup from 'yup';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  username: yup.string().required('El nombre de usuario es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup
  .string()
  .matches(
      passwordRegex,
      'Debe contener mínimo, 6 caracteres, una mayúscula y un numero',
    )
  .required('La contraseña es obligatoria'),
});
export default schema;