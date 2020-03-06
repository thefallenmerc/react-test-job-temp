/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  Button,
  FlatList,
  Linking,
  Platform,
} from 'react-native';

function openUrl(url: String) {
  return Linking.openURL(url);
}

function openSmsUrl(phone: string, body: string): Promise<any> {
  return openUrl(`sms:${phone}${getSMSDivider()}body=${body}`);
}
function getSMSDivider(): string {
  return Platform.OS === "ios" ? "&" : "?";
}

const imageList = [
  { key: '1', url: 'https://picsum.photos/seed/200/300?random=1&', by: 'Shubham Singh Chahar' },
  { key: '2', url: 'https://picsum.photos/seed/200/300?random=2&', by: 'Sonu Sharma' },
  { key: '3', url: 'https://picsum.photos/seed/200/300?random=3&', by: 'Sutej Pal' },
  { key: '4', url: 'https://picsum.photos/seed/200/300?random=4&', by: 'Rohan Kashyap' },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grayscale: false
    };
  }
  static navigationOptions = { // A
    title: 'Home',
  }; 

  get grayscale() {
    return this.state.grayscale;
  }
  setGrayscale(value) {
    this.setState({
      grayscale: value
    });
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', margin: 'auto', justifyContent: 'center' }}>
              <View style={{ flex: 1, paddingLeft: 40 }}>
                <Button
                  onPress={() => {
                    this.setGrayscale(false);
                  }}
                  title="Color"
                  color={this.state.grayscale ? 'gray' : 'dodgerblue'}

                />
              </View>
              <View style={{ flex: 1, paddingRight: 40 }}>
                <Button
                  onPress={() => {
                    this.setGrayscale(true);
                  }}

                  title="Grayscale"
                  color={!this.state.grayscale ? 'gray' : 'dodgerblue'}
                />
              </View>
            </View>
            {
              imageList.map(item => {
                return <View key={item.key} style={{ padding: 20, margin: 20 }}>
                  <Image source={{ uri: item.url + (this.state.grayscale ? 'grayscale' : '') }} style={{ width: 'auto', height: 200 }} />
                  <View style={{ marginTop: 15, marginBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>By {item.by}</Text>
                    <Button title="Share" color="red" onPress={() => {
                      openSmsUrl('', 'Hey Check this out rim://image/' + item.key + ' \nBy ' + item.by);
                    }} />
                  </View>
                </View>;
              })
            }
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

function ImageCard({ grayscale, id = '' }) {
  return <View key={id} style={{ padding: 20, margin: 20 }}>
    <Image source={{ uri: 'https://picsum.photos/seed/200/300?' + (grayscale ? 'grayscale' : '') }} style={{ width: 'auto', height: 200 }} />
    <View style={{ marginTop: 15, marginBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text>{item.by}</Text>
      <Button title="Share" color="red" />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#232323',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#232323',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
