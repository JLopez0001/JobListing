// Helper function to format date into month/day/year

const formatDate = (dateToString) => {
    const date = new Date(dateToString);
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

export default formatDate;