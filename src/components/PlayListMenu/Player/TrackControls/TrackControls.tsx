import cx from 'classnames';

import { PlaybackState } from '../../usePlaybackState';

import VolumeControl from '../VolumeControl/VolumeControl'

import './TrackControls.scss';


interface TrackControlsProps {
  playbackState: PlaybackState
  randomize?: boolean
  onRandomizeToggle: () => void
  onLoopingToggle: () => void
  onVolumeChange: (volume: number) => void
  onVolumeToggle:() => void
}

const TrackControls = ({ playbackState, randomize, onRandomizeToggle, onLoopingToggle, onVolumeChange, onVolumeToggle }: TrackControlsProps) => {
  const { looping } = playbackState;

  return (
    <div className="track-controls">
      <i className={cx('icon fa fa-random', { active: randomize })} onClick={onRandomizeToggle} aria-hidden="true"></i>
      <i className={cx('icon fa fa-repeat', { active: looping })} onClick={onLoopingToggle} aria-hidden="true"></i>
      <VolumeControl
        playbackState={playbackState}
        onVolumeChange={onVolumeChange}
        onVolumeToggle={onVolumeToggle}
      />
  </div>
  )
}

export default TrackControls;
