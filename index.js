/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


import ProfileInfo from './src/profile/ProfileScreen'

AppRegistry.registerComponent(appName, () => ProfileInfo);
