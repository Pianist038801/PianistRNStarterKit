import React, { Component } from 'react';
import { View, Alert, ScrollView, Platform, TouchableOpacity, FlatList, Keyboard, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';
import { Styles, Colors, Metrics, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
class About extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var i = 0;
		return (
			<View style={[ Styles.fullScreen, { flex: 1, backgroundColor: Colors.brandSecondary } ]}>
				<NavigationBar
					statusBar={{ style: 'light-content' }}
					style={Styles.nav}
					title={CommonWidgets.renderNavBarHeader('About')}
					tintColor={Colors.brandPrimary}
				/>
				<View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
