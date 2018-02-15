import React, { Component } from 'react';

import './SourceSection.scss';

class SourceSection extends Component {
  render() {
    return (
      <div className="source-section">
        <div>
          Source code: <a target="_blank" rel="noopener noreferrer" href="https://github.com/mdekalka/card-game">
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <div>Created by Aleh isakau</div>
      </div>
    )
  }
}

export default SourceSection;
