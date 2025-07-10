function bayesianScore(property, m, C) {
  const { rating: R, reviewsCount: v } = property;
  return (v / (v + m)) * R + (m / (v + m)) * C;
}

export function bayesianSort(inputArray) {
  console.log('here');
  const m = 50;
  const C =
    inputArray.reduce((acc, p) => acc + p.rating, 0) / inputArray.length;
  return [...inputArray].sort((a, b) => {
    const scoreA = bayesianScore(a, m, C);
    const scoreB = bayesianScore(b, m, C);
    return scoreB - scoreA;
  });
}

export function applyFilters(sort, properties, filters) {
  let result = [...properties];

  if (sort === 'recommended') {
    result = bayesianSort(result);
  }
  if (sort === 'highest-price') {
    result = result.sort((a, b) => b.price - a.price);
  }
  if (sort === 'lowest-price') {
    result = result.sort((a, b) => a.price - b.price);
  }
  

  console.log(result);

  if (filters.bedrooms !== 'any') {
    result = result.filter(
      (p) => p.capacity.bedroom === Number(filters.bedrooms)
    );
  }

  if (filters.bathrooms !== 'any') {
    result = result.filter((p) => p.bathroom === Number(filters.bathrooms));
  }

  const [minPrice, maxPrice] = filters.price.split('-').map(Number);
  result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  if (filters.superhost) {
    result = result.filter((p) => p.superhost);
  }

  if (filters.wifi) {
    result = result.filter((p) => p.amenities.includes('WiFi'));
  }

  if (filters.petAllowed) {
    result = result.filter((p) => p.amenities.includes('Pet Friendly'));
  }

  if (filters.location.length > 0) {
    result = result.filter((p) => filters.location.includes(p.location));
  }

  if (result[0]?.power) {
    result = result.sort((a, b) => b.power - a.power);
  }

  return result;
}
