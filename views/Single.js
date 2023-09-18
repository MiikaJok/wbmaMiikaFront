import React, {useContext, useEffect, useRef, useState} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import {ActivityIndicator, ScrollView} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import {formatDate} from '../utils/functions';
import {Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite, useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Single = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const {user} = useContext(MainContext);
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesById, deleteFavourite} = useFavourite();

  const videoRef = useRef(null);


  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
    media_type: mediaType,
    file_id: fileId,
  } = route.params;

  // fetch owner info
  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(userId, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // add favourite
  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite({file_id: fileId}, token);
      response && setUserLike(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // delete favourite
  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(fileId, token);
      response && setUserLike(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // get favouritesbyid
  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesById(fileId);
      setLikes(likesData);
      // check if userid stored in context is in likesData
      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  //fullscreen video on landscape
  const unlockOrientation = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error(error.message);
    }
  };

  const lockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.current.presentFullscreenPlayer();
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    unlockOrientation();
    fetchOwner();

    //fullscreen video when changing on landscape
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          videoRef.current && showVideoInFullscreen();
        }
      },
    );

    //used when leaving (single.js view in this case)
    return () => {
      ScreenOrientation.removeOrientationChangeListeners(orientSub);
      lockOrientation();
    };
  }, []);
  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  // Show full image and metadata
  return (
    <ScrollView>
      <Card>
        <Card.Title>{title}</Card.Title>
        {mediaType === 'image' ? (
          <Card.Image
            style={{resizeMode: 'center'}}
            source={{uri: mediaUrl + filename}}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Video
            source={{uri: mediaUrl + filename}}
            style={{height: 300}}
            useNativeControls={true}
            isLooping={true}
            ref={videoRef}
          />
        )}
        <ListItem>
          <ListItem.Title style={{fontWeight: 'bold'}}>{title}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Text>{description}</Text>
        </ListItem>
        <ListItem>
          <Icon name="save" />
          <Text>{Math.round(filesize / 1024)} kB</Text>
        </ListItem>
        <ListItem>
          <Icon name="today" />
          <Text>Uploaded at: {formatDate(timeAdded)}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person" />
          <Text>username: {owner.username}</Text>
        </ListItem>
        <ListItem>
          {userLike ? (
            <Button onPress={removeFavourite} title={'dislike'}></Button>
          ) : (
            <Button onPress={createFavourite} title={'like'}></Button>
          )}
          <Text>Total likes: {likes.length}</Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};
Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
