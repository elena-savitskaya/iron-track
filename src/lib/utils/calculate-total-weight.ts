export const calculateTotalWeight = (
  sets: { reps: string; weight: string }[]
) => {
  return sets.reduce((total, set) => {
    const reps = parseInt(set.reps, 10);
    const weight = parseFloat(set.weight);
    if (!isNaN(reps) && !isNaN(weight)) {
      return total + reps * weight;
    }
    return total;
  }, 0);
};
