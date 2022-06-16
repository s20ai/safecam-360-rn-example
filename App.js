import React, { useEffect, useState } from 'react';
import {
  View,Text, StyleSheet
} from 'react-native';
import axios from "axios";

import { Safecam360 } from "@s20.ai/safecam-360-rn";

const App = () => {
  const [exteriorData, setExteriorData] = useState('')
  const [interiorData, setInteriorData] = useState('')

  /**
   * Fetches prop data for required appointment ID
   */
  const getPropData = () => {
    axios.post("https://safecam360.s20.ai/api/auth", 
      {
        "email": "",
        "password": ""
      }
    ).then(authResp=>{
      if(authResp.data.token){
        console.log(authResp.data.token)
        axios.get("https://safecam360.s20.ai/api/capture/prop-data/C24DEMO2", {
          headers: {
            "x-auth-token": authResp.data.token
          }
        }).then(r=>{
          setInteriorData(r.data.interior360[0])
          setExteriorData(r.data.exterior360[0])
          
        }).catch(err=>{
          console.log('get prop data failed')
          console.log(err)
        })
      }
    }).catch(err=>{
      console.log('auth failed')
      console.log(err)
    })
    
  }
  useEffect(()=>{
    getPropData()
  }, [])


  return (
   interiorData || exteriorData?
      <Safecam360 interiorData={interiorData} exteriorData={exteriorData}/>:
    <View style={styles.center}>
      <Text>Loading data...</Text>
    </View>

  )
};

const styles = StyleSheet.create({
  center:{ position:"absolute", top:"50%", display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}
})


export default App;
