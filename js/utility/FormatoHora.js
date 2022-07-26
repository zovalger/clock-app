export function getYoutubeLikeToDisplay(millisec, unjoined) {
	var seconds = (millisec / 1000).toFixed(0);
	let milli = Math.floor(((millisec / 1000) % 1) * 100);

	let minutes = Math.floor(seconds / 60);
	let hours = "";

	if (minutes > 59) {
		hours = Math.floor(minutes / 60);
		hours = hours >= 10 ? hours : "0" + hours;
		minutes = minutes - hours * 60;
		minutes = minutes >= 10 ? minutes : "0" + minutes;
	}

	seconds = Math.floor(seconds % 60);
	seconds = seconds >= 10 ? seconds : "0" + seconds;
	milli = milli >= 10 ? milli : "0" + milli;

	if (unjoined) return { hours, minutes, seconds, milli };

	return hours
		? `${hours}:${minutes}:${seconds}.${milli}`
		: `${minutes}:${seconds}.${milli}`;
}




export function secondsToTime(s, msUnjoin) {

	function addZ(n) {
		return (n < 10 ? '0' : '') + n;
	}

	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;
	let hrs = (s - mins) / 60;

	ms = Math.floor(ms / 10)

	return msUnjoin ? {
		time: (hrs)
		? addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)
		: mins 
			? addZ(mins) + ':' + addZ(secs)
			: addZ(secs)
		, ms: '.' + addZ(ms)
	} : addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) + '.' + addZ(ms);
}

// addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs)