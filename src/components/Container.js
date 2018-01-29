/* global DroneDeploy, window */
import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toJS } from './toJS';
import Facebook from './Facebook';
import { getToken, setToken } from '../util/authUtils';
import { checkTokenStatus } from '../actions/authActions';
import setDronedeployAPI, { exportImage as exportImageAction }
  from '../actions/droneDeployActions';
import Form from './Form';
import ExportStatus from './ExportStatus';

export class Container extends React.Component {
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
    const { isAuthenticated, exportImage, exportStatus } = this.props;
    const expandSection = classNames(
      'expand-section',
      { hidden: !this.state.expanded }
    );
    const arrowSrc = this.state.expanded ? 'arrow-up.svg' : 'arrow-down.svg';
    let authenticatedSection;
    if (isAuthenticated) {
      authenticatedSection = (
        <div>
          <Form exportImage={exportImage} exportStatus={exportStatus} />
          <ExportStatus exportStatus={exportStatus} />
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
          {authenticatedSection}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  checkTokenStatus: propTypes.func.isRequired,
  exportImage: propTypes.func.isRequired,
  setDronedeployAPI: propTypes.func.isRequired,
  exportStatus: propTypes.oneOf(['succeeded', 'failed', 'none']).isRequired
};

const mapDispatchToProps = dispatch => ({
  checkTokenStatus: (token, currentTime) => {
    dispatch(checkTokenStatus(token, currentTime));
  },
  exportImage: (formData) => {
    dispatch(exportImageAction(formData));
  },
  setDronedeployAPI: (api) => {
    dispatch(setDronedeployAPI(api));
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  exportStatus: state.dronedeploy.exportStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Container));
