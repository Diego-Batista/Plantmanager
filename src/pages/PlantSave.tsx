import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image,
    Alert,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import {PlantProps, savePlant} from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import {Button} from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    plant: PlantProps
}

export function PlantSave(){
    const navigation = useNavigation();
    const [selectDate, setSelectdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const route = useRoute();
    const {plant} = route.params as Params;


    function handleChangetime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectdate(new Date());
            return Alert.alert('Escolha uma hora no futuro ⏰')
        }

        if(dateTime)
            setSelectdate(dateTime);
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    

    async function handleSave(){
        
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectDate
            });


            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
              });

        }catch{
            Alert.alert('Não foi possivel salvar, 😢')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                    <View style={styles.platInfo}>
                        <SvgFromUri 
                            uri={plant.photo}
                            height={150}
                            width={150}
                        />

                        <Text style={styles.plantsName}>
                            {plant.name}
                        </Text>
                        <Text style={styles.plantAbout}>
                            {plant.about}
                        </Text>
                    </View>

                    <View style={styles.controller}>
                        <View style={styles.tipContainer}>
                            <Image 
                            source={ waterdrop}
                            style={styles.tipimage}
                            />

                            <Text style={styles.tipText}>
                                {plant.water_tips}
                            </Text>
                        </View>

                        <Text style={styles.alertLabel}>
                            Ecolha o melhor horário para ser lembrado:
                        </Text>

                        {
                            showDatePicker && (
                            <DateTimePicker
                            value={selectDate}
                            mode="time"
                            display="spinner"
                            onChange={handleChangetime}
                            />
                        )}

                        {
                            Platform.OS === "android" && (
                                <TouchableOpacity 
                                onPress={handleOpenDateTimePickerForAndroid}
                                style={styles.dataTimePickerButton}
                                >
                                    <Text style={styles.dataTimePickerText}>
                                        {`Mudar ${format(selectDate, 'HH:mm')}`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }

                        <Button 
                        title="Cadastrar planta"
                        onPress={handleSave}
                        />
                    </View>
            </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    platInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    plantsName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 70,
    },
    tipimage: {
        width: 56,
        height: 56,  
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dataTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dataTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    }
});
