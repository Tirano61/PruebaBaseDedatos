

import React, {useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native';

import { DBPesadas } from '../dataBase/DBpesadas';
import { getDBconection, getPesadas } from '../dataBase/DBconection';


export const PesdasScreen = () => {
    
    const [pesadas, setPesadas] = useState<DBPesadas[]>([]);

    useEffect(() => {
        cargarPesadas();
    }, [])
    
    const cargarPesadas = async() =>{
        const db = await getDBconection();
        const resp = await getPesadas(db);
        setPesadas(resp);
        console.log(resp);
    }

    return (
        <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList 
                data={ pesadas }
                renderItem={ ({item}) =>  (
                    <View >
                        <Text>{item.fecha}</Text>
                        <Text>{item.hora}</Text>
                        <Text>{item.peso}</Text>
                    </View>
                )
                    
                }
                keyExtractor={ (p, index) => p.peso + index }
            />
            {/* <Text>{ JSON.stringify( pesadas, null, 6 ) }</Text> */}
        </View>
    )
}
