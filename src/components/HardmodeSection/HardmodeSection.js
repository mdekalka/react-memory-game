import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle'

import './HardmodeSection.scss';

class HardmodeSection extends Component {
  static propTypes = {
    options: PropTypes.object,
    onStepLimitToggle: PropTypes.func,
    onRandomizeCellsToggle: PropTypes.func
  }

  static defaultProps = {
    options: {},
    onStepLimitToggle: () => {},
    onRandomizeCellsToggle: () => {}
  }

  render() {
    const { options } = this.props;

    return (
      <div className="hardmode-section">
        <div className="section-row">
          <label className="toggle-label pointer">
            <Toggle defaultChecked={!!options.stepsLimit} onChange={this.props.onStepLimitToggle} />
            <span className={`label-header ${options.stepsLimit ? 'active' : ''}`}>Limited steps</span>
          </label>
          <p className="section-description">
            If this option is enabled - you will have limited steps to finish the game.
          </p>
          {
            options.stepsLimit &&
            <p className="section-description">You have only <span className="highlight">{options.stepsLimit}</span> attempts to finish the game</p>
          }
        </div>
        <div className="section-row">
          <label className="toggle-label pointer">
            <Toggle defaultChecked={options.randomizeCells} disabled={true} onChange={this.props.onRandomizeCellsToggle} />
            <span className={`label-header ${options.randomizeCells ? 'active' : ''}`}>Randomize cells</span>
          </label>
          <p className="section-description">
            If this option is enabled - all hidden cells will be randomize position after each step
          </p>
          {
            options.randomizeCells &&
            <p className="section-description">
              <span className="highlight">Are you sure?</span>
            </p>
          }
        </div>
      </div>
    )
  }
}

export default HardmodeSection;
