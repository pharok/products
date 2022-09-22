export default function fetchProducts() {
  return fetch(
    'https://my-json-server.typicode.com/benirvingplt/products/products',
  )
    .then((response) => response.json())
    .then((json) => {
      // console.log('json', json);
      if (!json.length) {
        throw new Error('An error occurred while fetching notes');
      }
      return json;
    });
}
