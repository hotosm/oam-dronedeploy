/* global DroneDeploy, window */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toJS } from './toJS';
import Facebook from './Facebook';
import { getToken, setToken } from '../util/authUtils';
import { checkTokenStatus } from '../actions/authActions';
import setDronedeployAPI, { exportImage } from '../actions/droneDeployActions';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    const storedToken = getToken();
    const currentTime = new Date().getTime() / 1000;
    this.props.checkTokenStatus(storedToken, currentTime);
    window.addEventListener('message', (e) => {
      if (e.data.token) {
        const { data: { token } } = e;
        setToken(token);
        this.props.checkTokenStatus(token, currentTime);
      }
    });
    new DroneDeploy({ version: 1 }).then((dronedeployApi) => {
      this.props.setDronedeployAPI(dronedeployApi);
    });
  }

  render() {
    const expandSection = classNames(
      'expand-section',
      { hidden: !this.state.expanded }
    );
    const arrowSrc = this.state.expanded ? 'arrow-up.svg' : 'arrow-down.svg';
    let authenticatedSection = null;
    if (this.props.isAuthenticated) {
      authenticatedSection = (
        <div className="col-4">
          <button onClick={this.props.exportImage}>Test Call</button>
        </div>
      );
    } else {
      authenticatedSection = <Facebook />;
    }
    return (
      <div className="container expand-container">
        <div
          className="row expand-row"
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded
            });
          }}
        >
          <div className="col-3">
            <span className="lead vert-center">
              <img
                className="logo"
                alt="OAM"
                src="oam-logo-symbol.svg"
              /><strong>OpenAerialMap</strong>
            </span>
          </div>
          <div className="col-1 right">
            <i>
              <img
                alt=""
                src={arrowSrc}
              />
            </i>
          </div>
        </div>
        <div className={expandSection}>
          <div className="row">
            {authenticatedSection}
          </div>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  checkTokenStatus: propTypes.func.isRequired,
  exportImage: propTypes.func.isRequired,
  setDronedeployAPI: propTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  checkTokenStatus: (token, currentTime) => {
    dispatch(checkTokenStatus(token, currentTime));
  },
  exportImage: () => {
    dispatch(exportImage());
  },
  setDronedeployAPI: (api) => {
    dispatch(setDronedeployAPI(api));
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Container));
