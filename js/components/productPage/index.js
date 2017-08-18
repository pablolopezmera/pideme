import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import {
    Button,
    Body,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Title,
    Thumbnail,
    Card,
    CardItem
} from "native-base";
import ShoppingCart from '../shoppingCart'
var cart = require('../shoppingCart/cart');

import styles from "./styles";

class ProviderProductsPage extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  render() {
      const {state} = this.props.navigation;
      var product = state.params.product;
      const { props: { name, index, list } } = this;
      return (
          <Container style={styles.container}>
              <Header>
                  <Left>
                      <Button transparent onPress={() => this.props.navigation.goBack()}>
                          <Icon name="ios-arrow-back" />
                      </Button>
                  </Left>

                  <Body>
                  <Title>{product.name ? product.name : "Detail Page"}</Title>
                  </Body>

                  <ShoppingCart navigation={this.props.navigation} totalProducts={cart.getTotalProducts()} totalProviders={cart.getTotalProviders()} />
              </Header>
              <Content>
                  <Card>
                      <CardItem>
                          <Left>
                              <Body>
                              <Text>{product.name}</Text>
                              </Body>
                          </Left>
                      </CardItem>
                      <CardItem cardBody>
                          <Image source={{ uri: product.photo }} style={{ height: 180, width: 300 }} />
                      </CardItem>
                      <CardItem cardBody>
                          <Text>{product.desc}</Text>
                      </CardItem>
                      <CardItem>
                          <Left>
                              <Button transparent>
                                  <Icon name='arrow-up' onPress={() => {cart.addProduct(product);this.forceUpdate()} } />
                              </Button>
                          </Left>
                          <Body>
                          <Button transparent>
                              <Icon name='arrow-down' onPress={() => {cart.descProduct(product);this.forceUpdate()} } />
                          </Button>
                          </Body>
                          <Right>
                              <Text>{product.price} USD</Text>
                          </Right>
                      </CardItem>
                  </Card>
              </Content>
          </Container>
      )

  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(ProviderProductsPage);
