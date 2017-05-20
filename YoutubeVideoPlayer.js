import { BasicVideoPlayer, getSupportedFormats } from 'react-vr-web';

const youtubeSupportedFormats = ['youtube'];

class YoutubeVideoPlayer extends BasicVideoPlayer {
  static supportedFormats: ?Array<string> = youtubeSupportedFormats;

  constructor() {
    super();

    this.videoElement.id = 'video-player';

    //this.videoElement = document.createElement('div');
    //this.videoElement.id = 'video-player';
    //document.body.appendChild(this.videoElement);

    //this.player = YoutubePlayer('video-player');
  }

  initializeVideo(source) {
    this.videoElement.crossOrigin = 'anonymous';
    console.log('init');
    console.log('video?');
    this._bindMediaEvents();
    //this.player.loadVideoById(source);
    //this.player.playVideo();

    const sourceEl = document.createElement('source');
    sourceEl.src = source;
    sourceEl.type = 'video/youtube';
    this.videoElement.append(sourceEl);

    //this.player = new window.MediaElement('video-player');

    this.player = new window.YoutubeVideo({
      el: document.getElementById('video-player')
    });

    this.player.load().then(() => {
      this.player.play();
    });
  }

  dispose() {
    super.dispose();
  }
}

export default YoutubeVideoPlayer;