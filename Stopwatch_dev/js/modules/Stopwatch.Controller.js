import Stopwatch from "./Stopwatch.js";

class StopwatchController extends Stopwatch {
	constructor(_id) {
		super();

		// this._id = _id ? _id : Date.now();
		this._id = "stopwatch";

		this.partials = [];
	}

	start() {
		super.start();
		this.saveState();
	}

	pause() {
		super.pause();
		this.saveState();
	}
	reset() {
		super.reset();
		this.partials = [];
		this.saveState();
	}

	insertPartial() {
		if (this.status != "running") return;

		let LengthPartial = this.partials.length;

		const totalTime = this.getTime();
		const partialTimes =
			LengthPartial > 0
				? totalTime - this.partials[LengthPartial - 1].totalTime
				: totalTime;

		let partial = {
			partialTimes,
			totalTime,
		};

		this.partials.push(partial);

		partial.index = LengthPartial;

		this.saveState();

		return partial;
	}

	saveState() {
		// para cuando sean varios

		// const StorageStowatch = localStorage["stopwatch"]
		// 	? JSON.parse(localStorage["stopwatch"])
		// 	: {};

		// StorageStowatch[this._id] = {
		// 	status: this.status,
		// 	startDate: this.startDate,
		// 	accumulatedTime: this.accumulatedTime,
		// 	partials: this.partials,
		// };

		// localStorage["stopwatch"] = JSON.stringify(StorageStowatch);

		// console.log(StorageStowatch);

		// cuando sea un solo cronometro

		let StorageStowatch = localStorage[this._id]
			? JSON.parse(localStorage[this._id])
			: {};

		StorageStowatch = {
			status: this.status,
			startDate: this.startDate,
			accumulatedTime: this.accumulatedTime,
			partials: this.partials,
		};

		localStorage[this._id] = JSON.stringify(StorageStowatch);
	}

	restoreState(_id) {
		// this._id = _id;

		// const StorageStowatch = localStorage["stopwatch"]
		// 	? JSON.parse(localStorage["stopwatch"])
		// 	: {};

		// const thisStopwatch = StorageStowatch[`${this._id}`];

		// console.log(thisStopwatch);
		// if (!thisStopwatch) return;

		// this.status = thisStopwatch.status;
		// this.startDate = thisStopwatch.startDate;
		// this.accumulatedTime = thisStopwatch.accumulatedTime;
		// this.partials = thisStopwatch.partials;

		const StorageStowatch = localStorage[this._id]
			? JSON.parse(localStorage[this._id])
			: {};

		if (!StorageStowatch.hasOwnProperty("status")) return;

		this.status = StorageStowatch.status;
		this.startDate = StorageStowatch.startDate;
		this.accumulatedTime = StorageStowatch.accumulatedTime;
		this.partials = StorageStowatch.partials;
	}

	// getLastPartial() {}
}

export default StopwatchController;
