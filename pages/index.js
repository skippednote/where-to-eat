import React from 'react';
import Head from 'next/head';
import restaurants from '../static/restaurants.json';
import Restaurant from '../components/restaurant';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return { res: JSON.stringify(restaurants) };
  }

  render() {
    const restaurants = JSON.parse(this.props.res);
    return (
      <div className="grid">
        <Head>
          <title>{'🍕 🥪 🥙 Where To Eat 🌭 🍔 🍟'}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik"
            rel="stylesheet"
          />
        </Head>
        {restaurants.map(restaurant => {
          return restaurant.menu.length > 0 ? (
            <Restaurant key={restaurant.restaurant_slug} {...restaurant} />
          ) : null;
        })}
        <style jsx>
          {`
            .grid {
              display: flex;
              flex-wrap: wrap;
            }
          `}
        </style>
        <style global jsx>
          {`
            body {
              background: #f1f5f8;
              font-family: 'Rubik', sans-serif;
            }
          `}
        </style>
      </div>
    );
  }
}
