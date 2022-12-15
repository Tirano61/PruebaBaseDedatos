


import React, {useContext} from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { PesoContext } from '../contexts/PesoContext';


const dimenciones = Dimensions.get('window');


export const TextoPeso = () => {

  const {peso} = useContext(PesoContext);
  return (
    <View style={stylePeso.cajaPeso}>
        <CircularProgress 
            duration={50}
            value={ peso }
            inActiveStrokeColor={'#5962E1'}
            activeStrokeColor={'#1C196CC6'}
            activeStrokeWidth={30}
            radius={ 120 }
            maxValue={ 5000 }
            progressValueColor={'#1B839D'}
            inActiveStrokeOpacity={0.2}
            
        />
      
    </View>
  )
}

const stylePeso = StyleSheet.create({
    cajaPeso: {
        height: 300,
        width:  300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:    30,
    },

});