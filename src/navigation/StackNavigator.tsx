


import { createStackNavigator } from '@react-navigation/stack';
import { PrincipalScreen } from '../screens/PrincipalScreen';
import { ConfigScreen } from '../screens/ConfigScreen';
import { PesdasScreen } from '../screens/PesdasScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
        
        screenOptions={{
            title: ' HOME ',
            headerTitleAlign: 'center',
            headerBackgroundContainerStyle:{backgroundColor: '#1a1a51'},
            cardStyle:{
                backgroundColor: 'white',
            }
        }}
    >
      <Stack.Screen name="PrincipalScreen" component={PrincipalScreen} />
      <Stack.Screen name="ConfigScreen"    component={ConfigScreen} />
      <Stack.Screen name="PesdasScreen"    component={PesdasScreen} />

    </Stack.Navigator>
  );
}