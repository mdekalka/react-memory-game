import { forwardRef, LegacyRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

import { PlaybackState } from '../../usePlaybackState';


interface PlayerProps {
  playbackState: PlaybackState
  activeTrack: Track
  onDuration: ReactPlayerProps['onDuration']
  onProgress: ReactPlayerProps['onProgress']
  onEnded: ReactPlayerProps['onEnded']
}

type Ref = LegacyRef<ReactPlayer>

const AudioPlayer = forwardRef(({ playbackState, activeTrack, onDuration, onProgress, onEnded }: PlayerProps, ref: Ref) => {
  if (!activeTrack || !playbackState) return null;

  const { playing, looping, muted, volume } = playbackState;

  return (
    <ReactPlayer
      ref={ref}
      playing={playing}
      loop={looping}
      volume={muted ? 0 : volume / 100}
      url={activeTrack.src}
      muted={muted}
      onDuration={onDuration}
      onProgress={onProgress}
      onEnded={onEnded}
      width='100%'
      height='0px' />
  )
})

export default AudioPlayer;
