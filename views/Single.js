import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {mediaUrl} from '../utils/app-config';
import {formatDate} from '../utils/functions';
import {Card, Icon, ListItem, Text} from '@rneui/themed';

const Single = ({route, navigation}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
  } = route.params;
  // Show full image and metadata
  return (
    <Card>
      <Card.Image
       style={{resizeMode: 'center' }}
        source={{uri: mediaUrl + filename}}
        PlaceholderContent={<ActivityIndicator />}
      />
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
        <Text>{userId}</Text>
      </ListItem>
    </Card>
  );
};
Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
