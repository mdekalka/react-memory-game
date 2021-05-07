import { ReactNode } from 'react';

import { PlaybackState } from '../../usePlaybackState';

import './TrackPreview.scss';

interface TrackProps {
  playbackState: PlaybackState
  activeTrack: Track
  onToggleTrack: (track: Track) => void
  onTrackMove: (next?: boolean) => void
  children?: ReactNode
}

const TrackPreview = ({ playbackState, activeTrack, onToggleTrack, onTrackMove, children }: TrackProps) => {
  if (!activeTrack) return null;
  
  const { playing } = playbackState;
  const { name, icon } = activeTrack;

  return (
    <div className="track-preview">
      <img className="track-preview-icon" src={icon} alt='track preview icon' />
      <div className="track-preview-controls">
        <i
          className={`icon fa fa-fw fa-${playing ? 'pause' : 'play'}`}
          onClick={() => onToggleTrack(activeTrack)}
          aria-hidden="true">
        </i>
        <i className="icon fa fa-step-backward" onClick={() => onTrackMove()} aria-hidden="true"></i>
        <i className="icon fa fa-step-forward" onClick={() => onTrackMove(true)} aria-hidden="true"></i>
      </div>
      <div className="track-title ellipsis">{name}</div>
      {children}
    </div>
  )
}

export default TrackPreview;
