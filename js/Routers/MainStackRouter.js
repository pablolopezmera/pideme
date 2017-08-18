import React, { Component } from "react";
import Login from "../components/login/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import ProviderProductsPage from "../components/providerProductsPage";
import ProvidersPage from "../components/providers";
import ProductPage from "../components/productPage";
import ResumePage from "../components/resumePage";
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
  ProvidersPage: { screen: ProvidersPage },
  ProviderProductsPage: { screen: ProviderProductsPage },
  ProductPage: { screen: ProductPage },
  ResumePage: { screen: ResumePage }
}));
