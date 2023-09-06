import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../utils/app-config';

const Single = ({route, navigation}) => {
  console.log('route paramas', route)
  const singleMedia = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: '100%', height: '50%', resizeMode: 'contain'}}
        source={{uri: mediaUrl + singleMedia.filename}}
      />
      <Text>{singleMedia.title}</Text>
      <Text>{singleMedia.description}</Text>
      <Text>{singleMedia.user_id}</Text>
      <Text>{singleMedia.time_added}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});
Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default Single;

