import { useState, memo } from 'react';
import cx from 'classnames';

import { TRACKS_LIST } from '../../lists/tracksList';
import { usePlaybackState } from './usePlaybackState';

import PlayListPlayer from './Player/PlayListPlayer/PlayListPlayer';
import TrackList from './TrackList/TrackList';
import Drawer from '../Drawer/Drawer';

import './PlayListMenu.scss';


const PlayListMenu = () => {
  const [ activeTrack, setActiveTrack ] = useState(TRACKS_LIST[0]);
  const [ playbackState, setPlaybackState ] = usePlaybackState();
  const [ opened, setOpened ] = useState(false);

  const onChangeTrack = (track: Track) => {
    const { playing } = playbackState;

    // clicked on the same track
    if (activeTrack && activeTrack.id === track.id) {
      setPlaybackState({ playing: !playing });
    } else {
      setActiveTrack(track);
      setPlaybackState({ playing: true, duration: 0, played: 0 });
    }
  }

  return (
    <>
      <button className="btn shadow open-playlist" onClick={() => setOpened(true)}>
        <i className={cx('fa fa-music', { playing: playbackState.playing })} aria-hidden="true"></i>
      </button>
      <Drawer opened={opened} position="right" onClose={() => setOpened(false)} closeOutside>
        {activeTrack &&
          <PlayListPlayer
            tracks={TRACKS_LIST}
            activeTrack={activeTrack}
            playbackState={playbackState}
            onChangeTrack={onChangeTrack}
            updatePlaybackState={setPlaybackState}
          />}
        <TrackList
          tracks={TRACKS_LIST}
          activeTrack={activeTrack}
          playbackState={playbackState}
          onChangeTrack={onChangeTrack}
        />
      </Drawer>
    </>
  )
}

export default memo(PlayListMenu);
