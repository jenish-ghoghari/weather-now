export const getStartAndEndOfDay = (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Set to midnight (00:00:00)
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day (23:59:59)
  
    return { startOfDay, endOfDay };
  };