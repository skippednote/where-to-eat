const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');
const Xray = require('x-ray');
const x = Xray();

async function getRestaurants() {
  const { data } = await axios.post(
    'http://kartfood.in/ajax/loadAllMerchantMap',
  );
  return data.details;
}

async function downloadImages(restaurants) {
  let restaurantsWithLogo = [];
  for (restaurant of restaurants) {
    const url = `http://kartfood.in${restaurant.logo}`;
    // const extension = restaurant.logo.match(/\.(.+)/)[0];
    const logo = `static/images/${restaurant.restaurant_slug}.jpg`;
    const { data } = await axios({
      url: url,
      method: 'get',
      responseType: 'arraybuffer',
    });
    fs.writeFileSync(logo, data);
    restaurantsWithLogo.push({ ...restaurant, logo });
  }

  return restaurantsWithLogo;
}

async function resizeImages(restaurants) {
  for (restaurant of restaurants) {
    const { data: image } = await sharp(restaurant.logo)
      .resize(425, 425)
      .max()
      .jpeg({
        quality: 85,
        progressive: true,
        chromaSubsampling: '4:2:0',
      })
      .toBuffer({ resolveWithObject: true });
    fs.writeFileSync(restaurant.logo.replace(/\.(.+)/, '.jpg'), image);
  }
}

async function processRestaurants(restaurants) {
  const details = [];

  for (restaurant of restaurants) {
    const menu = await x(`http://kartfood.in${restaurant.link}`, '.menu-1', [
      {
        category: '.menu-cat span.bold',
        dishes: x('.items-row .row', [
          {
            name: '.col-md-7',
            price: '.food-price-wrap',
          },
        ]),
      },
    ]);
    details.push({ ...restaurant, menu });
  }

  return details;
}

async function main() {
  const restaurants = await getRestaurants();
  const restaurantsWithLogo = await downloadImages(restaurants);
  await resizeImages(restaurantsWithLogo);
  const restaurantsWithMenu = await processRestaurants(restaurantsWithLogo);
  fs.writeFileSync(
    'static/restaurants.json',
    JSON.stringify(restaurantsWithMenu),
  );
}

main();
