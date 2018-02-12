import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Player from './Player/Player'
import PlayerPreview from './PlayerPreview/PlayerPreview';
import PlayerControls from './PlayerControls/PlayerControls';
import ProgressControl from './ProgressControl/ProgressControl';

class SoundPlayer extends Component {
  static propTypes = {
    config: PropTypes.object,
    onHandleTrack: PropTypes.func,
    onTrackMove: PropTypes.func,
    onRandomToggle: PropTypes.func,
    onLoopToggle: PropTypes.func,
    onVolumeChange: PropTypes.func,
    onVolumeToggle: PropTypes.func,
    onSeekMouseDown: PropTypes.func,
    onSeekChange: PropTypes.func,
    onSeekMouseUp: PropTypes.func,
    onDuration: PropTypes.func,
    onProgress: PropTypes.func,
    onEnded: PropTypes.func
  }

  static defaultProps = {
    config: {},
    onHandleTrack: () => {},
    onTrackMove: () => {},
    onRandomToggle: () => {},
    onLoopToggle: () => {},
    onVolumeChange: () => {},
    onVolumeToggle: () => {},
    onSeekMouseDown: () => {},
    onSeekChange: () => {},
    onSeekMouseUp: () => {},
    onDuration: () => {},
    onProgress: () => {},
    onEnded: () => {}
  }

  render() {
    const { config } = this.props;

    return (
      <div className="player-container">
        <PlayerPreview
          config={config}
          onHandleTrack={this.props.onHandleTrack}
          onTrackMove={this.props.onTrackMove}
          tools={
            <PlayerControls
              config={config}
              onRandomToggle={this.props.onRandomToggle}
              onLoopToggle={this.props.onLoopToggle}
              onVolumeChange={this.props.onVolumeChange}
              onVolumeToggle={this.props.onVolumeToggle} />
          } />
        <ProgressControl
          config={config}
          onSeekMouseDown={this.props.onSeekMouseDown}
          onSeekChange={this.props.onSeekChange}
          onSeekMouseUp={this.props.onSeekMouseUp} />
        <Player 
          playerRef={this.props.playerRef}
          config={config}
          onDuration={this.props.onDuration}
          onProgress={this.props.onProgress}
          onEnded={this.props.onEnded} />
      </div>
    )
  }
}

export default SoundPlayer;
