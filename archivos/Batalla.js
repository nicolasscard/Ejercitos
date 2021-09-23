import { RESULTADOS_BATALLA } from './parametros.js';

var idUnico = 0;

export default class Batalla {
    id; // Simplemente para identificarlos cuando hacemos un console
    ejercito1;
    ejercito2;
    resultado; // Guarda el resultado de la batalla siempre en relación al ejercito1

    constructor(ejercito1, ejercito2) {
        this.ejercito1 = ejercito1;
        this.ejercito2 = ejercito2;

        this.id = idUnico;
        idUnico = idUnico + 1;

        this.resolver(); // Decidí que la batalla se resuelva inmediatamente al momento de su creación
    }
  
    // Solo para uso de debug
    mostrar = () => {
        console.log('La Batalla', this.id, ', entre ejercito ', this.ejercito1.id, 'y ejercito ', this.ejercito2.id, 'resultó en:')
        if (this.resultado == RESULTADOS_BATALLA.Empate) {
            console.log(RESULTADOS_BATALLA.Empate);
        }
        else {
            console.log(this.resultado, 'para el ejercito ' + this.ejercito1.id)
        }
    }

    resolver = () => {
        if (this.ejercito1.obtenerPuntaje() > this.ejercito2.obtenerPuntaje()) {    // Victoria Ejercito1
            this.ejercito1.monedas += 100;
            this.ejercito2.eliminarMejorUnidad();
            this.ejercito2.eliminarMejorUnidad();
            this.resultado = RESULTADOS_BATALLA.Victoria;
        } 
        else {
            if (this.ejercito1.obtenerPuntaje() < this.ejercito2.obtenerPuntaje()) { // Derrota Ejercito1
                this.ejercito2.monedas += 100;
                this.ejercito1.eliminarMejorUnidad(); 
                this.ejercito1.eliminarMejorUnidad();
                this.resultado = RESULTADOS_BATALLA.Derrota;
            }
            else { // Empate => Se decidió que ambos ejercitos pierden su mejor unidad 
                this.ejercito1.eliminarMejorUnidad();
                this.ejercito2.eliminarMejorUnidad();
                this.resultado = RESULTADOS_BATALLA.Empate;
            }
        }
        this.ejercito1.batallas.push(this);
        this.ejercito2.batallas.push(this);
    }
  }

