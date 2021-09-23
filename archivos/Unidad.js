import { TIPO_UNIDAD, PUNTOS_FUERZA_INICIAL, PUNTOS_FUERZA_ENTRENAMIENTO } from './parametros.js';
var idUnico = 0;

export default class Unidad {
    id; // Simplemente para identificarlos cuando hacemos un console
    tipo;
    puntosFuerza;

    constructor(tipo) {
        switch (tipo) {
            case TIPO_UNIDAD.Piquero:
                this.puntosFuerza = PUNTOS_FUERZA_INICIAL.Piquero;
                break;
            case TIPO_UNIDAD.Arquero:
                this.puntosFuerza = PUNTOS_FUERZA_INICIAL.Arquero;
                break;
            case TIPO_UNIDAD.Caballero:
                this.puntosFuerza = PUNTOS_FUERZA_INICIAL.Caballero;
                break;
            default:
                console.log('El tipo de unidad ingresado (', tipo, ') es inválido');
                return;
        }
        this.tipo = tipo;
        this.id = idUnico;
        idUnico = idUnico + 1;
    }

    // Solo para uso de debug
    mostrar = () => {
        console.log('La unidad', this.id, 'es de tipo', this.tipo, 'y posee', this.puntosFuerza, 'puntos de fuerza')
    }

    entrenar = () => {
        switch (this.tipo) {
            case TIPO_UNIDAD.Piquero:
                this.puntosFuerza += PUNTOS_FUERZA_ENTRENAMIENTO.Piquero;
                break;
            case TIPO_UNIDAD.Arquero:
                this.puntosFuerza += PUNTOS_FUERZA_ENTRENAMIENTO.Arquero;
                break;
            case TIPO_UNIDAD.Caballero:
                this.puntosFuerza += PUNTOS_FUERZA_ENTRENAMIENTO.Caballero;
                break;
        }
    }    
    
    // Si la unidad ha sido entrenada, pierde su entrenamiento para convertirse en otra unidad diferente.
    // Criterio: Considero que el entenamiento de un tipo de unidad no tiene valor si cambia de tipo
    transformar = (tipo) => {
        this.tipo = tipo;
        this.puntosFuerza = PUNTOS_FUERZA_INICIAL[tipo];
    }

  }

