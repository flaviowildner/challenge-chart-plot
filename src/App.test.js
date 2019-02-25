import { generateChartState } from './Util/InputParser'


describe("Tests", function () {
	it('Invalid type event', () => {
		const query = `{ type: 'start', timestamp: 0, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
{ type: 'test_invalid_type', timestamp: 0, begin: 0, end: 3}
{ type: 'data', timestamp: 0, os: 'linux', browser: 'chrome', min_response_time: 1, max_response_time: 2 }
{ type: 'stop', timestamp: 3 }
{ type: 'data', timestamp: 1, os: 'linux', browser: 'chrome', min_response_time: 4, max_response_time: 7 }
{ type: 'data', timestamp: 2, os: 'linux', browser: 'chrome', min_response_time: 5, max_response_time: 7 }
{ type: 'data', timestamp: 3, os: 'linux', browser: 'chrome', min_response_time: 5, max_response_time: 6 }`;
		expect(generateChartState(query)).toEqual({ "data": [], errorMessage: 'Invalid event type' });
	});

	it('Arbitrary sequence of events but ordered by timestamp', () => {
		const query = `{ type: 'start', timestamp: 0, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
{ type: 'span', timestamp: 0, begin: 0, end: 3}
{ type: 'data', timestamp: 0, os: 'linux', browser: 'chrome', min_response_time: 1, max_response_time: 2 }
{ type: 'stop', timestamp: 3 }
{ type: 'data', timestamp: 1, os: 'linux', browser: 'chrome', min_response_time: 4, max_response_time: 7 }
{ type: 'data', timestamp: 2, os: 'linux', browser: 'chrome', min_response_time: 5, max_response_time: 7 }
{ type: 'data', timestamp: 3, os: 'linux', browser: 'chrome', min_response_time: 5, max_response_time: 6 }`;
		expect(generateChartState(query)).toEqual({ "data": [{ "name": "linux_chrome-min_response_time", "data": { "0": 1, "1": 4, "2": 5, "3": 5 } }, { "name": "linux_chrome-max_response_time", "data": { "0": 2, "1": 7, "2": 7, "3": 6 } }] });
	});


})
