import React, { Fragment } from 'react';

const Menu = ({ name, menu, address, latitude, lontitude }) => (
  <Fragment>
    <div className="menu">
      <div className="title-container">
        <h1 className="title">{name}</h1>
        <a
          href={`https://www.google.com/maps/?q=@${latitude},${lontitude}`}
          target="_blank"
          className="link"
        >
          🗺️ {address}
        </a>
      </div>
      <div>
        {menu.map(
          menu =>
            menu.dishes.length > 0 ? (
              <div className="menu-item" key={menu.category}>
                <div className="category">
                  <h3 className="category-title">{menu.category}</h3>
                  <span>{menu.dishes.length} items</span>
                </div>
                <div>
                  {menu.dishes.map(dish => (
                    <div key={dish.name}>
                      <p className="dish-name">{dish.name}</p>
                      <p className="dish-price">{dish.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null,
        )}
      </div>
    </div>
    <style jsx>
      {`
        .menu {
          max-width: 60rem;
          margin: auto;
          padding: 1rem;
        }
        .title-container {
          text-align: center;
          padding-bottom: 2rem;
        }
        .link {
          color: #39f;
          text-decoration: none;
        }
        .menu-item {
          margin-bottom: 2.5rem;
        }
        .category {
          border-bottom: 2px solid;
          padding-bottom: 5px;
          margin-bottom: 20px;
        }
        .category-title {
          margin-bottom: 0;
        }
        .dish-name {
          margin-bottom: 0;
        }
        .dish-price {
          margin-top: 0;
          font-size: 14px;
          color: rgb(83, 86, 101);
        }
      `}
    </style>
  </Fragment>
);

export default Menu;
