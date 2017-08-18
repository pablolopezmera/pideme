import React, {Component} from "react";
import { TouchableOpacity } from "react-native";
import {connect} from "react-redux";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Right,
    Body
} from "native-base";

import styles from "./styles";
var cart = require('./cart');

class ShoppingCart extends Component {

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
        console.log('wilmount::::');
        this.setState({caca: 'caca'});
    }

    render() {
        return (
            <Container>
                <Content>
                    <Right>
                        <Button onPress={() => {
                                this.props.navigation.navigate("ResumePage");
                        }}>
                            <Icon name='ios-cart'/><Text>{this.props.totalProviders}</Text>
                            <Text>-</Text>
                            <Text>{this.props.totalProducts}</Text></Button>
                    </Right>
                </Content>
            </Container>
        );
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

// export default connect(mapStateToProps, bindAction, addProduct)(ShoppingCart);
export default connect(mapStateToProps, bindAction)(ShoppingCart);
