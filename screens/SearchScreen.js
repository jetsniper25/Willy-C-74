import React from 'react';
import { Text, View, ScrollView, FlatList, TextInput} from 'react-native';
import db from "../config"

export default class SearchScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      allTransactions:[],
      lastVisibleTransaction:null
    }
  }
  componentDidMount=async()=>{
    const query=await db.collection("transactions").get()
    query.docs.map(doc=>{
      this.setState({allTransactions:[...this.state.allTransactions, doc.data()]})
    })
  }
  fetchMoreTransactions=async()=>{
    const query=await db.collection("transactions").startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map(doc=>{
      this.setState({allTransactions:[...this.state.allTransactions, doc.data()],
      lastVisibleTransaction:doc
      })
    })
  }
    render() {
      return (
        <View>
          <TextInput 
          placeholder="enter book id or student id"
          onChangeText={Text=>{this.setState({search:text})}}
          />
          <TouchableOpacity
          
          onPress={()=>{
            
          }}>
          <Text>Search</Text>
        </TouchableOpacity>
        <FlatList
        data={this.state.allTransactions} 
        renderItem={({transaction})=>(
          
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Text>{"BookId:"+transaction.bookId}</Text>
          <Text>{"StudentId:"+transaction.studentId}</Text>    
          <Text>{"transaction Type:"+transaction.transactionType}</Text>
        </View>
        )}
        keyExtractor={(item, index)=>index.toString()}
        onEndReached={this.fetchMoreTransactions}
        onEndReachedThreshold={0.7}
        />
        </View>
      );
    }
  }