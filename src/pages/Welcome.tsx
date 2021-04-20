import React from 'react';
import { 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import watering from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export default function Welcome() {
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIndentiFication');
    }
    

  return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
        <Text style={styles.title}>
        Gerencie {'\n'}
        sua plantas de {'\n'} forma fácil
        </Text>

        <Image source={watering} style={styles.image}/>   

        <Text style={styles.subTitle}>
                Não esqueça mais de regar suas {'\n'} plantas.
                Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleStart}
            >
            <Text>
                <Feather
                    name="chevron-right" 
                    style={styles.buttonIcon}
                    />
            </Text>
        </TouchableOpacity>
        </View>
        </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 34,
        fontFamily: fonts.heading,
        lineHeight: 40,
    },
    subTitle: { 
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 28,
    }
});
