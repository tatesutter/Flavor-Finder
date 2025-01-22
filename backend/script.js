require('dotenv').config();
// NOTE: Make sure to install the axios & dotenv packages
// npm install axios dotenv

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/list',
  params: {
    from: '0',
    size: '3',
    // NOTE: The tags parameter below can be used to search by tags, but only works for 'under_30_minutes' and 'vegetarian'
    // NOTE: You can uncomment the tags parameter below to see the results
    // tags: 'under_30_minutes',
    // tags: 'vegetarian',
    
    // the q parameter is for the search query to indicate a type of food to search for, this can be changed for each instance to search for different types of food
    q: 'chicken'
  },
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

const getRequest = async () => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    }

    getRequest();
