const API_URL = 'http://localhost:8000/products/';

export const fetchProducts = async (page, limit, order, maxValue, minValue ,search) => {
  let url = `${API_URL}?_page=${page}&_limit=${limit}`;

  if (order) {
    url += `&_sort=price&_order=${order}`;
  }

  if (maxValue) {
    url += `&price_lte=${maxValue}`;
  }

  if (minValue) {
    url += `&price_gte=${minValue}`;
  }

  if (search) {
    url += `&q=${search}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
});

  return await response.json();
};