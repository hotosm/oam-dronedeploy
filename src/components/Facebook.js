import React from 'react';
import { currentUrl } from '../util/authUtils';

const catalogAPI = process.env.CATALOG_API_URL;

const Facebook = () => (
  <div className="col-4 login">
    <a href={`${catalogAPI}/oauth/jwtfacebook?original_uri=${currentUrl}`}>
    <span className="lead vert-center">
      <img
        className="logo"
        alt="Facebook"
        src="facebook_logo.svg"
      />Login With Facebook
    </span>
    </a>
  </div>
);

export default Facebook;
