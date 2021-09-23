import { 
    TIPO_UNIDAD, 
    TIPO_CIVILIZACION, 
    CANTIDAD_UNIDADES, 
    MONEDAS_INICIAL, 
    COSTOS_ENTRENAMIENTO , 
    COSTOS_TRANSFORMACION,
    RESULTADOS_BATALLA
} from './parametros.js';
import Unidad from './Unidad.js';

var idUnico = 0;

export default class Ejercito {
    id; // Simplemente para identificarlos cuando hacemos un console
    monedas;
    civilizacion;
    batallas = [];  // Historial
    unidades = [];  

    constructor(civilizacion) {
        switch (civilizacion) {
            case TIPO_CIVILIZACION.Chinos:
                this.agregarUnidades(CANTIDAD_UNIDADES.Chinos[0], CANTIDAD_UNIDADES.Chinos[1], CANTIDAD_UNIDADES.Chinos[2]);               
                break;
            case TIPO_CIVILIZACION.Ingleses:
                this.agregarUnidades(CANTIDAD_UNIDADES.Ingleses[0], CANTIDAD_UNIDADES.Ingleses[1], CANTIDAD_UNIDADES.Ingleses[2]);    
                break;
            case TIPO_CIVILIZACION.Bizantinos:
                this.agregarUnidades(CANTIDAD_UNIDADES.Bizantinos[0], CANTIDAD_UNIDADES.Bizantinos[1], CANTIDAD_UNIDADES.Bizantinos[2]);    
                break;
            default:
                console.log('El tipo de civilizacion ingresado (', civilizacion, ') es inválido');
                return;
        }
        this.id = idUnico;
        idUnico = idUnico + 1;
        this.civilizacion = civilizacion;
        this.monedas = MONEDAS_INICIAL;
        console.log('Se creó el ejercito', this.id, 'de civilizacion', this.civilizacion);
    }

    agregarUnidades = (cantidadPiqueros, cantidadArqueros, cantidadaballeros) => {
        for (let i = 0; i < cantidadPiqueros; i++) {
            this.unidades.push(new Unidad(TIPO_UNIDAD.Piquero));
        }
        for (let i = 0; i < cantidadArqueros; i++) {
            this.unidades.push(new Unidad(TIPO_UNIDAD.Arquero));
        }
        for (let i = 0; i < cantidadaballeros; i++) {
            this.unidades.push(new Unidad(TIPO_UNIDAD.Caballero));
        }
    }
  
    // Solo para uso de debug
    mostrar = () => {
        console.log('El ejército', this.id, 'posee', this.monedas, 'monedas,', this.unidades.length, 'unidades y', this.obtenerPuntaje(), 'puntos');
    }

    obtenerPuntaje = () => {
        let puntaje = 0;
        for (let i = 0; i < this.unidades.length; i++) {
            puntaje += this.unidades[i].puntosFuerza;
        }
        return puntaje;
    }

    entrenarUnidades = (tipo) => {
        const { costoMonedas, unidadesInvolucradas } = this.calcularCostos(tipo, null);

        // Si el costo es menor, se realiza el entrenamiento
        if (this.monedas >= costoMonedas) {
            for (let i = 0; i < unidadesInvolucradas.length; i++) { // Este nuevo bucle solo entrenara las unidades involucradas
                unidadesInvolucradas[i].entrenar();            
            }
            this.monedas -= costoMonedas;
            console.log('Entrenamiento finalizado, monedas restantes', this.monedas);
        }
        else {
            console.log('Monedas insuficientes para este entrenamiento. Posee', this.monedas, 'necesitas', costoMonedas);
        }
    }    

    transformarUnidades = (tipoOrigen, tipoDestino) => {
        //Valido los tipos de origen y destino
        if ((tipoOrigen == TIPO_UNIDAD.Piquero && tipoDestino == TIPO_UNIDAD.Arquero) || (tipoOrigen == TIPO_UNIDAD.Arquero && tipoDestino == TIPO_UNIDAD.Caballero)) {
            const { costoMonedas, unidadesInvolucradas } = this.calcularCostos(tipoOrigen, tipoDestino);

            // Si el costo es menor, se realiza la transformación
            if (this.monedas >= costoMonedas) {
                for (let i = 0; i < unidadesInvolucradas.length; i++) {    // Este nuevo bucle solo transformará las unidades involucradas
                    unidadesInvolucradas[i].transformar(tipoDestino);            
                }
                this.monedas -= costoMonedas;
                console.log('Transformación finalizada, monedas restantes', this.monedas);
            }
            else {
                console.log('Monedas insuficientes para esta transformación. Posee', this.monedas, 'necesitas', costoMonedas);
            }
            return;
        }
        console.log('No es posible transformar un (', tipoOrigen, ') a un (', tipoDestino, '), o los tipos de unidad ingresados no son válidos');
    }

    // Calcula el costo de entrenar como de transformar
    calcularCostos = (tipoOrigen, tipoDestino) => {
        let costoMonedas = 0;
        let unidadesInvolucradas = [];  // Aprovechamos el bucle para obtener las unidades involucradas en el entrenamiento o transformación
        if (tipoDestino) {  // Si hay destino, se trata de una transformación
            for (let i = 0; i < this.unidades.length; i++) {
                if (this.unidades[i].tipo == tipoOrigen) {             
                    costoMonedas +=  COSTOS_TRANSFORMACION[tipoDestino];
                    unidadesInvolucradas.push(this.unidades[i]);
                }
            }
        }
        else {  // Si no hay destino, se trata de un entrenamiento
            for (let i = 0; i < this.unidades.length; i++) {
                if (this.unidades[i].tipo == tipoOrigen) {             
                    costoMonedas +=  COSTOS_ENTRENAMIENTO[tipoOrigen];
                    unidadesInvolucradas.push(this.unidades[i]);
                }
            }
        }
        return { costoMonedas, unidadesInvolucradas };
    }

    // Elimina la mejor unidad (la que posee más puntos de fuerza, si hay más de una, elimina la primera)
    eliminarMejorUnidad = () => {
        let mejorPuntosFuerza = 0;
        let index = 0;

        for (let i = 0; i < this.unidades.length; i++) {
            if (mejorPuntosFuerza < this.unidades[i].puntosFuerza) {
                mejorPuntosFuerza = this.unidades[i].puntosFuerza;
                index = i;
            }
        }
        this.unidades.splice(index, 1);
    }

    mostrarHistorial = () => {
        console.log('Historial de Batallas para ejercito', this.id);
        for (let i = 0; i < this.batallas.length; i++) {
            if(this.id == this.batallas[i].ejercito1.id) {  // Es ejercito1
                console.log('* Batalla', this.batallas[i].id, ', contra ejercito', this.batallas[i].ejercito2.id, ', resultado:', this.batallas[i].resultado);
            }
            else { // Es ejercito2
                // El resultado siempre es en relacion a ejercito1
                if (this.batallas[i].resultado == RESULTADOS_BATALLA.Empate) {
                    console.log('* Batalla', this.batallas[i].id, ', contra ejercito', this.batallas[i].ejercito1.id, ', resultado:', this.batallas[i].resultado);
                }
                else { 
                    if (this.batallas[i].resultado == RESULTADOS_BATALLA.Victoria) { // Si el resultado es Victoria para Ejercito1, será Derrota para Ejercito2 
                        console.log('* Batalla', this.batallas[i].id, ', contra ejercito', this.batallas[i].ejercito1.id, ', resultado:', RESULTADOS_BATALLA.Derrota);
                    }
                    else { // Viceversa
                        console.log('* Batalla', this.batallas[i].id, 'contra ejercito', this.batallas[i].ejercito1.id, ', resultado:', RESULTADOS_BATALLA.Victoria);
                    }
                }
            }
        }
    }
  }

