import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {

} from 'react-native';

import Welcome from '../pages/Welcome';
import { UserIndentiFication } from '../pages/UserIndentiFication';
import { Confirmation } from '../pages/Confimation';
import { PlantSelect } from '../pages/PlantSelect';

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
            component={PlantSelect}
        />

    </StackRoutes.Navigator>
)

export default AppRoutes;