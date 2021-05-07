import Slider from 'rc-slider';
import * as moment from 'moment';
import momentDurationFormatSetup  from 'moment-duration-format';

import { PlaybackState } from '../../usePlaybackState';

import './TrackProgress.scss';


momentDurationFormatSetup(moment);
const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);


const formatTime = (time: number) => {
  return moment.duration(time, 'seconds').format('m:ss', { trim: false });
}

interface TrackProgressProps {
  playbackState: PlaybackState
  onSeekMouseDown: () => void
  onSeekChange: (value: number) => void
  onSeekMouseUp: (value: number) => void
}

const TrackProgress = ({ playbackState, onSeekMouseDown, onSeekChange, onSeekMouseUp }: TrackProgressProps) => {
  const { duration, played } = playbackState;

  return (
    <div className="track-progress">
      <div className="track-progress-time">
        <time>{formatTime(duration * played)}</time>
        <time>{!!duration && formatTime(duration)}</time>
      </div>
      <SliderWithTooltip
        className="track-progress-seek"
        min={0}
        max={100}
        value={Math.round(played * 100)}
        tipFormatter={() => formatTime(duration * played)}
        onBeforeChange={onSeekMouseDown}
        onChange={onSeekChange}
        onAfterChange={onSeekMouseUp}
      />
    </div>
  )
}

export default TrackProgress;
