import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image,
    FlatList
} from 'react-native';
import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantProps, loadPlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants(){
    const [myPlants, seMyplants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [proximaRegada, setProximaRegada] = useState<string>();

    useEffect(() => {
        async function loadStoragedData(){
            const plantsStoraged = await loadPlant();

            const nexTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setProximaRegada(
                `Não esqueça de regar a ${plantsStoraged[0].name} daqui a ${nexTime} horas.`
            )

            seMyplants(plantsStoraged);
            setLoading(false);
        }

        loadStoragedData();
    }, []);

    return (
       <View style={styles.container}>
           <Header />

           <View style={styles.spotliLight}>
               <Image 
               source={waterdrop} 
               style={styles.spotliLightImage}
               />
               <Text style={styles.spotliLightText}>
                   {proximaRegada}
               </Text>
           </View>

           <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    //contentContainerStyle={{flex: 1}}
                />
           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotliLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotliLightImage: {
        width: 60,
        height: 60,
    },
    spotliLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }
});
