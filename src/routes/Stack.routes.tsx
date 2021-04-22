import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {

} from 'react-native';

import Welcome from '../pages/Welcome';
import { UserIndentiFication } from '../pages/UserIndentiFication';
import { Confirmation } from '../pages/Confimation';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from '../routes/tab.routes';

import colors from '../styles/colors';
import react from 'react';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white,
            }
        }}
    >
        <StackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <StackRoutes.Screen
            name="UserIndentiFication"
            component={UserIndentiFication}
        />

        <StackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
        />

        <StackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />

        <StackRoutes.Screen
            name="PlantSave"
            component={PlantSave}
        />

        <StackRoutes.Screen
            name="MyPlants"
            component={AuthRoutes}
        />

    </StackRoutes.Navigator>
)

export default AppRoutes;