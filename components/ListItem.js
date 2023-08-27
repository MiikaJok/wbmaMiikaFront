import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({ singleMedia }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched!', singleMedia.title);
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            style={styles.backgroundImage}
            source={{ uri: singleMedia.thumbnails.w160 }}
          />
          <View style={styles.textContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{singleMedia.title}</Text>
            </View>
            <Text style={styles.description}>{singleMedia.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 10,
    padding: 10,
    backgroundColor: '#fc9003',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  contentContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backgroundImage: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    opacity: 0.7,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    marginVertical: 10,
    color: '#080808',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
