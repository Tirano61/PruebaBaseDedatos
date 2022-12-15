

import React, {useState} from 'react'
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-svg';
import { DBPesadas } from '../dataBase/DBpesadas';


export const PesdasScreen = () => {
    
    const [pesadas, setPesadas] = useState<DBPesadas[]>([]);

    return (
        <View>
            <FlatList 
                data={ pesadas }
                renderItem={ ({item}) =>  
                    <View>
                        <Text>{item.fecha}</Text>
                        <Text>{item.hora}</Text>
                        <Text>{item.peso}</Text>
                    </View>
                }
                keyExtractor={ (p, index) => p.peso + index }
            />
            <Text>{ JSON.stringify( '', null, 6 ) }</Text>
        </View>
    )
}
