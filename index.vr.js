import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Image,
  Text,
  View,
  Animated,
  Easing,
  VrButton,
} from "react-vr";

import fetchEvents from './src/fetchEvents';
import LivestreamVideo from './src/LivestreamVideo';
import SpeakerInfo from './src/SpeakerInfo';

export default class Hackathon extends React.Component {
  state = {
    events: [],
    bounceValue: new Animated.Value(0.5)
  };

  componentWillMount() {
    fetchEvents().then(events => {
      this.setState({ events });
    });
  }

  componentDidMount() {
    Animated.timing(this.state.bounceValue, {
      toValue: 1
    }).start();
  }

  render() {
    return (
      <View>
        <Pano source={asset("chess-world.jpg")}>
          <VrButton
            style={{width: 0.7, backgroundColor: 'red', height: 0.2, translate: [-1, -2, -3]}}
            onClick={()=>this._onViewClicked()} />
          {this.state.events[0] &&
            this.state.events[0].schedule.map((s, i) => (
              <View key={i}>
                {s.speakers[0] &&
                  <Image
                    style={{
                      width: 1,
                      height: 1,
                      transform: [{ translate: [0, i * 3, -10] }]
                    }}
                    source={{ uri: s.speakers[0].avatarUrl }}
                  />}
                <Text
                  style={{
                    fontSize: 0.8,
                    fontWeight: "400",
                    layoutOrigin: [0.5, 0.5],
                    paddingLeft: 0.2,
                    paddingRight: 0.2,
                    textAlign: "center",
                    textAlignVertical: "center",
                    transform: [{ translate: [0, i * 3, -10] }]
                  }}
                >
                  {s.title}
                </Text>
              </View>
            ))}
        </Pano>
      </View>
    );
  }
}

AppRegistry.registerComponent("Hackathon", () => Hackathon);
