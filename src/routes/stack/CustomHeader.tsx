import {Text, View, StyleSheet} from 'react-native';
import {type NavigationProp, useNavigation, useRoute} from '@react-navigation/native';

import {colors} from '../../theme/colors';
import {RootStackParams} from './MyStackNavigationScreens';
import Icon, {Icons} from '../../presentation/components/IconComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomHeader: React.FC<{title: string}> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: colors.ui.purple,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: '99%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          paddingLeft: 15,
        }}>
        {route.name !== 'Home' && (
          <TouchableOpacity hitSlop={30} onPress={() => navigation.goBack()}>
            <Icon type={Icons.MaterialIcons} name="arrow-back-ios" />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            color: colors.ui.white,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          paddingRight: 15,
        }}>
        {route.name !== 'Profile' && (
          <TouchableOpacity hitSlop={30} onPress={() => navigation.navigate('Profile')}>
            <Icon type={Icons.SimpleLineIcons} name="playlist" />
          </TouchableOpacity>
        )}
        {route.name === 'Profile' && (
          <TouchableOpacity hitSlop={30} onPress={() => navigation.navigate('Home')}>
            <Icon type={Icons.MaterialIcons} name="home" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
