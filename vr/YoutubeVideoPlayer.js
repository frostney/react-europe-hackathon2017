import YoutubePlayer from 'youtube-player';
import html2canvas from 'html2canvas';

const MEDIA_EVENT_TYPES = [
  'canplay',
  'durationchange',
  'ended',
  'error',
  'timeupdate',
  'pause',
  'playing',
];

/**
 * The basic video player
 */
export default class BasicVideoPlayer {
  onMediaEvent: ?(any) => void;
  videoElement: HTMLVideoElement;
  _muted: boolean;
  _volume: number;

  static supportedFormats: ?Array<string> = ['youtube'];

  constructor() {
    this.videoElement = document.createElement('canvas');
    this.iframeElement = document.createElement('div');
    this.iframeElement.id = 'youtube-video-player';
    this.iframeElement.style.display = 'none';
    if (document.body) {
      document.body.appendChild(this.iframeElement);
    }

    this.player = null;

    this._volume = 1.0;
    this._muted = false;

    this.onMediaEvent = undefined;
    (this: any)._onMediaEvent = this._onMediaEvent.bind(this);
  }

  _convertToCanvas(callback) {
    const convert = () => {
      if (this.videoElement !== null) {
        html2canvas('youtube-video-player').then(function(canvas) {
          this.videoElement = canvas;
        });
      }

      window.requestAnimationFrame(convert);
    }

    convert();
  }

  initializeVideo(src: string, metaData: any) {
    this.player = YoutubePlayer('youtube-video-player', {
      videoId: src
    });
    this._bindMediaEvents();
    this.play();
  }

  hasEnoughData(): boolean {
    return true;
  }

  _bindMediaEvents() {
    /* MEDIA_EVENT_TYPES.forEach(eventType => {
      this.iframeElement.addEventListener(eventType, this._onMediaEvent);
    }); */
  }

  _unbindMediaEvents() {
    /* MEDIA_EVENT_TYPES.forEach(eventType => {
      this.iframeElement.removeEventListener(eventType, this._onMediaEvent);
    }); */
  }

  _onMediaEvent(event: any) {
    if (typeof this.onMediaEvent === 'function') {
      this.onMediaEvent(event);
    }
  }

  setVolume(volume: number) {
    // this.iframeElement.volume = volume;
  }

  setMuted(muted: boolean) {
    // this.iframeElement.muted = muted;
  }

  play() {
    this.player.playVideo().then(() => {
      this._convertToCanvas();
    });
  }

  pause() {
    this.player.stopVideo();
  }

  seekTo(position: number) {
    // this.iframeElement.currentTime = position;
  }

  dispose() {
    this.pause();
    if (document.body) {
      document.body.removeChild(this.iframeElement);
    }
    this._unbindMediaEvents();
    this.onMediaEvent = undefined;
  }
}
