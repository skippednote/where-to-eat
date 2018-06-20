import React, { Component, Fragment } from 'react';
import Card from 'card-vibes';
import Open from './open';

export default class Restaurant extends Component {
  state = {
    open: false,
  };
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { logo } = this.props;
    const { open } = this.state;
    if (open) {
      return <Open {...this.props} closeModal={this.closeModal} />;
    }
    return (
      <Fragment>
        <div className="card">
          <Card
            onClick={this.openModal}
            className="card-inner"
            style={cardStyles}
          >
            <img className="logo" src={`/${logo}`} />
          </Card>
        </div>
        <style jsx>
          {`
            @media (max-width: 767px) {
              .card {
                flex-basis: 100%;
              }
            }
            @media (min-width: 768px) and (max-width: 1024px) {
              .card {
                flex-basis: 50%;
              }
            }
            @media (min-width: 1025px) {
              .card {
                flex-basis: 25%;
              }
            }
            .card:hover {
              cursor: pointer;
            }
            .logo {
              width: 100%;
              height: 150px;
              object-fit: contain;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

const cardStyles = {
  width: '90%',
  padding: '30px 10px',
  margin: '10px auto',
  background: 'rgb(255, 255, 255) none repeat scroll 0% 0%',
  borderRadius: '4px',
  color: 'rgb(54, 73, 98)',
  fontSize: '16px',
  lineHeight: 1.6,
};
