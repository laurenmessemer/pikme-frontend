/**
 * Converts UTC date string to New York date in DD-MM-YYYY format (no time)
 * @param {string} utcDateString - UTC date string (e.g. "2025-06-19T21:40:49.148Z")
 * @returns {string} - Formatted date (e.g. "19-06-2025")
 */

export function formatNYDate(utcDateString) {
    const date = new Date(utcDateString);

    // Use toLocaleString to get NY date parts
    const nyDate = date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    // nyDate is in MM/DD/YYYY format
    const [month, day, year] = nyDate.split('/');
    return `${day}-${month}-${year}`;
}

export function dateStringToUTCISOString(dateString) {
    // Step 1: Create a Date object for the date as if it were midnight in NYC
    // We use the input as UTC, then get what that moment is in NYC
    const utcDate = new Date(`${dateString}T00:00:00Z`);

    // Step 2: Get the NYC date parts for that UTC date
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(utcDate);

    // Step 3: Extract the NYC date parts
    const get = (type) => parts.find((p) => p.type === type).value;
    const nycYear = get('year');
    const nycMonth = get('month');
    const nycDay = get('day');

    // Step 4: Construct a Date object for midnight in NYC, but in UTC
    const nycMidnightUTC = new Date(
        Date.UTC(nycYear, nycMonth - 1, nycDay, 0, 0, 0)
    );
    return nycMidnightUTC.toISOString();
}
