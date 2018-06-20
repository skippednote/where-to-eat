import React, { Fragment } from 'react';
import Head from 'next/head';
import Menu from './menu';

export class Open extends React.Component {
  escape = ({ which }) => {
    if (which === 27) {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.escape);
  }

  componentWillUnmount() {}

  render() {
    const { restaurant_name, closeModal, menu } = this.props;
    return (
      <Fragment>
        <div className="open">
          <Head>
            <title>
              {restaurant_name} | {'🍕 🥪 🥙 Where To Eat 🌭 🍔 🍟'}
            </title>
          </Head>
          <Menu name={restaurant_name} menu={menu} />
          <button onClick={closeModal} className="close">
            ❌
          </button>
        </div>
        <style jsx>
          {`
            .open {
              position: fixed;
              top: 10px;
              bottom: 10px;
              left: 10px;
              right: 10px;
              z-index: 1;
              background: white;
              border-radius: 4px;
              box-shadow: rgba(20, 26, 40, 0.2) 0px 7px 42px;
              overflow-y: scroll;
              padding: 1rem;
            }
            .close {
              border: none;
              background: none;
              position: fixed;
              top: 20px;
              right: 20px;
              font-size: 2rem;
            }
            @media (max-width: 1024px) {
              .close {
                font-size: 1rem;
              }
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export default Open;
