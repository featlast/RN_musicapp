//Generate IDs Random
export const generateId = () => {
  const random = Math.random().toString(36).substring(2)
  const fecha = Date.now().toString(36)
  return random + fecha
}

export const formatDuration =(seconds: number): string=> {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${minutes}:${formattedSeconds}`;
}
