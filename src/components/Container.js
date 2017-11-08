import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Facebook from './Facebook';
import { getToken } from '../util/authUtils';
import { checkTokenStatus } from '../actions/authActions';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    const token = getToken();
    const currentTime = new Date().getTime() / 1000;
    this.props.checkTokenStatus({ token, currentTime });
  }

  render() {
    const expandSection = classNames(
      'expand-section',
      { hidden: !this.state.expanded }
    );
    const arrowSrc = this.state.expanded ? 'arrow-up.svg' : 'arrow-down.svg';
    let authenticatedSection = null;
    if (this.props.isAuthenticated) {
      authenticatedSection = <span>You are authenticated</span>;
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
  checkTokenStatus: propTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  checkTokenStatus: (tokenTime) => {
    dispatch(checkTokenStatus(tokenTime));
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated')
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
