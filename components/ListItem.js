import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Card, Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single', singleMedia);
      }}
    >
      <RNEListItem bottomDivider>
        <Avatar size="large" source={{uri: mediaUrl + singleMedia.thumbnails.w160}}></Avatar>
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
        <Button size="sm">View</Button>
        </RNEListItem>
        <Card.Divider/>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
