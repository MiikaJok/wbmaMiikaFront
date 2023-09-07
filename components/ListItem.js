import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Card, Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity>
      <RNEListItem bottomDivider containerStyle={{width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            size="large"
            source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
          />
          <View style={{marginLeft: 10, width: '70%'}}>
            <RNEListItem.Title style={{fontWeight: 'bold'}}>
              {singleMedia.title.length > 15
                ? singleMedia.title.slice(0, 15) + '...'
                : singleMedia.title}
            </RNEListItem.Title>
            <RNEListItem.Subtitle>
              {singleMedia.description.length > 20
                ? singleMedia.description.slice(0, 20) + '...'
                : singleMedia.description}
            </RNEListItem.Subtitle>
          </View>
        </View>
        <Button
          onPress={() => {
            console.log('touched!', singleMedia.title);
            navigation.navigate('Single', singleMedia);
          }}
          containerStyle={{
            width: '18%',
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: [{translateY: -10}],
            borderRadius: 5,
          }}
          size="sm"
        >
          View
        </Button>
      </RNEListItem>
      <Card.Divider />
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
