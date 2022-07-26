// es una clase que tiene las funciones principales de un cronometro
class Stopwatch {
	constructor() {
		// es un idicador para objetos externos de la clase
		this.status = "idle";

		// cuando se inicio el contador (mientras esta en activo)
		this.startDate = null;

		// cuanto tiempo tiene acumulado (mientras esta pausado)
		this.accumulatedTime = 0;
	}

	// ************** inicia el cronometro **************
	// pone la fecha de inicio y verifica si no estaba pausado antes
	start() {
		this.status = "running";

		this.startDate = this.startDate
			? this.startDate
			: this.accumulatedTime
			? Date.now() - this.accumulatedTime
			: Date.now();

		this.accumulatedTime = 0;
	}

	// ************** pausa el cronometro **************
	// guarda el tiempo acumulado
	pause() {
		this.status = "pause";

		this.accumulatedTime = this.startDate
			? Date.now() - this.startDate
			: this.accumulatedTime;

		this.startDate = null;
	}

	// ************** resetea el cronometro **************
	// establese todas las variables al estado inicial
	reset() {
		this.status = "idle";
		this.startDate = null;
		this.accumulatedTime = 0;
	}

	// ************** devuelve el tiempo del cronometro **************
	// decide si mandar el tiempo que a trascurrido desde que se inicio
	// o devuelve el tiempo acumulado
	getTime() {
		let time = this.startDate
			? Date.now() - this.startDate
			: this.accumulatedTime;

		return time;
	}
}

export default Stopwatch;
