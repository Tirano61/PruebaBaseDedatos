



import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native';

interface Props {
    titulo: string,
    dato: string,
}

export const CamposDatos = ({ titulo, dato }: Props) => {
  return (
    <>
        <Text style={styles.titulos} >{ titulo }</Text>
        <Text style={styles.datos}>{ dato }</Text>
    </>
  )
}

const styles = StyleSheet.create({
    titulos:{
        color: '#0077FF'
    },
    datos:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    }
});