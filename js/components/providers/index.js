import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import ProviderApi from './ProviderApi'
import ShoppingCart from '../shoppingCart'
var cart = require('../shoppingCart/cart');
import styles from "./styles";

var providers = [];

class Home extends Component {

  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  componentWillMount() {
    const api = new ProviderApi();
    providers = [];
    api.query().then((response) => {
      console.log('Son: ' + response.length);
      for (var i = 0; i < response.length; i++) {
        providers.push(response[i]);
      }
      this.setState({providers: providers});
      return response;
    });

  }

  render() {
    if (this.state) {
      return (
          <Container style={styles.container}>
            <Header>
              <Left>

                <Button
                    transparent
                    onPress={() => {
                DrawerNav.dispatch(
                  NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Home" })]
                  })
                );
                DrawerNav.goBack();
              }}
                >
                  <Icon active name="power" />
                </Button>
              </Left>

              <Body>
              <Title>Home</Title>
              </Body>

                <ShoppingCart navigation={this.props.navigation} totalProducts={cart.getTotalProducts()} totalProviders={cart.getTotalProviders()} />
                <Button
                    transparent
                    onPress={() => DrawerNav.navigate("DrawerOpen")}
                >
                  <Icon active name="menu" />
                </Button>
            </Header>
            <Content>
              <List dataArray={this.state.providers}
                    renderRow={(prov) =>
                          <ListItem avatar onPress={() =>{
                                this.props.navigation.navigate("ProviderProductsPage", {
                                  provider: prov
                                })}}>
                                 <Left><Thumbnail source={{ uri: prov.icon }} /></Left>
                                 <Body>
                                <Text>{prov.name}</Text>
                                <Text note>{prov.desc}</Text>
                                </Body>
                          </ListItem>
                          }>
                  </List>
            </Content>
          </Container>
      )
    } else {
      return (<Text style={styles.providerItem}>Cargando...</Text>)
    }

  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
