/**
 * getrandomquestion
 * -----------------
 * • Tries to take `numPerCategory` random, unique questions from every category.
 * • If the total would be < minTotal (default 25) it tops‑up with additional
 *   unique questions chosen at random from *any* category.
 * • Works with both a nested { categories: { … } } dataset *and* a flat array.
 *
 * @param {Object|Array} data            Quiz JSON (nested or flat)
 * @param {number} numPerCategory        Target sample size per category (default 5)
 * @param {number} minTotal              Minimum total questions required (default 25)
 * @returns {Array}                      Fully shuffled, unique‑text question list
 */
export const getrandomquestion = (
  data,
  numPerCategory = 5,
  minTotal = 25
) => {
  /* ───────────────── 0. Build a *flat* pool of all questions ───────────── */
  let flatPool = [];

  if (Array.isArray(data)) {
    // flat dataset already
    flatPool = [...data];
  } else if (data?.categories && typeof data.categories === "object") {
    // nested dataset → flatten
    for (const [catName, qs] of Object.entries(data.categories)) {
      flatPool.push(...qs.map((q) => ({ ...q, category: q.category || catName })));
    }
  } else {
    throw new Error(
      "Dataset must be an array or an object with a 'categories' property"
    );
  }

  /* ───────────────── 1. Group by category for easy sampling ────────────── */
  const byCategory = flatPool.reduce((acc, q) => {
    (acc[q.category] ??= []).push(q);
    return acc;
  }, {});

  /* ───────────────── 2. Pick up to N per category, avoiding duplicates ─── */
  const selected = [];
  const seen = new Set();

  const fisherYates = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  for (const pool of Object.values(byCategory)) {
    const copy = [...pool];
    fisherYates(copy);

    for (const q of copy) {
      if (selected.length >= numPerCategory * Object.keys(byCategory).length)
        break; // optional hard cap
      if (selected.filter((x) => x.category === q.category).length >= numPerCategory)
        continue; // already have enough from this category
      if (seen.has(q.question)) continue;

      selected.push(q);
      seen.add(q.question);
      if (selected.length >= numPerCategory * Object.keys(byCategory).length)
        break;
    }
  }

  /* ───────────────── 3. Top‑up if below the minTotal threshold ─────────── */
  if (selected.length < minTotal) {
    // Remaining questions not yet used
    const remainder = flatPool.filter((q) => !seen.has(q.question));
    fisherYates(remainder);

    for (const q of remainder) {
      if (selected.length >= minTotal) break;
      selected.push(q);
      seen.add(q.question);
    }
  }

  /* ───────────────── 4. Final shuffle and return ───────────────────────── */
  fisherYates(selected);
  return selected;
};
