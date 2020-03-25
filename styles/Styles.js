import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2B5172',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    inputText:{
      height:50,
      color:"white"
    },

    text:{
      height:30,
      color:"white"
    },
  
    inputView:{
      width:"80%",
      backgroundColor:"#A0DDFF",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },

    errorMsg: {
      color:'#F7567C'
    },
  
    submit:{
      width:"40%",
      backgroundColor:"#71CFE0",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:10
    },

    googleButton:{
      width:"40%",
      backgroundColor:"#F7567C",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:5,
      marginRight:160,
      marginBottom:10
    }

  });

  export default styles;