import React from 'react';
import propTypes from 'prop-types';
import { currentUrl } from '../util/authUtils';
//const currentUrl = 'http://www.google.com';
const encoded = encodeURI(currentUrl);
const catalogAPI = `${process.env.CATALOG_API_URL}/oauth/jwtfacebook`;
const clientId = process.env.FACEBOOK_APP_ID;
const facebookUrl = 'https://www.facebook.com/v2.11/dialog/oauth?';
const authUrl = `${facebookUrl}client_id=${clientId}&redirect_uri=${catalogAPI}?original_uri=${currentUrl}`;

const Facebook = props => (
  <div
    className="col-4 login"
    onClick={() => { props.dronedeployApi.Link.open(authUrl); }}
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
