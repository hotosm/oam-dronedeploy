import React from 'react';
import propTypes from 'prop-types';

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

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { exportImage } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
              onClick={() => { this.props.exportImage(this.state); }}
            >Export Orthomosaic
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
