import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList,Dimensions } from 'react-native';

export default class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Shares:[
            {Share:"L&T", Buy:100.00,Sell:112.00},
            {Share:"NHPC", Buy:25.60,Sell:28.80},
            {Share:"SBICARD", Buy:80.00,Sell:85.40},
            {Share:"Appollo", Buy:250.00,Sell:195.00},
            {Share:"Edelweiss", Buy:290.24,Sell:62.80},
            {Share:"ITC", Buy:153.95,Sell:244.94},
            {Share:"TCS", Buy:456.00,Sell:561.00},
            {Share:"CHEAT", Buy:200.00,Sell:205.44},
            {Share:"HDFCBANK", Buy:806.00,Sell:1008.50},
            {Share:"POWERGRID", Buy:190.00,Sell:565.45},
            {Share:"AXISBANK", Buy:30.50,Sell:80.54},
            {Share:"BajajFinsv", Buy:31.60,Sell:81.65},
            {Share:"CIPLA", Buy:140.00,Sell:157.45},
            {Share:"EKC", Buy:80.50,Sell:88.50},
            {Share:"EMCO", Buy:25.60,Sell:.45}
            ],
        amount:"",
        TotalInvested:"0",
        TotalProfit:"0",
        
    };
  }

  componentDidMount(){
      this.state.Shares.forEach(e=>e.profit="0")
  }

   getMinY(data) {
    return data.reduce((min, p) => p.Buy < min ? p.Buy : min, data[0].Buy);
  }

  onChangeText=(txt)=>{
       this.setState({
           amount:txt
       })
  }

  calcuate=()=>{
    let Shares = this.state.Shares;
    let min = this.getMinY(Shares);
    let TotalInvested = 0;
    let totalProfit = 0;
     if(parseFloat(this.state.amount)>=parseFloat(min)){
            Shares.map((item,index)=>{
                let Profit = parseFloat(this.state.amount)-parseFloat(item.Buy)-parseFloat(item.Sell);
                item.profit = Profit.toFixed(2);
                totalProfit = totalProfit+Profit;
                TotalInvested = TotalInvested+item.Buy;
            });
            this.setState({ Shares:Shares,TotalProfit:totalProfit.toFixed(2),TotalInvested:TotalInvested.toFixed(2), })
        }else{
            alert('Min amount to buy Share is'+ min)
            
        }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.HeaderWrapper}>
        <Text style={styles.HeaderText}>Maximum Profit</Text>
        </View>
        <View style={styles.inputWrapper}>
            <TextInput
            style={styles.inputStyle}
            placeholder='Amount'
            defaultValue = {this.state.amount}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.calcuate}
            />
            <TouchableOpacity onPress={this.calcuate} style={styles.ButtonStyle}>
                <Text style={styles.buttonTextStyle}>
                    Calculate
                </Text>
            </TouchableOpacity>
       </View>
       <View style={styles.wrapperContainer}>
           <FlatList
           style={styles.flatlistStyle}
           data={this.state.Shares}
           ListHeaderComponent={()=>{
            return(
                <View style={styles.flatistHeaderWrapper}>
                    <Text style={styles.HeaderTextWrapper}>Invested Shares :</Text>
                    <View style={styles.rowContainer}>
                    <View style={styles.cellcontainer}>
                    <Text style={styles.tabeHeaderText}>Share</Text>
                    </View>
                    <View style={styles.cellcontainer}>
                    <Text style={styles.tabeHeaderText}>Buy</Text>
                    </View>
                    <View style={styles.cellcontainer}>
                    <Text style={styles.tabeHeaderText}>Sell</Text>
                    </View>
                    <View style={styles.cellcontainer}>
                    <Text style={styles.tabeHeaderText}>Profit</Text>
                    </View>
                </View>
                </View>
            )}}
           ListFooterComponent={()=>{
            return(
                <View style={styles.footerContianer}>
                    <Text style={styles.TextFooter}>Total Invested: {this.state.TotalInvested}</Text>
                    <Text style={styles.TextFooter}>Total Profit: {this.state.TotalProfit}</Text>
                </View>
            )
        }}
           renderItem={({item,index})=>{
            return(
              <View style={styles.rowContainer}>
              <View style={styles.cellcontainer}>
              <Text style={styles.tabeHeaderText}>{item.Share}</Text>
              </View>
              <View style={styles.cellcontainer}>
              <Text style={styles.tabeHeaderText}>{item.Buy}</Text>
              </View>
              <View style={styles.cellcontainer}>
              <Text style={styles.tabeHeaderText}>{item.Sell}</Text>
              </View>
             <View style={styles.cellcontainer}>
              <Text style={styles.tabeHeaderText}>{item.profit}</Text>
              </View>
          </View>
            )
        }}
           />
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,backgroundColor:'white',
    },
    HeaderWrapper:{
        flexDirection:'row',
        padding:10,
        backgroundColor:'#999',
    },
    HeaderText:{
        fontSize:18,
        fontWeight:'500',
        color:'white'
    },
    inputWrapper:{
        alignItems:'center',
        flexDirection:'column',
    },
    inputStyle:{
        width:Dimensions.get('window').width-50,
        height:45,backgroundColor:'lightgray',
        padding:2,borderRadius:5,margin:10
    },
    ButtonStyle:{
        margin:10,borderRadius:5,
        width:Dimensions.get('window').width-50,
        height:45,backgroundColor:'black',
        padding:10
    },
    buttonTextStyle:{
        fontSize:18,
        fontWeight:'500',
        color:'white'
    },
    wrapperContainer:{
        flex:1,flexDirection:'column'
    },
    flatlistStyle:{
        flex:1,
        
    },
    flatistHeaderWrapper:{
        flexDirection:'column',
    },
    HeaderTextWrapper:{
        color:'black',
        fontWeight:'bold',
        padding:10,
    },
    rowContainer:{
        flexDirection:'row',
        padding:10
    },
    cellcontainer:{
        padding:10,
        flex:1
    },    
    tabeHeaderText:{
        fontWeight:'400',
        color:'gray'
    },
    footerContianer:{
        flexDirection:'column',
        padding:10
    },
    TextFooter:{
        color:'black',
        fontSize:18
    }

})


