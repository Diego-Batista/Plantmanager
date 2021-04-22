import React, {useEffect, useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import userImg from '../assets/Diego.jpg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
    const [userName, setuserName] = useState<string>();

    useEffect(() => {
        async function loadStorageuserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setuserName(user || '');
        }

        loadStorageuserName();


    }, [userName]);

    return (
       <View style={styles.container}>
           <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.useName}>{userName}</Text>
           </View>

           <Image source={userImg} style={styles.image}/>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    useName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    }

});