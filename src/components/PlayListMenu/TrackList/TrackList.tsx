import cx from 'classnames';

import './TrackList.scss';


interface TrackListProps {
  playbackState: any,
  tracks: Track[],
  activeTrack: Track,
  onChangeTrack: (track: Track) => void
}

const TrackList = ({ tracks, activeTrack, playbackState, onChangeTrack }: TrackListProps) => {
  const isActiveTrackPlaying = (track: Track) => {
    return playbackState.playing && activeTrack.id === track.id;
  }

  return (
    <ul className="tracks-list">
      {tracks.map(track => (
        <li
          key={track.id}
          className={cx('track pointer', { active: activeTrack.id === track.id })}
          onClick={() => onChangeTrack(track)}>
            <i className={cx('icon fa fa-fw', `fa-${isActiveTrackPlaying(track) ? 'pause' : 'play'}`)} aria-hidden="true"></i>
          <span className="track-name">{track.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default TrackList;
