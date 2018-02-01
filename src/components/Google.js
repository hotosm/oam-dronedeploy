/* global window */
import React from 'react';

const catalogAPI = `${process.env.CATALOG_API_URL}/oauth/jwtgoogle`;
const clientId = process.env.GOOGLE_CLIENT_ID;
const url = 'https://accounts.google.com/o/oauth2/v2/auth?';
const authUrl = `${url}scope=openid email&client_id=${clientId}&response_type=token&redirect_uri=${catalogAPI}`;

const Google = () => (
  <div className="row">
    <div
      onClick={() => { window.open(authUrl); }}
      className="col-4 login"
    >
      <span className="lead vert-center">
        <img
          className="logo"
          alt="Google"
          src="google_logo.svg"
        />Login With Google
      </span>
    </div>
  </div>
);

export default Google;
