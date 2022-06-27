import React, { useEffect, useState } from 'react';
import {
  View,Text, StyleSheet, Modal, TextInput, Button
} from 'react-native';
import axios from "axios";

import { Safecam360 } from "@s20.ai/safecam-360-rn";

const SafecamWrapper = ({closeModal, setErrorMessageVisible, setErrorMessage, route, navigation}) => {

    console.log(route)
    const [exteriorData, setExteriorData] = useState('')
    const [interiorData, setInteriorData] = useState('')

    const styles = StyleSheet.create({
        center:{ position:"absolute", top:"50%", display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}
      })
     /**
     * Fetches prop data for required appointment ID
     */
      const getPropData = () => {
        console.log('getting data for '+route.params.productId)
        axios.post("https://safecam360.s20.ai/api/auth", 
          {
            "email": "",
            "password": ""
          }
        ).then(authResp=>{
          if(authResp.data.token){
            console.log(authResp.data.token)
            axios.get("https://safecam360.s20.ai/api/capture/prop-data/"+route.params.productId, {
              headers: {
                "x-auth-token": authResp.data.token
              }
            }).then(r=>{
              setInteriorData(r.data.interior360[0])
              setExteriorData(r.data.exterior360[0])
              
            }).catch(err=>{
              console.log('get prop data failed')
              console.log(err)
              navigation.pop()
              // closeModal()
              // setErrorMessageVisible()
              // setErrorMessage('Could not find product ID')
            })
          }
        }).catch(err=>{
          console.log('auth failed')
          console.log(err)
          navigation.pop()
          // closeModal()
          // setErrorMessageVisible()
          // setErrorMessage('Auth failed')
        })
        
      }
    useEffect(()=>{
        console.log('Product id - '+route.params.productId)
        if(!route.params.productId){
          navigation.pop()
            // closeModal()
            // setErrorMessageVisible()
            // setErrorMessage('No product ID entered')
        }
        else{
            getPropData()
        }
      
    }, [route.params.productId])
  
    return(
      interiorData || exteriorData?
        <Safecam360 interiorData={interiorData} exteriorData={exteriorData}/>:
      <View style={styles.center}>
        <Text>Loading data...</Text>
      </View>
    )
  }

  export default SafecamWrapper