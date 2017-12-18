import React, { Component } from 'react';
import { View, Alert, BackHandler, ScrollView, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import CT from '@src/constants';
import Types from '@actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OverlaySpinner from '@components/OverlaySpinner';
import Utils from '@src/utils';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

import OptionBox from '@components/OptionBox';
import Search from '@components/SearchBar';

var radio_props = [
	{ label: 'Outlet Name', value: 0 },
	{ label: 'Outlet ID', value: 1 },
	{ label: 'Distance', value: 2 }
];
var sortVal = 0;
var _this;
onPress = (v) => {};
class ListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value3Index: 0,
			dayfilter: '_Visit_All',
			sortFilter: 0,
			popup: false,
			searchKey: ''
		};
		_this = this;
	}
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', function() {
			// this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
			// Typically you would use the navigator here to go to the last state.
			Alert.alert('You pressed Back Button', 'Are you sure to exit?', [
				{
					text: 'Yes',
					onPress: () => {
						BackHandler.exitApp();
					}
				},
				{ text: 'No', onPress: () => {} }
			]);
			return true;
		});
		this.props.dispatch({ type: 'GET_LIST' });
	}
	onDayChoose = (filter) => {
		this.setState({ dayfilter: filter });
	};
	onGo = (data) => {
		//this.props.globals.navigator.goBack()
		this.props.navigation.navigate('map', { data: data });
	};
	onChange = (value) => {
		sortVal = value;
		this.popupDialog.dismiss();
	};
	recalculateDistance = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.dispatch({
					type: Types.SET_DATA,
					data: {
						location: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						}
					}
				});
			},
			(error) => console.log(error)
		);
	};
	render() {
		var i = 0;
		return (
			<View style={[ Styles.fullScreen, { flex: 1, backgroundColor: Colors.brandSecondary } ]}>
				<NavigationBar
					statusBar={{ style: 'light-content' }}
					style={Styles.nav}
					title={
						<View style={{ marginLeft: -35 }}>
							<View style={{ paddingTop: 5, height: 40, width: Metrics.screenWidth - 140 }}>
								<Search
									inputStyle={{ width: Metrics.screenWidth - 140 }}
									cancelButtonViewStyle={{ width: 0, height: 0 }}
									cancelButtonStyle={{ width: 0, height: 0 }}
									onChangeText={(txt) => this.setState({ searchKey: txt })}
									onCancel={() => this.setState({ searchKey: '' })}
									onDelete={() => this.setState({ searchKey: '' })}
									inputHeight={35}
									backgroundColor={Colors.brandPrimary}
									cancelTitle={''}
								/>
							</View>
						</View>
					}
					tintColor={Colors.brandPrimary}
					leftButton={CommonWidgets.renderNavBarLeftButton(
						() => this.props.navigation.navigate('DrawerOpen'),
						'menu'
					)}
					rightButton={
						<View style={{ flexDirection: 'row' }}>
							{CommonWidgets.renderNavBarRightButton(() => this.popupDialog.show(), 'long-arrow-up')}
							{CommonWidgets.renderNavBarLeftButton(() => this.recalculateDistance(), 'refresh')}
						</View>
					}
				/>

				<ScrollView style={{ flex: 1 }} />
				<PopupDialog
					width={Metrics.screenWidth / 2}
					height={Metrics.screenHeight / 4}
					dialogTitle={<DialogTitle title="Sort By What?" />}
					dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
					onDismissed={() => {
						_this.setState({ sortFilter: sortVal });
					}}
					style={{ padding: 20 }}
					ref={(popupDialog) => {
						this.popupDialog = popupDialog;
					}}
				>
					<OptionBox onChange={this.onChange} />
				</PopupDialog>
				<OverlaySpinner visible={this.props.globals.spinnerVisible} />
			</View>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	const globals = state.get('globals');
	const navigator = state.get('routes');
	return { globals, navigator };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
