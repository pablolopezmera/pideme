import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
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
    Thumbnail
} from "native-base";
import ppApi from './ProviderProductsApi'

import styles from "./styles";
import ShoppingCart from '../shoppingCart'
var cart = require('../shoppingCart/cart');

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

  componentWillMount() {
      const {state} = this.props.navigation;
      provider = state.params.provider;
      cart.selectProvider(provider);
      const api = new ppApi();
      productList = [];
        api.query(provider.providerId).then((response) => {
            for (var i = 0; i < response.length; i++) {
                productList.push(response[i]);
            }
            this.setState({productList: productList});
            return response;
        });

    }

  render() {
      const {state} = this.props.navigation;
      this.provider = state.params.provider;
      if (this.state) {
          return (
              <Container style={styles.container}>
                  <Header>
                      <Left>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="ios-arrow-back" />
                          </Button>
                      </Left>

                      <Body>
                      <Title>{this.provider.name? this.provider.name : "Detail Page"}</Title>
                      </Body>

                      <ShoppingCart navigation={this.props.navigation} totalProducts={cart.getTotalProducts()} totalProviders={cart.getTotalProviders()} />
                  </Header>
                  <Content>
                      <List dataArray={productList}
                            renderRow={(product) =>
                          <ListItem avatar onPress={() =>{
                                this.props.navigation.navigate("ProductPage", {
                                  product
                                })}}>
                              <Left>
                                  <Thumbnail source={{ uri: product.thumbnail }} />
                              </Left>
                              <Body>
                                <Text>{product.name}</Text>
                                <Text note>{product.desc}</Text>
                              </Body>
                              <Right>
                                  <Text note>{product.price} USD</Text>
                                  <Text note>({product.measure})</Text>
                              </Right>
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
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(ProviderProductsPage);
