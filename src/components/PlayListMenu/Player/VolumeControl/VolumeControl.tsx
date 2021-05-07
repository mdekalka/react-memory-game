import Slider from 'rc-slider';

import { PlaybackState } from '../../usePlaybackState';

import './VolumeControl.scss';

interface VolumeControlProps {
  playbackState: PlaybackState
  onVolumeChange: (volume: number) => void
  onVolumeToggle:() => void
}

const VolumeControl = ({ playbackState, onVolumeChange, onVolumeToggle}: VolumeControlProps) => {
  const { muted, volume } = playbackState;

  return (
    <div className="volume-control">
      <div className="volume-control-slider">
        <Slider vertical min={0} max={100} value={muted ? 0 : volume} onChange={onVolumeChange} />
      </div>
      <i className={`icon fa-fw fa fa-volume-${muted ? 'off' : 'up'}`} onClick={onVolumeToggle} aria-hidden="true"></i>
    </div>
  )
}

export default VolumeControl;
