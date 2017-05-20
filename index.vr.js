import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Video,
  VideoControl,
  MediaPlayerState,
} from 'react-vr';

export default class Hackathon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View
          style={{
            alignItems: 'center',
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{translate: [0, 0, -4]}],
          }}>
          <Video
            style={{height: 2.25, width: 4}}
            source={[{ format: "youtube", uri: "nhNiKel6U9Y" }]}
            playerState={this.state.playerState}
          />
          <VideoControl style={{height: 0.2, width: 4}} playerState={this.state.playerState} />
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('Hackathon', () => Hackathon);
