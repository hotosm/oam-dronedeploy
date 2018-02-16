import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { succeeded, none } from '../constants/exportStatus';

const ExportStatus = (props) => {
  const hidden = classNames({
    hidden: props.exportStatus === none,
    center: true
  });

  const message = props.exportStatus === succeeded ?
    'Export sent. Thank you for contributing.' : 'Export failed';

  return (
    <div className="row">
      <div className="col-4">
        <div className={hidden}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

ExportStatus.propTypes = {
  exportStatus: propTypes.oneOf(['succeeded', 'failed', 'none']).isRequired
};

export default ExportStatus;
