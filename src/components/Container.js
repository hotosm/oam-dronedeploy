import React from 'react';
import classNames from 'classnames';
import Facebook from './Facebook';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  render() {
    const expandSection = classNames(
      'expand-section',
      { hidden: !this.state.expanded }
    );
    const arrowSrc = this.state.expanded ? 'arrow-up.svg' : 'arrow-down.svg';

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
            <Facebook />
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
