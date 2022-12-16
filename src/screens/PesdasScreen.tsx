

import React, {useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native';
import { DBPesadas } from '../dataBase/DBpesadas';
import { getDBconection, getPesadas } from '../dataBase/DBconection';
import { PesadasResponse } from '../interfaces/appInterfaces';


export const PesdasScreen = () => {
    
    const [pesadas, setPesadas] = useState<PesadasResponse[]>([]);

    useEffect(() => {
        cargarPesadas();
    }, [])
    
    const cargarPesadas = async() =>{
        try {
            const db = await getDBconection();
            const resp = await getPesadas(db);
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
