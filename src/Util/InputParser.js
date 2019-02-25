function strToJson(str) {
	var inputSplitted, inputParsed;
	inputSplitted = str.split('\n'); // Convert json input string to valid json
	inputSplitted = inputSplitted.filter(el => el.trim()); // Remove empty and only whitespaces lines
	inputParsed = inputSplitted.map((el) => JSON.parse(JSON.stringify(eval("(" + el + ")")))); // Parse JSON
	return inputParsed;
}

function generateChartState(inputEventsString) {
	let select, group, begin, end, data = [];
	let inputParsed, indexLastStart;

	try{
		inputParsed = strToJson(inputEventsString);
		inputParsed.sort((a, b) => { // Sort events based on timestamp. If the timestamp is equal, the priority is used to tie break.
			const priority = { "start": 1, "span": 2, "data": 3, "stop": 4 };
			if (a.timestamp < b.timestamp) return -1;
			if (a.timestamp > b.timestamp) return 1;
			if (priority[a.type] < priority[b.type]) return -1;
			if (priority[a.type] > priority[b.type]) return 1;
			return 0;
		});
		indexLastStart = inputParsed.length - inputParsed.slice().reverse().findIndex((el) => { //Find the last start type event
			return el.type === 'start'
		}) - 1;

		if(indexLastStart === inputParsed.length) throw Error('There\'s no event of start type')
		for (let i = indexLastStart; i < inputParsed.length; i++) {
			const currEvent = inputParsed[i];
			const { type, timestamp } = currEvent;
			if(timestamp < 0) throw Error('The timestamp of event should be greater than zero')
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
					select.forEach((currSelect) => {
						if (currEvent[currSelect]) {
							const groupName = group.reduce((r, c) => currEvent[r] + '_' + currEvent[c]);
							const lineName = groupName + '-' + currSelect;
							if (!data[lineName]) data[lineName] = { data: [] }
							data[lineName] = { name: lineName, data: { ...data[lineName].data, [currEvent.timestamp]: currEvent[currSelect] } };
						}
					});
					break;
				case 'stop':
					i = inputParsed.length;
					break;
				default:
					throw Error('Invalid event type')
			}
		}
		const newChartState = Object.keys(data).map((p) => data[p]);
		return {
			data: newChartState,
		}
	} catch(err){
		return {
			data: [],
			errorMessage: err.message
		}
	}
	
}

export { generateChartState }