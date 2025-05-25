export const getrandomquestion = (data, numPerCategory = 5) => {
  const selected = [];

  for (const category in data.categories) {
    const shuffled = [...data.categories[category]].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, numPerCategory).map(q => ({ ...q, category }));
    selected.push(...picked);
  }

  return selected.sort(() => Math.random() - 0.5);
};
