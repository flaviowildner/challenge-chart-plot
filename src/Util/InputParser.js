const MAX_POINTS_PER_SERIES = 10;

function strToJson(str) {
	var inputSplitted, inputParsed;
	inputSplitted = str.split('\n'); // Split the entire input in lines of string json
	inputSplitted = inputSplitted.filter(el => el.trim()); // Remove empty and only whitespaces lines
	inputParsed = inputSplitted.map((el) => JSON.parse(JSON.stringify(eval("(" + el + ")")))); // Parse JSON
	return inputParsed;
}

function generateChartState(inputEventsString) {
	let select, group, begin, end, data = [];
	let inputParsed, indexLastStart;

	try {
		inputParsed = strToJson(inputEventsString);
		inputParsed.sort((a, b) => { // Sort events based on timestamp. If the timestamp is equal, the priority is used to tie break.
			const priority = { "start": 1, "span": 2, "data": 3, "stop": 4 };
			if (a.timestamp < b.timestamp) return -1;
			if (a.timestamp > b.timestamp) return 1;
			if (priority[a.type] < priority[b.type]) return -1;
			if (priority[a.type] > priority[b.type]) return 1;
			return 0;
		});
		indexLastStart = inputParsed.length - inputParsed.slice().reverse().findIndex((el) => { //Find the last start type event. It is unnecesary to process all events.
			return el.type === 'start'
		}) - 1;


		if (indexLastStart === inputParsed.length) throw Error('There\'s no event of start type')
		for (let i = indexLastStart; i < inputParsed.length; i++) {
			const currEvent = inputParsed[i];
			const { type, timestamp } = currEvent;
			if (timestamp < 0) throw Error('The timestamp of event should be greater than zero')
			switch (type) {
				case 'start':
					if (!currEvent.select) throw Error('Event of start type should have a set of select')
					if (!currEvent.group) throw Error('Event of start type should have a set of group')
					select = currEvent.select;
					group = currEvent.group;
					break;
				case 'span':
					//if (!currEvent.begin || currEvent.begin < 0) throw Error('The begin value should be equal or greater than 0')
					if (!currEvent.begin && currEvent.begin !== 0) throw Error('Event of span type should have a begin timestamp')
					if (!currEvent.end && currEvent.end !== 0) throw Error('Event of span type should have a end timestamp')
					begin = currEvent.begin;
					end = currEvent.end;
					break;
				case 'data':
					if (timestamp < begin || timestamp > end) break;
					if (select) {
						select.forEach((currSelect) => {
							if (currEvent[currSelect]) {
								const groupName = group.reduce((r, c) => currEvent[r] + '_' + currEvent[c]);
								const lineName = groupName + '-' + currSelect;
								if (!data[lineName]) data[lineName] = { data: [] }
								data[lineName] = { name: lineName, data: { ...data[lineName].data, [currEvent.timestamp]: currEvent[currSelect] } };
							}
						});
					}
					break;
				case 'stop':
					i = inputParsed.length;
					break;
				default:
					throw Error('Invalid event type')
			}
		}
		//Dealing with huge amount of data
		/*
		My solution was to take a sample of the data by defining the maximum number of points that a series can have. I set that number to 10.
		In this way, it is possible to see more easily the long-term variation of the series. But in cases where it is necessary to see more detail
		of the data, this is not a good solution due the loss of data.
		There is some solutions that I thought of how to deal with different problems of huge amount of data.
		If it is necessary to know the trend of values, linear regression can be used.
		If the detail of the data are very important, paging can be used by spliting in sub-charts. Or even panning(sliding horizontally) if the amount of data is not so large 
		to slow performance.
		*/
		const newChartState = Object.keys(data).map((p) => data[p]);
		newChartState.forEach((el, idx) => {
			const dataLenght = Object.keys(el.data).length;
			Object.keys(el.data).forEach((el_id, idx) => {
				if ((idx % parseInt(dataLenght / MAX_POINTS_PER_SERIES))) {
					delete el.data[el_id];
				}
			});
		});

		return {
			data: newChartState,
		}
	} catch (err) {
		return {
			data: [],
			errorMessage: err.message
		}
	}

}

export { generateChartState }