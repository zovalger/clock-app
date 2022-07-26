// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      clase para controlar la interfaz del cronometro
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

import { secondsToTime } from "../utility/FormatoHora.js";
import { classActive as active } from "../utility/toggleClass.js";
import StopwatchController from "./Stopwatch.Controller.js";

class StopwatchUI extends StopwatchController {
	constructor($container, _id) {
		super(_id);

		// contenedor del cronometro
		this.$container = $container
			? $container
			: document.querySelector("#stopwatch");

		// relog
		this.$clock = this.$container.querySelector(".clock");
		// partes del relog
		this.$time = this.$clock.querySelector(".time");
		this.$ms = this.$clock.querySelector(".ms");

		// botones de funciones principales
		this.$btnStart = this.$container.querySelector(".start");
		this.$btnPartial = this.$container.querySelector(".partial");
		this.$btnPause = this.$container.querySelector(".pause");
		this.$btnReset = this.$container.querySelector(".reset");

		// contenedores de las secciones del cronometro
		this.$clockContainer = this.$container.querySelector(".clock_container");
		this.$partialList = this.$container.querySelector(".partial-list");
		this.$partialListContent = this.$partialList.querySelector(".content");
		this.$controlsContainer = this.$container.querySelector(
			".controls_container"
		);

		// asignacion de funcionalidades a los botones
		this.$btnStart.addEventListener("click", () => this.start());
		this.$btnPartial.addEventListener("click", () => this.partial());
		this.$btnPause.addEventListener("click", () => this.pause());
		this.$btnReset.addEventListener("click", () => this.reset());

		this.update = null;

		// reiniciar el estado del cronometro
		this.restoreState();
	}

	// asigna los correspondientes valores al relog
	showTime() {
		const clock = secondsToTime(this.getTime(), true);

		if (this.$time.innerHTML != clock.time) this.$time.innerHTML = clock.time;
		if (this.$ms.innerHTML != clock.ms) this.$ms.innerHTML = clock.ms;

		// this.$clock.innerHTML = secondsToTime(this.getTime());
	}

	// funcion que se ejecuta en cada intervalo
	updateFrame = () => {
		this.showTime();
	};

	// ************** iniciar el cronometro **************
	// establece los estados de los botones, inicia el cronometro y establece el intervalo de actualizacion
	start() {
		active(this.$btnStart, false);
		active(this.$btnReset, false);
		active(this.$btnPause, true);
		active(this.$btnPartial, true);
		this.$btnPartial.disabled = false;

		super.start();
		this.showTime();

		clearInterval(this.update);
		this.update = setInterval(this.updateFrame, 125);
	}

	// ************** pausar el cronometro **************
	// establece los estados de los botones, pausa el cronometro y limpia el intervalo de actualizacion
	pause() {
		active(this.$btnStart, true);
		active(this.$btnPause, false);
		active(this.$btnReset, true);
		active(this.$btnPartial, false);

		super.pause();
		this.showTime();

		clearInterval(this.update);
	}

	// ************** resetea el cronometro **************
	// establese todos los elementos al estado inicial
	reset() {
		active(this.$btnStart, true);
		active(this.$btnPartial, true);
		active(this.$btnPause, false);
		active(this.$btnReset, false);
		active(this.$partialList, false);
		this.$btnPartial.disabled = true;

		this.$clockContainer.classList.remove("list-open");
		this.$controlsContainer.classList.remove("list-open");

		super.reset();
		this.showTime();

		clearInterval(this.update);
	}

	// ************** parcial **************
	// inserta un nuevo parcial en el cronometro

	partial(p) {
		let partial = p ? p : this.insertPartial();

		if (partial.index == 0) {
			active(this.$partialList, true);

			this.$clockContainer.classList.add("list-open");
			this.$controlsContainer.classList.add("list-open");
			this.$partialListContent.innerHTML = "";
		}

		this.$partialListContent.innerHTML += this.createPartialElement(partial);

		this.$partialListContent.scrollTo({
			top: -this.$partialListContent.scrollHeight,
			behavior: "smooth",
		});
	}

	// genera la estructura html para los parciales
	createPartialElement(partial) {
		let textPartialTime = secondsToTime(partial.partialTimes, true),
			textTotalTime = secondsToTime(partial.totalTime, true);

		return `<div>
						<div>${partial.index + 1}</div>
						<div>
							<span class="time">${textPartialTime.time}</span><span class="ms">${
			textPartialTime.ms
		} </span>
						</div>
						<div>
							<span class="time">${textTotalTime.time}</span><span class="ms">${
			textTotalTime.ms
		} </span>
						</div>
					</div>`;
	}

	// restablese los valores guardados que tenia el cronometro
	restoreState(_id) {
		super.restoreState(_id);

		if (this.status == "running") this.start();
		if (this.status == "pause") this.pause();
		if (this.status == "idle") this.reset();

		if (this.partials.length > 0)
			this.partials.map((p, index) => {
				p.index = index;

				this.partial(p);
			});
	}
}

export default StopwatchUI;
