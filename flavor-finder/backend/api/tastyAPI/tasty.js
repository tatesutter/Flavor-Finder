const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/list',
  params: {
    from: '0',
    size: '6',
    tags: 'string'
  },
  headers: {
    'x-rapidapi-key': 'fbc20b39a9msh53d724bbc171c7cp1036c9jsn44d817f52381',
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}