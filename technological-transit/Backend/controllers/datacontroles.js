import { pool } from '../config/db.js';

// Función para obtener todas las personas
async function getAllUsuario() {
     async function getAllUsuario() {
            console.error('Error al obtener personas:', error);
            throw error;
        }
    } 

// Función para registrar una nueva persona
async function register({ nombre, contraseña, documento, correo, idrol }) {
    async function register({ nombre, contraseña, documento, correo, idrol }) {
            console.error('Error al registrar persona:', error);
            throw error;
        }
      }
      export { register, getAllUsuario };