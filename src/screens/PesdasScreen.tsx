

import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PesadasResponse } from '../interfaces/appInterfaces';
import { DBconection } from '../dataBase/DBconection';
import { CamposDatos } from '../components/CamposDatos';
import { Loading } from '../components/Loading';


export const PesdasScreen = () => {
    
    const [pesadas, setPesadas] = useState<PesadasResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        cargarPesadas();
    }, [])
    
    const cargarPesadas = async() =>{
        try {
          
            const resp = await DBconection.db().getPesadas();
            setPesadas(resp);
            console.log(resp);
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
        }
    }

    if(isLoading){
        return (
            <Loading />
        )
        
    }

    return (
        <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList 
                data={ pesadas }
                renderItem={ ({item}) =>  (
                    <View style={{backgroundColor: '#D5D5D561', padding: 15}}>
                        <CamposDatos titulo='ID :' dato={item._id!} />
                        <CamposDatos titulo='Fecha :' dato={item.fecha} />
                        <CamposDatos titulo='Hora :' dato={item.hora} />
                        <CamposDatos titulo='Peso :' dato={item.peso} />
                        <CamposDatos titulo='Raza :' dato={item.raza} />
                       
                    </View>
                    ) 
                }
                keyExtractor={ (p) => p._id! }
                ItemSeparatorComponent={() =>{
                    return(
                        <View style={{height: 15, justifyContent: 'center'}}>
                            <View style={{height: 1, backgroundColor: 'grey'}}></View>
                        </View>
                    )}}
            />
            {/* <Text>{ JSON.stringify( pesadas, null, 6 ) }</Text> */}
        </View>
    )
}

