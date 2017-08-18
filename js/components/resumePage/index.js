import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Clipboard,
    ToastAndroid,
    AlertIOS,
    Platform,
    Linking
} from "react-native";
import {connect} from "react-redux";
import {
    Body,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Title,
    Separator,
    Button
} from "native-base";
var cart = require('../shoppingCart/cart');
import styles from "./styles";

class ResumePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    onCancel() {
        console.log("CANCEL")
        this.setState({visible: false});
    }

    onOpen() {
        console.log("OPEN")
        this.setState({visible: true});
    }

    componentWillMount() {
        this.setState({providers: cart.providers});
        console.log('proveedores y productos seleccionados...');
        console.log(cart.providers);
    }

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

        const {props: {name, index, list}} = this;
        if (this.state) {
            return (
                <Container style={styles.container}>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="ios-arrow-back"/>
                            </Button>
                        </Left>

                        <Body>
                        <Title>{name ? this.props.name : "Resumen"}</Title>
                        </Body>

                        <Right />
                    </Header>
                    <Content>

                        <List dataArray={this.state.providers}
                              renderRow={(provider) =>
                            <View>
                              <ListItem itemDivider>
                                <Text>{provider.name}</Text>
                                <Right>
                                <TouchableOpacity onPress={()=>{
                                    url = 'whatsapp://send' + cart.buildRequest(provider);
                                    Linking.canOpenURL(url).then(supported => {
                                      if (!supported) {
                                        ToastAndroid.show('Su dispositivo no soporte whatsapp !', ToastAndroid.LONG);
                                      } else {
                                        return Linking.openURL(url);
                                      }
                                    }).catch(err => console.error('An error occurred', err));
                                                                    }
                                }>
                                <Icon name='ios-send'/>
                                </TouchableOpacity>
                                </Right>
                              </ListItem>
                              <List dataArray={provider.products}
                                    renderRow={(product) =>
                                    <View>
                                      <ListItem>
                                            <Left><Text>{product.name}</Text></Left>
                                            <Body><Text>{product.quantity}</Text></Body>
                                      </ListItem>
                                    </View>
                                  }>
                              </List>
                            </View>
                          }>
                        </List>
                    </Content>
                </Container>
            )
        } else {
            return (<Text style={styles.providerItem}>La lista esta vacia</Text>)
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     instructions: {
//         marginTop: 20,
//         marginBottom: 20,
//     },
// });

export default connect(mapStateToProps, bindAction)(ResumePage);
