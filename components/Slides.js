import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width; //dimension
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Slides extends React.Component {
  componentWillMount() {
    console.log('The width of my screen is: ' + SCREEN_WIDTH);
    console.log('The height of my screen is: ' + SCREEN_HEIGHT);
  }

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          buttonStyle={styles.buttonStyle}
          title="Onwards!"
          raised
          onPress={this.props.onComplete}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>//textstyle
          {this.renderLastSlide(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    padding: 30
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 5
  }
};

export default Slides;
