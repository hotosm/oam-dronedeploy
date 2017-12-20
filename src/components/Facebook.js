import React from 'react';
import propTypes from 'prop-types';

const catalogAPI = `${process.env.CATALOG_API_URL}/oauth/jwtfacebook`;
const clientId = process.env.FACEBOOK_APP_ID;
const facebookUrl = 'https://www.facebook.com/v2.3/dialog/oauth?';
const authUrl = `${facebookUrl}client_id=${clientId}&response_type=token&redirect_uri=${catalogAPI}`;

const Facebook = props => (
  <div
    onClick={() => { props.dronedeployApi.Link.open(authUrl); }}
    className="col-4 login"
  >
    <span className="lead vert-center">
      <img
        className="logo"
        alt="Facebook"
        src="facebook_logo.svg"
      />Login With Facebook
    </span>
  </div>
);


export default Facebook;

//onClick={() => { props.dronedeployApi.Link.open(authUrl); }}
