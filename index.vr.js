import React from "react";
import { AppRegistry, asset, Pano, Text, View } from "react-vr";
import { fetchEvents } from "./src/fetchEvents";

export default class Hackathon extends React.Component {
  state = {
    events: []
  };

  componentWillMount() {
    fetchEvents().then(events => {
      this.setState({ events });
    });
  }

  render() {
    let title = null;

    if (this.state.events && this.state.events[0]) {
      title = this.state.events[0].schedule[0].title;
    }

    return (
      <View>
        <Pano source={asset("chess-world.jpg")}>
          {this.state.events[0] &&
            this.state.events[0].schedule.map((s, i) => (
              <Text
                key={i}
                style={{
                  backgroundColor: "#777879",
                  fontSize: 0.8,
                  fontWeight: "400",
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: "center",
                  textAlignVertical: "center",
                  transform: [{ translate: [0, i * 5, -10] }]
                }}
              >
                {s.title}
              </Text>
            ))}
        </Pano>
      </View>
    );
  }
}

AppRegistry.registerComponent("Hackathon", () => Hackathon);
