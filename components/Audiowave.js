import React, { Component } from "react";
import { View, Button } from "react-native";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";

class Audiowave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordState: null,
    };
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };

  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    console.log("audioData", audioData);
  };

  render() {
    const { recordState } = this.state;

    return (
      <View>
        <AudioReactRecorder state={recordState} onStop={this.onStop} />

        <Button onClick={this.start}>Start</Button>
        <Button onClick={this.stop}>Stop</Button>
      </View>
    );
  }
}

export default Audiowave;
