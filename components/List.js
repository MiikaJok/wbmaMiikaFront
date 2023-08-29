import {FlatList} from 'react-native';
import ListItem from './ListItem';
import { useMedia } from '../hooks/ApiHooks';

const List = () => {

const {mediaArray} = useMedia();
//console.log("mitä tapahtuu", mediaArray);

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};
export default List;
