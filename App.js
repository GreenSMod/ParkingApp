import { StatusBar } from "react-native";
import MainScreen from "./screens/MainScreen";

export default function App() {
  return (
    <MainScreen styles={{ paddingTop: StatusBar.currentHeight }}></MainScreen>
  );
}
