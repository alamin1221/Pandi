import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../utils/imageHelpers';

const TRACK = '/music/birthday-music.mp3';
const TITLE = 'Birthday Music';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [expanded, setExpanded] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted((value) => !value);
  };

  const handleError = () => {
    // Missing or unplayable file: keep the UI calm and disable playback.
    setAvailable(false);
    setPlaying(false);
  };

  const label = !available
    ? 'Music file not found. Add public/music/birthday-music.mp3 to enable the soundtrack.'
    : playing
      ? 'Pause birthday music'
      : 'Play birthday music';

  return (
    <div className={`music-player ${expanded ? 'is-expanded' : ''} ${!available ? 'is-unavailable' : ''}`}>
      <audio
        ref={audioRef}
        src={assetPath(TRACK)}
        preload="none"
        loop
        onError={handleError}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <button
        type="button"
        className="music-player__disc-button"
        onClick={toggle}
        disabled={!available}
        aria-label={label}
        title={label}
      >
        <span className={`music-player__disc ${playing ? 'is-spinning' : ''}`}>
          <span className="music-player__disc-hole" />
        </span>
      </button>

      <button
        type="button"
        className="music-player__toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-label={expanded ? 'Collapse music player' : 'Expand music player'}
      >
        <span className="music-player__bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span className="music-player__title">{TITLE}</span>
        <span className="music-player__chevron" aria-hidden="true">{expanded ? '⌄' : '⌃'}</span>
      </button>

      {expanded && (
        <div className="music-player__panel">
          <p className="music-player__panel-title">{TITLE}</p>
          {available ? (
            <>
              <div className="music-player__controls">
                <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                  {playing ? '❚❚' : '▶'}
                </button>
                <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                  {muted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  aria-label="Volume"
                />
              </div>
              <p className="music-player__hint">Sound starts only when you press play. ♡</p>
            </>
          ) : (
            <p className="music-player__hint">Add your music file to public/music/ to hear it here.</p>
          )}
        </div>
      )}
    </div>
  );
}
