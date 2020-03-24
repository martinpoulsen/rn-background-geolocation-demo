import React from 'react'
import {Component} from 'react';

import BackgroundGeolocation, {
  State,
  Location,
  LocationError,
  Geofence,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  ConnectivityChangeEvent,
  DeviceSettings,
  DeviceSettingsRequest,
  Notification,
  Authorization,
  TransistorAuthorizationToken
} from './react-native-background-geolocation'

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Container,
  Button, Icon,
  Text,
  Header, Title,
  Left, Body, Right
} from 'native-base';

export default class Issue extends Component<any, any> {

  componentDidMount() {
    console.log('Issue # componentDidMount()');

    const config: any = {
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 25,
      foregroundService: false,
      debug: true,
      reset: true,
      locationUpdateInterval: 5000,
      stopDetectionDelay: 5,
      stopTimeout: 10,
      enableHeadless: true,
      stopOnTerminate: false,
      startOnBoot: true,
      stationaryRadius: 25,
      activityType: BackgroundGeolocation.ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION,
      preventSuspend: true,
      heartbeatInterval: 300,
      autoSync: false,
      disableLocationAuthorizationAlert: true,
    }
    
    BackgroundGeolocation.ready(config, (state: State) => {
      console.log('BackgroundGeolocation.ready -> state: ', state);
    }, (error: any) => {
      console.warn('BackgroundGeolocation.ready -> error: ', error);
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
          </Left>
          <Body>
            <Title style={styles.title}>DUMMY VIEW</Title>
          </Body>
          <Right>
          </Right>
        </Header>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272727'
  },
  header: {
    backgroundColor: '#fedd1e'
  },
  title: {
    color: '#000'
  }
});
