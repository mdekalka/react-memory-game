import React, { Component } from 'react';
import sample from 'lodash/sample';

import SoundPlayer from '../SoundPlayer/SoundPlayer';
import SoundList from '../SoundList/SoundList';

import { musicList } from '../../config/soundAssets';

class SoundSection extends Component {
  state = {
    soundConfig: {
      duration: 0,
      played: 0,
      seeking: false,
      activeTrack: musicList[0],
      isPlaying: false,
      isRandom: false,
      isLoop: false,
      isMuted: false,
      volumeLevel: 10
    },
    musicList
  }

  onSoundConfigChange(config) {
    this.setState(({ soundConfig }) => ({
      soundConfig: {
        ...soundConfig,
        ...config
      }
    }));
  }

  setActiveTrack(track) {
    this.onSoundConfigChange({
      isPlaying: true,
      activeTrack: track,
      duration: 0,
      played: 0,
    });
  }

  onHandleTrack = (track) => {
    const { isPlaying, activeTrack } = this.state.soundConfig;

    // clicked on the same track
    if (activeTrack && activeTrack.id === track.id) {
      this.onSoundConfigChange({
        isPlaying: !isPlaying
      });
    } else {
      this.setActiveTrack(track);
    }
  }

  onVolumeChange = (volumeLevel) => {
    this.onSoundConfigChange({
      volumeLevel,
      isMuted: volumeLevel === 0 ? true : false
    });
  }

  onVolumeToggle = () => {
    const { isMuted } = this.state.soundConfig;

    this.onSoundConfigChange({
      isMuted: !isMuted
    });
  }

  onRandomToggle = () => {
    const { isRandom } = this.state.soundConfig;

    this.onSoundConfigChange({
      isRandom: !isRandom,
      isLoop: false
    });
  }

  onLoopToggle = () => {
    const { isLoop } = this.state.soundConfig;

    this.onSoundConfigChange({
      isLoop: !isLoop,
      isRandom: false
    });
  }

  onSeekMouseDown = () => {
    this.onSoundConfigChange({
      seeking: true
    });
  }

  onSeekChange = (value) => {
    this.onSoundConfigChange({
      played: value / 100
    });
  }

  onSeekMouseUp = (value) => {
    this.onSoundConfigChange({
      seeking: false
    });

    this.player.seekTo(value / 100)
  }

  onDuration = (duration) => {
    this.onSoundConfigChange({
      duration
    });
  }

  onProgress = (state) => {
    const { seeking } = this.state.soundConfig;

    if (!seeking) {
      this.onSoundConfigChange({
        played: state.played
      });
    }
  }

  onTrackMove = (isForward) => {
    const { activeTrack } = this.state.soundConfig;
    const currentIndex = this.state.musicList.findIndex(soundItem => soundItem.id === activeTrack.id);

    if (isForward) {
      let index = 0;

      if (currentIndex < this.state.musicList.length - 1) {
        index = currentIndex + 1;
      }

      this.onSoundConfigChange({
        activeTrack: musicList[index],
        duration: 0,
        played: 0
      });
    } else {
      if (currentIndex !== 0) {
        this.onSoundConfigChange({
          activeTrack: musicList[currentIndex - 1],
          duration: 0,
          played: 0
        });
      }
    }
  }

  getIndexesExpectCurrent() {
    const { activeTrack } = this.state.soundConfig;

    return this.state.musicList
      .filter(soundItem => soundItem.id !== activeTrack.id)
      .map(soundItem => soundItem.id);
  }

  onEnded = () => {
    const { isLoop, isRandom } = this.state.soundConfig;
    const indexesExpectCurrent = this.getIndexesExpectCurrent();

    if (isRandom) {
      const nextTrackId = sample(indexesExpectCurrent);
      const nextTrack = this.state.musicList.find(soundItem => soundItem.id === nextTrackId);

      this.setActiveTrack(nextTrack);
    } else if (!isLoop) {
      this.onTrackMove(true);
    }
  }

  render() {
    const { soundConfig, musicList } = this.state;

    return (
      <div>
        {
          !!soundConfig.activeTrack &&
          <SoundPlayer 
            playerRef={player => this.player = player}
            config={soundConfig}
            onHandleTrack={this.onHandleTrack}
            onTrackMove={this.onTrackMove}
            onRandomToggle={this.onRandomToggle}
            onLoopToggle={this.onLoopToggle}
            onVolumeChange={this.onVolumeChange}
            onVolumeToggle={this.onVolumeToggle}
            onSeekMouseDown={this.onSeekMouseDown}
            onSeekChange={this.onSeekChange}
            onSeekMouseUp={this.onSeekMouseUp}
            onDuration={this.onDuration}
            onProgress={this.onProgress}
            onEnded={this.onEnded} />
        }
        <SoundList config={soundConfig} list={musicList} onHandleTrack={this.onHandleTrack} />
      </div>
    )
  }
}

export default SoundSection;
