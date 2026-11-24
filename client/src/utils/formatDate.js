/** Format a date (Date, ISO string or timestamp) as dd.mm.yyyy. */
const formatDate = (value) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

export default formatDate;
