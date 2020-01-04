'use strict';

import {StyleSheet} from 'react-native';

let styles = StyleSheet.create({
  deleteIcon: {
    width: 20,
    height: 20,
    margin: 10,
    opacity: 0.6,
  },
  searchHeader: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 18,
    marginTop: 30,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 6,
    paddingTop: 6,
  },
  itemContent: {
    flex: 1,
    marginLeft: 13,
    marginTop: 6,
    // backgroundColor: 'blue',
  },
  itemHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: '#6435c9',
    marginBottom: 6,
  },
  itemMeta: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 6,
  },
  redText: {
    color: '#db2828',
    fontSize: 15,
  },
  verticalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
  },
  overlayHeader: {
    fontSize: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
  },
  overlaySubHeader: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
    paddingTop: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    width: 99,
    height: 138,
    margin: 6,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.8)',
    lineHeight: 26,
  },
  container: {
    backgroundColor: '#eae7ff',
    flex: 1,
  },
  button: {
    margin: 10,
    justifyContent: 'flex-end',
    marginBottom: 90,
  },
  buttonInner: {
    backgroundColor: '#9182E6',
    borderRadius: 3,
    padding: 13,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  casts: {
    flexDirection: 'row',
  },
  avatar: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
