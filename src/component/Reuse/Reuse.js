import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../COLOR/COLOR";
import { reuseStyles } from "./reuseStyles";

export const LoadingComp = ({
  text,
  loadercolor,
  textColor,
  extraLoadderStyle,
}) => (
  <View style={[reuseStyles.loadingContainer, extraLoadderStyle]}>
    <ActivityIndicator size="large" color={loadercolor} />
    <Text style={{ fontSize: 17, marginTop: 10, color: textColor }}>
      {text}
    </Text>
  </View>
);

export const ButtonComp = ({ text, onPress, extraStyle, extraTextStyle }) => (
  <TouchableOpacity
    style={[reuseStyles.btnContainer, extraStyle]}
    onPress={onPress}
    activeOpacity={0.6}
  >
    <Text style={[reuseStyles.btnText, extraTextStyle]}>{text}</Text>
  </TouchableOpacity>
);

export const Input = ({
  placeholder,
  setValue,
  secureTextEntry,
  multiline,
  extraStyle,
  numberOfLines,
  value,
}) => (
  <TextInput
    style={[reuseStyles.inputStyle, extraStyle]}
    placeholder={placeholder}
    onChangeText={(text) => setValue(text)}
    secureTextEntry={secureTextEntry}
    multiline={multiline}
    numberOfLines={numberOfLines}
    value={value}
  />
);

export const AppBar = ({ text, navigation, color }) => (
  <View style={reuseStyles.AppBarStyle}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Fontisto name="arrow-left-l" size={24} color={color} />
    </TouchableOpacity>
    <Text style={reuseStyles.AppBarText}>{text}</Text>
  </View>
);

export const LinkTextComp = ({
  text,
  linkText,
  pageNavigation,
  extraStyle,
  extraLinkStyle,
  textClick,
}) => (
  <View style={[reuseStyles.linkTextWrapper, extraStyle]}>
    <TouchableOpacity onPress={textClick && pageNavigation}>
      <Text style={reuseStyles.text}>{text}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={pageNavigation}>
      <Text style={[reuseStyles.linkText, extraLinkStyle]}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);
export const HomeSearchProfile = () => (
  <View style={reuseStyles.HomeSearchProfileContainer}>
    <TouchableOpacity>
      <Fontisto name="search" size={22} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Ionicons name="person-circle-sharp" size={30} />
    </TouchableOpacity>
  </View>
);

export const NormalBtn = ({ text, onPress, extratextStyle }) => (
  <TouchableOpacity style={reuseStyles.NormalBtn} onPress={onPress}>
    <Text style={[reuseStyles.NormalBtnText, extratextStyle]}>{text}</Text>
  </TouchableOpacity>
);
