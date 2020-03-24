import { AppRegistry } from 'react-native';
import App from './src/App';

import BackgroundGeolocation from "./src/react-native-background-geolocation";


// Make BackgroundGeolocation API global for handy access in Javascript Debugger console
global.BackgroundGeolocation = BackgroundGeolocation;

import BackgroundFetch from "react-native-background-fetch";

AppRegistry.registerComponent('BGGeolocation', () => App);

const issueHeadlessTask = async (event) => {
  const state = await BackgroundGeolocation.getState();
  console.log('IssueHeadlessTask got state: ', state);
  return Promise.resolve();
}

AppRegistry.registerHeadlessTask(
  'IssueHeadlessTask',
  () => issueHeadlessTask
);

/**
* BackgroundGeolocation Headless JS task.
* For more information, see:  https://github.com/transistorsoft/react-native-background-geolocation/wiki/Android-Headless-Mode
*/
let BackgroundGeolocationHeadlessTask = async (event) => {
  let params = event.params;
  console.log('[BackgroundGeolocation HeadlessTask] -', event.name, params);

  switch (event.name) {
    case 'heartbeat':
      // Use await for async tasks
      /* DISABLED
      let location = await BackgroundGeolocation.getCurrentPosition({
        samples: 1,
        persist: false
      });
      console.log('[BackgroundGeolocation HeadlessTask] - getCurrentPosition:', location);
      */
      break;
  }
}


BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);

/**
* BackgroundFetch Headless JS Task.
* For more information, see:  https://github.com/transistorsoft/react-native-background-fetch#config-boolean-enableheadless-false
*/
let BackgroundFetchHeadlessTask = async (event) => {
  console.log('[BackgroundFetch HeadlessTask] start');
  // Important:  await asychronous tasks when using HeadlessJS.
  /* DISABLED
  let location = await BackgroundGeolocation.getCurrentPosition({persist: false, samples: 1});
  console.log('- current position: ', location);
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  */
  console.log('[BackgroundFetch HeadlessTask] finished');

  BackgroundFetch.finish();
}


// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask);
