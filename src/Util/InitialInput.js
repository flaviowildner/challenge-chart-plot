export const initialValue = `{ type: 'start', timestamp: 0, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}
{ type: 'span', timestamp: 0, begin: 0, end: 3}
{ type: 'data', timestamp: 0, os: 'linux', browser: 'chrome', min_response_time: 1, max_response_time: 2 }
{ type: 'data', timestamp: 0, os: 'win32', browser: 'chrome', min_response_time: 3, max_response_time: 6 }
{ type: 'data', timestamp: 0, os: 'win32', browser: 'opera', min_response_time: 8, max_response_time: 2 }
{ type: 'data', timestamp: 1, os: 'linux', browser: 'chrome', min_response_time: 4, max_response_time: 7 }
{ type: 'data', timestamp: 1, os: 'win32', browser: 'chrome', min_response_time: 2, max_response_time: 5 }
{ type: 'data', timestamp: 1, os: 'win32', browser: 'opera', min_response_time: 7, max_response_time: 4 }
{ type: 'data', timestamp: 2, os: 'linux', browser: 'chrome', min_response_time: 5, max_response_time: 8 }
{ type: 'data', timestamp: 2, os: 'win32', browser: 'chrome', min_response_time: 6, max_response_time: 9 }
{ type: 'data', timestamp: 2, os: 'win32', browser: 'opera', min_response_time: 2, max_response_time: 3 }
{ type: 'data', timestamp: 3, os: 'linux', browser: 'chrome', min_response_time: 5, max_response_time: 8 }
{ type: 'data', timestamp: 3, os: 'win32', browser: 'chrome', min_response_time: 6, max_response_time: 9 }
{ type: 'data', timestamp: 3, os: 'win32', browser: 'opera', min_response_time: 1, max_response_time: 1 }
{ type: 'stop', timestamp: 3 }`