import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'

class Player extends Component {
  static propTypes = {
    config: PropTypes.object,
    onDuration: PropTypes.func,
    onProgress: PropTypes.func,
    onEnded: PropTypes.func
  }

  static defaultProps = {
    config: {},
    onDuration: () => {},
    onProgress: () => {},
    onEnded: () => {}
  }

  render() {
    const { config } = this.props;

    return (
        !!config.activeTrack &&
        <ReactPlayer
          ref={this.props.playerRef}
          playing={config.isPlaying}
          loop={config.isLoop}
          volume={config.isMuted ? 0 : config.volumeLevel / 100}
          url={config.activeTrack.src}
          muted={config.isMuted}
          onDuration={this.props.onDuration}
          onProgress={this.props.onProgress}
          onEnded={this.props.onEnded}
          width={'100%'}
          height={'20px'} />
    )
  }
}

export default Player;



