import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigation/BriliNav";

// class App extends Component {
//   state = {
//     massage: "BRILI xin chào!",
//     number: 0,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <DisplayText content={this.state.massage} size={20}></DisplayText>
//         <DisplayText content={this.state.number} size={25}></DisplayText>
//         <DisplayText content="Display with props" size={30}></DisplayText>
//         {/* <Text>{this.state.massage}</Text>
//         <Text>{this.state.number}</Text> */}
//         <Button
//           title="Tăng"
//           onPress={() => {
//             this.setState({ ...this.state, number: this.state.number + 1 });
//           }}
//         ></Button>
//         <StatusBar style="auto" />
//       </View>
//     );
//   }
// }

export default function App() {
  return <MainNavigator></MainNavigator>;
}

const styles = StyleSheet.create({});
