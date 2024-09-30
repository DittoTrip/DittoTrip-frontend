export const formatDistance = (dist: string) => {
  const distance = Number(dist);

  if (isNaN(distance)) return 'Invalid';

  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)}km`;
  }

  return `${distance.toFixed(1)}m`;
};
