import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😃'
}

export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,

    } = routes.params as params;

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return (
        <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subTitle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button
                    onPress={handleMoveOn}
                    title={buttonTitle}
                    />
                </View>
            </View>        
        </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    emoji: {
        fontSize: 78,   
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color: colors.heading,
    },
    footer: {
        width:'100%',
        paddingHorizontal: 50,
        marginTop: 30,
    }
});