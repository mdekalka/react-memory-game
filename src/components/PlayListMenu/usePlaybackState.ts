import { useState, useCallback } from 'react';


const initialState = {
  duration: 0,
  played: 0,
  seeking: false,
  playing: false,
  looping: false,
  muted: false,
  volume: 10
}

export type PlaybackState = typeof initialState;

export const usePlaybackState = (): [PlaybackState, (state: Partial<PlaybackState>) => void] => {
  const [ state, setState ] = useState(initialState);

  const updatePlaybackState = useCallback((newState) => {
    setState(state => ({ ...state, ...newState }));
  }, [])

  return [ state, updatePlaybackState ];
}
