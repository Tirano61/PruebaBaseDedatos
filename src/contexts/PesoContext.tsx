import React, { createContext, useState, useEffect, useRef } from "react";

import dgram from 'react-native-udp'
import type { EventEmitter } from 'events'
import type _UdpSocket from 'react-native-udp/lib/types/UdpSocket'

type PesoProps = {
    peso: number,
}

export const PesoContext = createContext({} as PesoProps);

export const PesoProvider = ({ children }: any) =>{

    const [pesoState, setPesoState] = useState<number>(0);

    useEffect(() => {
        createUdpSocket();
        // setPesoState( refPeso.current )
    }, [])
    
    const createUdpSocket = () => {
        type UdpSocket = EventEmitter & _UdpSocket
        const socket: UdpSocket = dgram.createSocket({ type: 'udp4', debug: __DEV__, reusePort: true }) as UdpSocket
        
        socket.bind(5900);
         
        let str = '';
        let strPeso = [];
        socket.on('message', (data, rinfo) => {
        
            str = String.fromCharCode.apply(String, data);
            str = str.substring(5,str.length -1);
            strPeso = str.split(',');
        
            setPesoState( +strPeso[0]);    
        });  
    }

    return (
        <PesoContext.Provider 
            value={{
                peso: pesoState,
            }}
        >
            { children }
        </PesoContext.Provider>
    )
} 