import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Styles, Images, Colors } from '@theme/';

class Splash extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		setTimeout(() => {
			this.props.navigation.navigate('login');
		}, 1500);
	}

	render() {
		return <Image resizeMode={'stretch'} style={[ Styles.fixedFullScreen ]} source={Images.logo} />;
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}
function mapStateToProps(state) {
	return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
