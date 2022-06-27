import React, { useEffect, useState } from 'react';
import {
  View,Text, StyleSheet, Modal, TextInput, Button
} from 'react-native';
import axios from "axios";
import SafecamWrapper from './SafecamWrapper';

const Home = ({navigation}) => {
  
  const [productIds, setProductIds] = useState([{"id": "10063199773", "visible": false}, {"id": "10169998772", "visible": false}, {"id": "1006334663", "visible": false}, {"id": "1050064264", "visible": false}, {"id": "1002666227", "visible": false}, {"id": "1103786629", "visible":false}])
  const [dynamicProductId, setDynamicProductId] = useState('')
  const [dynamicProductModalVisible, setDynamicProductIdModalVisible] = useState(false)

  const [errorMessageVisible, setErrorMessageVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
 

  /**
   * Fetches data for all products
   */
  const getProducts = () => {
    axios.post("https://safecam360.s20.ai/api/auth", 
      {
        "email": "",
        "password": ""
      }
    ).then(authResp=>{
      if(authResp.data.token){
        axios.get("https://safecam360.s20.ai/api/capture/fetch-all", {
          headers: {
            "x-auth-token": authResp.data.token
          }
        }).then(r=>{
            console.log(r.data.data.map(d=>{
                return {"id":d.product_id, "visible":false}}))
          setProductIds(r.data.data.map(d=>{
            return {"id":d.product_id, "visible":false}}))
          
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
    // getProducts()
  }, [])


  const handleLinkPress = (productId) => {
    // setDynamicProductIdModalVisible(!dynamicProductModalVisible)
    
    //   let productIdsState = [...productIds]
    //   for(let i=0;i<productIds.length;i++){
    //     if(productId === productIds[i].id){
    //       productIdsState[i].visible = !productIdsState[i].visible
    //       break
    //     }

    //   }
    //   setProductIds(productIdsState)

    navigation.navigate('SafecamWrapper', {productId: productId})
    
  }

  useEffect(()=>{
    if(errorMessageVisible){
      setTimeout(()=>{
        setErrorMessageVisible(false)
      }, 5000)
    }
  }, [errorMessageVisible ])


  const getModalContent = (productId) => {
    return <View>
    <Text onPress={()=>{
      handleLinkPress(productId)
    }} style={{
      fontSize:35,
      fontWeight:"bold",
      position: "absolute",
      right: 20,
      top:10,
      color: "#000",
      zIndex: 99,
      
    }}>X</Text>

    <SafecamWrapper
        productId={productId}
        closeModal = {()=>{
          handleLinkPress(productId)
        }}
        setErrorMessageVisible={()=>{
          setErrorMessageVisible(true)
        }}
        setErrorMessage={(val)=>{
          setErrorMessage(val)
        }}
    />
  </View>
  }

  return (
  
 
  <View style={{backgroundColor:"#000", height:"100%"}}>
    <View style={{
      padding: 20
    }}>
    <Text style={{fontSize:20}}>Dynamic Product ID Lookup</Text>
      <View style={{ width:"100%", padding: 10}}>
      <TextInput onChangeText={(text)=>{
        setDynamicProductId(text)
        setErrorMessageVisible(false)
      }} value={dynamicProductId} placeholder='Enter product ID' style={{backgroundColor:"#fff", color:"#000"}}></TextInput>
        <Button title='Go' disabled={!dynamicProductId || errorMessageVisible} onPress={()=>{
        //   setDynamicProductIdModalVisible(true)
            navigation.navigate("SafecamWrapper", {"productId": dynamicProductId})
        }}></Button>
        {errorMessageVisible && <Text style={{color:"red"}}>{errorMessage}</Text> }
         <Modal
          visible={dynamicProductModalVisible}
        >
          {dynamicProductId? getModalContent(dynamicProductId) : null}
        </Modal>
      </View>
     
      
    </View>
    
    <View style={{padding: 20}}>
    <Text style={{fontSize:20}}>Sample demo links</Text>
      {productIds.map(product=>{
        return <View key={product.id}><Text onPress={()=>{handleLinkPress(product.id)}} style={{
          padding:10,
          textDecorationLine: 'underline'
        }}>{`https://staging.s20.ai/demo/`+product.id}</Text>

         <Modal style={{zIndex: 0}} visible={product.visible}>
              {getModalContent(product.id)}
         </Modal>
        </View>
      })
      }
    </View>
    
    
  </View> 

  )
};




export default Home;
