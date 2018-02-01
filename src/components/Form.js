import React from 'react';
import propTypes from 'prop-types';
import { succeeded } from '../constants/exportStatus';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      provider: '',
      tags: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exportStatus === succeeded) {
      this.setState({
        title: '',
        provider: '',
        tags: ''
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  exportDisabled() {
    if (this.state.title !== '' && this.state.provider !== '') {
      return false;
    }
    return true;
  }

  render() {
    const { exportImage } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <p>Export your imagery to OpenAerialMap. Provide additional details below to contribute your imagery. License and metadata can be updated on your user account on openaerialmap.org.</p>
          </div>
        </div>
        <div className="row">
          <div className="input-field col-4">
            <input
              id="title"
              type="text"
              className="validate"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="title">Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col-4">
            <input
              id="provider"
              type="text"
              className="validate"
              value={this.state.provider}
              onChange={this.handleChange}
            />
            <label htmlFor="provider">Provider</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col-4">
            <input
              id="tags"
              type="text"
              className="validate"
              value={this.state.tags}
              onChange={this.handleChange}
            />
            <label htmlFor="tags">Comma Separated Tags</label>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <button
              onClick={() => { exportImage(this.state); }}
              disabled={this.exportDisabled()}
            >Export Orthomosaic
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  exportImage: propTypes.func.isRequired,
  exportStatus: propTypes.oneOf(['succeeded', 'failed', 'none']).isRequired
};

export default Form;
