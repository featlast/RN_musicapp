import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../../routes/stack/MyStackNavigationScreens';
import {useGetInfoArtist} from '../../../hook/useGetInfoArtist';
import {colors} from '../../../theme/colors';
import Loader from '../../components/Loader';
import Icon, {Icons} from '../../components/IconComponent';
import {formatDuration} from '../../../helpers';
import format from 'human-format';

const DetailScreen: React.FC = () => {
  const {mbid} = useRoute<RouteProp<RootStackParams, 'Detail'>>().params;
  const {data, isLoading, isError, error} = useGetInfoArtist(mbid);

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.ui.white,
        }}>
        <Loader />
      </View>
    );
  if (isError)
    return (
      <Text style={{fontWeight: 'bold', fontFamily: 'Poppins', color: colors.ui.error}}>
        Error: {error?.message}
      </Text>
    );
  if (!data)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.ui.white,
        }}>
        <Loader />
        <Text style={{fontWeight: 'bold', fontFamily: 'Poppins', color: colors.ui.purple}}>
          No Hay Información del artista
        </Text>
      </View>
    );

  const imageUrl = data.album.image[2]['#text'];

  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: colors.ui.primary,
        width: '95%',
        height: 'auto',
        padding: 16,
        marginBottom: 8,
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#000F',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: imageUrl}}
          style={{width: 100, height: 100, borderRadius: 20}}
          resizeMode="contain"
        />
        <View style={{padding: 10, flex: 0.9}}>
          <Text style={{fontWeight: 'bold', fontFamily: 'Poppins', color: colors.ui.white}}>
            {data.album.title}
          </Text>
          <Text style={{fontWeight: 'bold', fontFamily: 'Poppins', color: colors.ui.white}}>
            {data.name}
          </Text>
          <Text style={{fontWeight: 'regular', fontFamily: 'Poppins', color: colors.ui.white}}>
            {formatDuration(Number(data.duration))}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              color: colors.ui.white,
              paddingTop: 10,
            }}>
            {data.artist.name}
          </Text>
        </View>

        <Icon
          type={Icons.MaterialIcons}
          name={'local-play'}
          size={20}
          style={{position: 'absolute', right: 30, top: 8}}
        />
        <Text
          style={{
            position: 'absolute',
            right: 15,
            top: 25,
            fontFamily: 'Poppins',
            color: colors.ui.white,
            fontSize: 13,
            textAlign: 'justify',
            fontWeight: 'bold',
          }}>
          {format(Number(data.playcount))}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 15,
            bottom: 8,
          }}>
          <Icon type={Icons.MaterialIcons} name="audiotrack" size={20} />
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              color: colors.ui.white,
              paddingTop: 10,
            }}>
            {format(Number(data.listeners))}
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 35, paddingTop: 10}}>
        <Text
          style={{
            fontFamily: 'Poppins',
            color: colors.ui.white,
            fontSize: 13,
            textAlign: 'justify',
          }}>
          {data.wiki.content}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins',
            color: colors.ui.white,
            fontSize: 13,
            textAlign: 'justify',
          }}>
          {data.wiki.published}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins',
            color: colors.ui.white,
            fontSize: 13,
            textAlign: 'justify',
          }}>
          {data.wiki.summary}
        </Text>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
