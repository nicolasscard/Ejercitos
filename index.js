import { TIPO_UNIDAD, TIPO_CIVILIZACION } from './parametros.js';
import Ejercito from './Ejercito.js';
import Batalla from './Batalla.js';

// PRUEBA COMPLETA

//Creo ejercitos
const ejercito1 = new Ejercito(TIPO_CIVILIZACION.Chinos);
const ejercito2 = new Ejercito(TIPO_CIVILIZACION.Ingleses);
const ejercito3 = new Ejercito(TIPO_CIVILIZACION.Bizantinos);

ejercito1.mostrar();
ejercito2.mostrar();
ejercito3.mostrar();

//Creo batalla sin entrenamientos ni transformaciones
const batalla1 = new Batalla(ejercito1, ejercito2);
batalla1.mostrar();
ejercito1.mostrar();
ejercito2.mostrar();

//Hago transformaciones
ejercito1.transformarUnidades(TIPO_UNIDAD.Arquero, TIPO_UNIDAD.Caballero);
ejercito1.mostrar();

//Hago entrenamientos
ejercito2.entrenarUnidades(TIPO_UNIDAD.Piquero);
ejercito2.entrenarUnidades(TIPO_UNIDAD.Arquero);
ejercito2.mostrar();

//Revancha entre ejercito1 y ejercito2 (despues de sus respectivos entrenamientos y transformaciones)
const batalla2 = new Batalla(ejercito1, ejercito2);
batalla2.mostrar();
ejercito1.mostrar();
ejercito2.mostrar();

// Ganador batalla contra ejercito3
const batalla3 = new Batalla(ejercito1, ejercito3);
batalla3.mostrar();
ejercito1.mostrar();
ejercito3.mostrar();

//Mostramos historial de todos los ejercitos
ejercito1.mostrarHistorial();
ejercito2.mostrarHistorial();
ejercito3.mostrarHistorial();

