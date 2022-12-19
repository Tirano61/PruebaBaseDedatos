import 'react-native-gesture-handler';

import React, {useEffect} from 'react'
import { StackNavigator } from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { PesoProvider } from './src/contexts/PesoContext';
import { DBconection } from './src/dataBase/DBconection';




export const App = () => {
  
  useEffect(() => {
    const init = async()=>{
      await DBconection.db().getDataBase();
    };
    init();
  }, []);


  return (
    <>
      <NavigationContainer>
        <AppState>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </>
  )
}

const AppState = ({ children }: any) => {
  
  
  return(
    <PesoProvider>
      { children }
    </PesoProvider>
  )
}


export default App;
