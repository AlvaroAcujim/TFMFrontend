# 🏋️‍♂️ GymPlanner - App MERN de Tablas de Ejercicio

**GymPlanner** es una aplicación web desarrollada con el stack MERN (MongoDB, Express.js, React, Node.js) que permite a los usuarios registrarse, iniciar sesión y crear tablas personalizadas de ejercicios de gimnasio. Los usuarios pueden construir sus rutinas de forma **manual** o con **asistencia de inteligencia artificial**, organizando los ejercicios por días de la semana.

---

## 🚀 Características principales

- 🔐 **Autenticación de usuarios**
  - Registro y login con JWT.
  - Roles de usuario para controlar accesos (usuario/admin).

- 🧠 **Generación de tablas con IA**
  - Opción de creación automática de rutinas usando IA según nivel y objetivo.

- 🧱 **Creación manual de rutinas**
  - Selección de ejercicios por músculo, dificultad y objetivo.
  - Organización de ejercicios por días de lunes a viernes.

- ✏️ **Gestión de tablas**
  - Edición y eliminación de ejercicios dentro de la tabla.
  - Añadir nuevos ejercicios a cualquier día.

- 📅 **Interfaz intuitiva**
  - Selección clara de días y ejercicios.

---

## 🧩 Tecnologías utilizadas

### 📦 Backend
- **Node.js** con **Express.js**
- **MongoDB** con **Mongoose**
- **JWT** para autenticación
- **multer** 
- Arquitectura modular: `models`, `controllers`, `routes`, `services`

### 💻 Frontend
- **React**
- **React Router**
- **React Navigation**
- **Yup**
- **reduxjs toolkit**
- **React-redux**
- **React Hook Form** para formularios
- **CSS y libreria de componentes MUI**
- Comunicación con backend vía `axios`

---

## 📁 Estructura del proyecto
