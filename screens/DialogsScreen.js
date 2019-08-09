/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React, {Component} from 'react'
import {RefreshControl, StatusBar, FlatList, StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux'

import Chat from '../config/ChatConfig'
import {fetchDialogs, addNewDialog} from '../actions/chatDialogsActions'
import Dialog from '../components/Dialog'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noChats: {
    position: 'absolute',
    alignSelf: 'center',
    top: '42%',
  },
  noChatsText: {
    fontSize: 20,
  },
})

class DialogsScreen extends Component {
  state = {
    refreshing: false,
  }

  componentWillMount() {
    this.getConversations()
  }

  getConversations() {
    Chat.getConversations()
      .then(dialogs => {
        console.log(dialogs)
        this.props.fetchDialogs(dialogs)
        this.setState({refreshing: false})
      })
      .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
  }

  //   createDialog() {
  //     const {usersSelect, addNewDialog} = this.props
  //     // const dialogType = usersSelect.length > 1 ? 2 : 3

  //     Chat.createConversation({
  //       type: 3,
  //       occupants_ids: [164437],
  //     //   name: 'MR',
  //     })
  //       .then(dialog => {
  //         addNewDialog(dialog)
  //         // this.toChat(dialog)
  //       })
  //       .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
  //   }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.getConversations()
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        colors={['red', 'green', 'blue']}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    )
  }

  _renderDialog(dialog) {
    return <Dialog dialog={dialog} />
  }

  render() {
    const {dialogs} = this.props
    console.log('HERE DIALOGS')
    console.log(dialogs)

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" animated />
        {!dialogs.length && (
          <View style={styles.noChats}>
            <Text style={styles.noChatsText}>No chats yet</Text>
          </View>
        )}
        <FlatList
          data={dialogs}
          keyExtractor={item => item.id}
          renderItem={({item}) => this._renderDialog(item)}
          refreshControl={this._renderRefreshControl()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  dialogs: state.chat_dialog,
})

const mapDispatchToProps = dispatch => ({
  fetchDialogs: dialogs => dispatch(fetchDialogs(dialogs)),
  addNewDialog: dialog => dispatch(addNewDialog(dialog)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogsScreen)
