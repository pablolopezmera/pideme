import React from 'react'
import { ScrollView, Text, Image, View, ListView, TouchableHighlight } from 'react-native'
import ProviderApi from './ProviderApi'
import styles from "./styles";
import { DrawerNavigator, NavigationActions } from "react-navigation";

class Providers extends React.Component {
  constructor() {
    super();
    this.state = { providers:[] };
  }

  componentWillMount() {
    console.log('will mount providers');
    const api = new ProviderApi();
    api.query().then((response) => {
      console.log(response.length);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var providers = [];
      for (var i = 0; i < response.length; i++) {
        providers.push(response[i].nombre);
      }
      this.setState({providers: ds.cloneWithRows(providers)});
      return response;
    });

  }

  render() {
    if (this.state.providers.rowIdentities) {
      return (
        <ListView
          dataSource={this.state.providers}
          renderRow= {this._renderRow.bind(this)}
        />
      )
    } else {
      return (<Text style={styles.providerItem}>Cargando...</Text>)
    }

  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
        <TouchableHighlight onPress={this._onPressRow.bind(this.rowID, rowData)}>
          <View style={styles.style_row_view}>
            <Text style={styles.providerItem}>{rowData}</Text>
          </View>
        </TouchableHighlight>
    );
  }

  _onPressRow(rowID, rowData) {
    console.log(this.props.navigation);
    this.props.navigation.navigate("ProviderProductsPage", {name: { rowData }})
  }

}

export default Providers
