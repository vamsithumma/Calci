
import { View, Text, Button,TouchableOpacity ,FlatList} from 'react-native';
import React, { useEffect,useState } from 'react';
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import { addItem ,fetchData, deleteItem} from './DBUtils';

let setbit=true;

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Calci');

  //calci
  const [result, setResult]= useState('');
  const [temp, setTemp]= useState('');
  const [finaldisplay, setDisplay]= useState('');

  const colors = {
    dark: '#22252D',
    dark1: '#292B36',
    dark2: "#272B33",
    light: '#FFF',
    light1: '#F1F1F1',
    light2: '#F7F7F7'
  };

  const handleAddItem = () => {
    let ans=finalCalculate(result);
    setbit=false;
    //console.log(temp,ans);
    if(ans!='' && ans!=result)
      addItem(finaldisplay+"="+ans, () => {
        fetchData(setItems);
    });
    setResult(ans);
    setDisplay(ans);
    setTemp('');
  };

  const finalCalculate = (result) =>{
    let ans;
    try{
      ans = Number(eval(result).toFixed(3)).toString();
    }catch(err){
      ans=""
    }
    return ans;
  };
  

  const logic = (title,display) =>{
    let b=finalCalculate(result);
      if(b!=""){
        setTemp(b);
      }
    if (title == 'C'){
      setResult('');
      setDisplay('');
      setTemp('');
    }
    else if (title== 'DL') {
      setResult(result.substring(0,result.length-1));
      setTemp(temp.substring(0,temp.length-1));
      setDisplay(finaldisplay.substring(0,result.length-1));
    }
    else if(title == '='){
      let ans=finalCalculate(result);
      setbit=false;
            
    } 
    else {
      setResult(result+ title);
      setTemp(finalCalculate(result+title));
      setDisplay(finaldisplay+display);
                 
    }

  }
 

  const calculate = (title,display) =>{

    if(setbit){
      logic(title,display)
    }
    else {
      if((title !='*') && (title !='+') && (title !='-') && (title !='/') && (title !='%') && (title !='C') && (title !='DL') && (title != '=')){
        setResult(title);
        setDisplay(title);
        setTemp(title);
      }
      else {
        logic(title,display);
      }
    
      setbit=true;
      
    } 
  }


  const Btn = ({display,title,type}) => (
    <TouchableOpacity 
    onPress={() => calculate(title,display)}
      style={{ 
        height: responsiveWidth(20), 
        width: responsiveWidth(20),
        padding: responsiveWidth(3), 
        borderRadius: responsiveWidth(10),
        elevation:5,
        backgroundColor: getBtnColor(type) ,
        margin: responsiveWidth(2.5),
        //marginBottom: responsiveWidth(7),
      }}>
      <Text 
        style={{ 

        fontSize:responsiveFontSize(4),
        color: "black",
        textAlign:"center",
        textAlignVertical: 'center',
        

      }}>{display}</Text>
    </TouchableOpacity>

  );

  const getBtnColor = (type) =>{
    if(type== 'top'){
      return '#dbdbdb'
    }else if(type == "right"){
      return '#fc7411'
    }else{
      return colors.light
    }
  };


  //historyscreen
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchData(setItems);
  }, []);

  const handleDeleteItem = (id) => {
    deleteItem(id, () => {
      fetchData(setItems);
    });
  };

  const handleGoBack =() =>{
    setCurrentScreen('Calci');
  }

  const navigateToHistory = () => {
    setCurrentScreen('History');
  };

  const navigateBack = (msg) => {
    const arr=msg.split('=');
    setDisplay(arr[1]);
    setResult(arr[1]);
    setTemp(arr[1]);
    setCurrentScreen('Calci');
  };

  return (
    <View style={{ flex: 1, marginTop:responsiveHeight(3) }}>
      {currentScreen === 'Calci' && (
        <React.Fragment>
          <Text style={{
            marginTop:responsiveHeight(1),
            fontSize:responsiveFontSize(3),
            marginLeft: responsiveWidth(2.5),
          }}>Calculator</Text>
          
          <View style={
              { 
                flex:1,
                height: responsiveHeight,
                width: responsiveWidth,
                //paddingVertical: responsiveHeight(3),
                backgroundColor: colors.light1,
                alignItems: 'center',
                justifyContent: 'center',
              }
            }>
              <View  
                style={{
                  alignItems: 'flex-start',
                  justifyContent:'center',
                }}>
                <TouchableOpacity 
                    onPress={()=>navigateToHistory()}
                  style={{ 
                    height: responsiveWidth(8), 
                    width: responsiveWidth(20),
                    padding: responsiveWidth(0.8), 
                    borderRadius: responsiveWidth(10),
                    elevation:5,
                    backgroundColor: '#dbdbdb' ,
                    margin: responsiveWidth(2.5),
                    marginTop: responsiveHeight(2),
                    marginRight: responsiveWidth(78),
                  }}>
                  <Text 
                    style={{ 
                    fontSize:responsiveFontSize(2),
                    color: "black",
                    textAlign:"center",
                    textAlignVertical: 'center',
                  }}>History</Text>
                </TouchableOpacity>
              </View> 
              <Text style={
                {
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(6),
                  width: "100%",
                  textAlign:"right",
                  paddingRight: responsiveWidth(5),
                  marginTop: responsiveHeight(0),
                  paddingBottom: responsiveWidth(0.5),
                  color: colors.dark,
                }
              }>{finaldisplay}</Text>
              <Text style={
                {
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(3),
                  width: "100%",
                  textAlign:"right",
                  paddingRight: responsiveWidth(6),
                  marginTop: 0,
                  paddingBottom: responsiveWidth(2),
                  color: "#acacab",
                }
              }>
                {temp}
              </Text>


              <View 
                style={{ 
                  flex:1,
                  width: responsiveWidth,
                  flexDirection: "row", 
                  flexWrap:"wrap",
                  backgroundColor: colors.light1,
                  //borderTopRightRadius: 20,
                  //borderTopLeftRadius:20
                  }}>
                <Btn display="C" title="C" type="top"/>
                <Btn display="%" title="%" type="top"/>
                <Btn display="DL" title="DL" type="top"/>
                <Btn display="&divide;" title="/" type="top"/>
                <Btn display="7" title="7" type="number"/>
                <Btn display="8" title="8" type="number"/>
                <Btn display="9" title="9" type="number"/>
                <Btn display="&times;" title="*" type="top"/>
                <Btn display="4" title="4" type="number"/>
                <Btn display="5" title="5" type="number"/>
                <Btn display="6" title="6" type="number"/>
                <Btn display="&ndash;" title="-" type="top"/>
                <Btn display="1" title="1" type="number"/>
                <Btn display="2" title="2" type="number"/>
                <Btn display="3" title="3" type="number"/>
                <Btn display="+" title="+" type="top"/>
                <Btn display="00" title="00" type="number"/>
                <Btn display="0" title="0" type="number"/>
                <Btn display="." title="." type="number"/>
                <TouchableOpacity 
                  onPress={handleAddItem}
                    style={{ 
                      height: responsiveWidth(20), 
                      width: responsiveWidth(20),
                      padding: responsiveWidth(4), 
                      borderRadius: responsiveWidth(10),
                      elevation:5,
                      backgroundColor: '#fc7411' ,
                      margin: responsiveWidth(2.5),
                      //marginBottom: responsiveWidth(7),
                    }}>
                    <Text 
                      style={{ 

                      fontSize:responsiveFontSize(4),
                      color: "black",
                      textAlign:"center",
                      textAlignVertical: 'center',
                      
                  }}>=</Text>
                </TouchableOpacity> 
                
              </View>
              
            </View>
          
        </React.Fragment>
      )}

      {currentScreen === 'History' && (
        <React.Fragment>
          <Text style={{
            marginTop:responsiveHeight(1),
            fontSize:responsiveFontSize(3),
            marginLeft: responsiveWidth(2.5),
          }}>History</Text>
          

          <View
              style={{
                marginTop: responsiveHeight(1),
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: responsiveHeight(15),
              }}>
                
                  

              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={{
                    flex:1,
                    width: responsiveWidth,
                    flexDirection: "row", 
                    flexWrap:"wrap",
                    backgroundColor:'#F1F1F1',
                    
                  }}>
                        <TouchableOpacity 
                        onPress={()=>navigateBack(item.text)}
                          style={{ 
                            height: responsiveWidth(8), 
                            width: responsiveWidth(60),
                            padding: responsiveWidth(0.8), 
                            borderRadius: responsiveWidth(10),
                            elevation:5,
                            backgroundColor: '#dbdbdb' ,
                            margin: responsiveWidth(2.5),
                          }}>
                          <Text 
                            style={{ 
                            fontSize:responsiveFontSize(2),
                            color: "black",
                            textAlign:"center",
                            textAlignVertical: 'center',
                          }}>{item.text}</Text>
                        </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => handleDeleteItem(item.id)}
                          style={{ 
                            height: responsiveWidth(8), 
                            width: responsiveWidth(20),
                            padding: responsiveWidth(0.8), 
                            borderRadius: responsiveWidth(10),
                            elevation:5,
                            backgroundColor: '#dbdbdb' ,
                            margin: responsiveWidth(2.5),
                          }}>
                          <Text 
                            style={{ 
                            fontSize:responsiveFontSize(2),
                            color: "black",
                            textAlign:"center",
                            textAlignVertical: 'center',
                          }}>Delete</Text>
                        </TouchableOpacity>
                  </View>
                )}
              />

                  <TouchableOpacity 
                        onPress={()=>handleGoBack()}
                      style={{ 
                        height: responsiveWidth(8), 
                        width: responsiveWidth(20),
                        padding: responsiveWidth(0.8), 
                        borderRadius: responsiveWidth(10),
                        elevation:5,
                        backgroundColor: '#dbdbdb' ,
                        //margin: responsiveWidth(2.5),
                        marginTop: responsiveHeight(1),
                        //marginRight: responsiveWidth(78),
                      }}>
                      <Text 
                        style={{ 
                        fontSize:responsiveFontSize(2),
                        color: "black",
                        textAlign:"center",
                        textAlignVertical: 'center',
                      }}>Go Back</Text>
                </TouchableOpacity>

            </View>
        </React.Fragment>
      )}
    </View>
  );
};

export default App;
