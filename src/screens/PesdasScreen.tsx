

import React, {useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native';
import { PesadasResponse } from '../interfaces/appInterfaces';
import { DBconection } from '../dataBase/DBconection';


export const PesdasScreen = () => {
    
    const [pesadas, setPesadas] = useState<PesadasResponse[]>([]);

    useEffect(() => {
        cargarPesadas();
    }, [])
    
    const cargarPesadas = async() =>{
        try {
          
            const resp = await DBconection.db().getPesadas();
            setPesadas(resp);
            console.log(resp);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList 
                data={ pesadas }
                renderItem={ ({item}) =>  (
                    <View >
                        <Text>{ item._id }</Text>
                        <Text>{ item.fecha }</Text>
                        <Text>{ item.hora }</Text>
                        <Text>{ item.peso }</Text>
                    </View>
                    ) 
                }
                keyExtractor={ (p) => p._id }
            />
            {/* <Text>{ JSON.stringify( pesadas, null, 6 ) }</Text> */}
        </View>
    )
}
