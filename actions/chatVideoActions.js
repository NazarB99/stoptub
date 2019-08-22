/* eslint-disable no-shadow */
import {
  VIDEO_SESSION_OBTAINED,
  CLEAR_VIDEO_SESSION,
  CALL_IN_PROGRESS,
  USER_IS_CALLING,
  LOCAL_VIDEO_STREAM_OBTAINED,
  REMOTE_VIDEO_STREAM_OBTAINED,
  MUTE_AUDIO,
  CLEAR_VIDEO_STREAMS,
  SET_MEDIA_DEVICES,
} from './type/types'

export const videoSessionObtained = videoSession => ({type: VIDEO_SESSION_OBTAINED, videoSession})
export const clearVideoSession = () => ({type: CLEAR_VIDEO_SESSION})

export const userIsCalling = userIsCalling => ({type: USER_IS_CALLING, userIsCalling})
export const callInProgress = callInProgress => ({type: CALL_IN_PROGRESS, callInProgress})

export const localVideoStreamObtained = localStream => ({
  type: LOCAL_VIDEO_STREAM_OBTAINED,
  stream: localStream,
  userId: 'local',
})
export const remoteVideoStreamObtained = (remoteStream, userId) => ({
  type: REMOTE_VIDEO_STREAM_OBTAINED,
  stream: remoteStream,
  userId,
})
export const clearVideoStreams = () => ({type: CLEAR_VIDEO_STREAMS})

export const muteAudio = mute => ({type: MUTE_AUDIO, mute})

export const setMediaDevices = mediaDevices => ({type: SET_MEDIA_DEVICES, mediaDevices})
