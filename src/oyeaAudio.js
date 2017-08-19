import React from 'react';
import Expo, { Asset, Audio, Font, Permissions } from 'expo';

export class OyeaAudio{
  constructor() {
    this.recording = null;
    this.sound = null;

    this._askForPermissions();
  }

  doNothing(){
    
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  //  this.setState({
  //    haveRecordingPermissions: response.status === 'granted',
  //  });
  };

  async _stopPlaybackAndBeginRecording() {
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setCallback(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    if (this.recording !== null) {
      this.recording.setCallback(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(
      {
  android: {
    extension: '.3gp',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.caf',
    audioQuality: 0x01,
    audioEncoder:'.mp3',
    sampleRate: 16000,
    numberOfChannels: 2,
    bitRate: 8000
  },
}
    );
  //  recording.setCallback(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call callback to update the screen.
  //  this.setState({
  //    isLoading: false,
  //  });
  }

  async _stopRecordingAndEnablePlayback() {

    await this.recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    const { sound, status } = await this.recording.createNewLoadedSound(
      {
        isLooping: true,
        isMuted: false,
        volume: 1,
        rate: 1,
        shouldCorrectPitch: false,
      },
    );
    this.sound = sound;
    this.sound.playAsync();

  }


  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.sound != null) {
      try {
        await this.sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

}
