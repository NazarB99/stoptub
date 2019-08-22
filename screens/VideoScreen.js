/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {StyleSheet, View, StatusBar, Dimensions, Platform} from 'react-native'
import {RTCView} from 'react-native-webrtc'
import {connect} from 'react-redux'

import CallingLoader from '../components/CallingLoader'
import ToolBar from '../components/Toolbar'

const [screenH, screenW] = [Dimensions.get('window').height, Dimensions.get('window').width]
export class VideoScreen extends React.Component {
  render() {
    console.log('VIDEOOOOOOOOOO')
    console.log(this.props.videoStreamsDataSource)
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar backgroundColor="black" barStyle="light-content" animated />
        <View removeClippedSubviews style={{flex: 1, overflow: 'hidden'}}>
          {this.props.videoStreamsDataSource.map((item, i, arr) => (
            <View
              style={
                item.userId === 'local' ? styles.videoViewWrapperLocal : styles.videoViewWrapper
              }
              key={i}
            >
              {item.userId === 'local' ? (
                <RTCView
                  style={styles.videoView(arr.length)}
                  key={item.userId}
                  streamURL={item.stream.toURL()}
                  zOrder={10000}
                />
              ) : (
                <RTCView
                  style={styles.videoView(arr.length)}
                  key={item.userId}
                  streamURL={item.stream.toURL()}
                />
              )}
            </View>
          ))}
        </View>
        <CallingLoader />
        <ToolBar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  videoViewWrapper: {
    flex: 1,
    overflow: 'hidden',
    zIndex: 1,
  },
  videoViewWrapperLocal: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 50,
    height: 80,
    zIndex: 10,
  },
  videoView: count =>
    Platform.select({
      ios: {
        height: screenH,
        width: screenW,
        top: count === 2 ? -screenH / 4 : 0,
        backgroundColor: 'black',
      },
      android: {
        flex: 1,
        backgroundColor: 'black',
      },
    }),
})

const mapStateToProps = state => {
  // convert map to array
  let dataSource = []

  Object.keys(state.videosession.videoStreams).map(userId => {
    dataSource.push({userId, stream: state.videosession.videoStreams[userId]})
  })

  return {
    videoStreamsDataSource: dataSource,
    selected: state.chat_selected,
  }
}

export default connect(
  mapStateToProps,
  null
)(VideoScreen)
