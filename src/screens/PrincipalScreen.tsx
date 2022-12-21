

import React, {useContext, useEffect} from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native';

import { TextoPeso } from '../components/TextoPeso';
import { DBPesadas } from '../dataBase/DBpesadas';
import { PesoContext } from '../contexts/PesoContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DBconection } from '../dataBase/DBconection';
import { StackScreenProps } from '@react-navigation/stack';
import { PesadasResponse } from '../interfaces/appInterfaces';

type PesadasParams ={
    PrincipalScreen: undefined,
}
interface Props extends StackScreenProps<PesadasParams,'PrincipalScreen'>{};


export const PrincipalScreen = ({navigation, route}: Props) => {


    const {peso} = useContext(PesoContext);

    useEffect(() => {
       //crearNuevaPesada();
    }, [])

    useEffect(() =>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    activeOpacity={ 0.6 }
                    style={{marginRight: 20}}
                    onPress={() => navigation.navigate( 'PesdasScreen' as any) }
                >
                    <Icon name='star' color={'blue'} size={20}/>
                </TouchableOpacity>
            )
        })
    },[])

    const crearNuevaPesada = async() => {   
        const dbPesada: PesadasResponse =  {
            fecha: '',
            hora: '',
            caravana: 'F00894CD',
            estado: '3',
            genero: 'MACHO',
            lote: '345',
            peso: peso.toString(),
            raza: 'Brangus',
            tropa: '345',
        };
        
        try {
            
            const resp = await DBconection.db().insertPesada( dbPesada);
            Alert.alert('Guardado',
                `Pesada nº: ${resp[0].insertId}, guardada correctamente !!!`,
                [{
                    text: 'OK',
                    onPress: () => {}
                }]
            );
            return resp;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={stylePorincipal.container}>
            
            <TextoPeso />
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                <Button 
                    title='Guardar'
                    onPress={() => crearNuevaPesada()}
                />
            </View>
            
        </View>
    )
}

const stylePorincipal = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
        
    },
});