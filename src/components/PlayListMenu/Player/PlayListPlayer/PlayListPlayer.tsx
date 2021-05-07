import { useState, useRef, LegacyRef } from 'react';
import ReactPlayer from 'react-player';
import sample from 'lodash/sample';

import { PlaybackState } from '../../usePlaybackState';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import TrackProgress from '../TrackProgress/TrackProgress';
import TrackControls from '../TrackControls/TrackControls';
import TrackPreview from '../TrackPreview/TrackPreview';


interface PlayListPlayerProps {
  tracks: Track[]
  activeTrack: Track
  playbackState: PlaybackState
  updatePlaybackState: (state: Partial<PlaybackState>) => void
  onChangeTrack: (track: Track) => void
}

const PlayListPlayer = ({ tracks, activeTrack, playbackState, updatePlaybackState, onChangeTrack }: PlayListPlayerProps) => {
  const playerRef = useRef(null);
  const [ randomize, setRandomize] = useState(false);

  const onToggleTrack = (track: Track) => {
    if (activeTrack.id !== track.id) return;

    updatePlaybackState({ playing: !playbackState.playing });
  }

  const onTrackMove = (forward?: boolean) => {
    const currentTrackIndex = tracks.findIndex(({ id }) => id === activeTrack.id);
    let index = 0;

    if (forward) {
      index = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0
    } else {
      index = currentTrackIndex !== 0 ? currentTrackIndex - 1 : tracks.length - 1;
    }

    onChangeTrack(tracks[index]);
    updatePlaybackState({ duration: 0, played: 0 });
  }

  const onRandomizeToggle = () => {
    setRandomize(value => !value);
    updatePlaybackState({ looping: false });
  }

  const onLoopingToggle = () => {
    setRandomize(false);
    updatePlaybackState({ looping: !playbackState.looping });
  }

  const onVolumeChange = (volume: number) => {
    updatePlaybackState({ volume, muted: volume === 0 });
  }

  const onVolumeToggle = () => {
    updatePlaybackState({ muted: !playbackState.muted });
  }

  const onSeekMouseDown = () => {
    updatePlaybackState({ seeking: true });
  }

  const onSeekChange = (value: number) => {
    updatePlaybackState({ played: value / 100 });
  }

  const onSeekMouseUp = (value: number) => {
    const ref: LegacyRef<ReactPlayer> = playerRef;

    ref?.current?.seekTo(value / 100);
    updatePlaybackState({ seeking: false });
  }

  const onDuration = (duration: number) => {
    updatePlaybackState({ duration });
  }

  const onProgress = ({ played }: any) => {
    const { seeking } = playbackState;

    if (!seeking) {
      updatePlaybackState({ played });
    }
  }

  const onEnded = () => {
    const { looping } = playbackState;

    if (randomize) {
      const availableTracks = tracks.filter(({ id }) => id !== activeTrack.id);
      const newActiveTrack = sample(availableTracks) as Track;

      onChangeTrack(newActiveTrack);
      return
    }

    if (!looping) {
      onTrackMove(true);
    }
  }

  return (
    <div className="playlist-player">
      <TrackPreview
        playbackState={playbackState}
        activeTrack={activeTrack}
        onToggleTrack={onToggleTrack}
        onTrackMove={onTrackMove}
      >
        <TrackControls
          playbackState={playbackState}
          randomize={randomize}
          onRandomizeToggle={onRandomizeToggle}
          onLoopingToggle={onLoopingToggle}
          onVolumeChange={onVolumeChange}
          onVolumeToggle={onVolumeToggle}
        />
      </TrackPreview>
      <TrackProgress
        playbackState={playbackState}
        onSeekMouseDown={onSeekMouseDown}
        onSeekChange={onSeekChange}
        onSeekMouseUp={onSeekMouseUp}
      />
      <AudioPlayer 
        ref={playerRef}
        playbackState={playbackState}
        activeTrack={activeTrack}
        onDuration={onDuration}
        onProgress={onProgress}
        onEnded={onEnded}
      />
    </div>
  )
}

export default PlayListPlayer;
