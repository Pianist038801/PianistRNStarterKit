import React, { Component } from 'react';
import { Text, TextInput, View, Platform, Image, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import Types from '@actions/actionTypes';
import OverlaySpinner from '@components/OverlaySpinner';
import CommonWidgets from '@components/CommonWidgets';

import { Styles, Images, Colors, Fonts, Metrics } from '@theme/';
import Utils from '@src/utils';
import styles from './styles';
import { setSpinnerVisible, setNavigator } from '@actions/globals';

import { getLogin, getList, getVersion } from '@api/getList';
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}
	componentWillMount() {
		this.props.setNavigator(this.props.navigation);
	}

	onTextInputFocus(value) {
		this.setState({ emailFocus: false, passwordFocus: false });
		this.setState({ [`${value}Focus`]: true });
	}

	async doLogin() {
		if (this.state.email == '' || this.state.password == '') alert('All fields should be valid');
		else {
			try {
				//yield put({type: Types.SET_SPINNER_VISIBLE, spinnerVisible: true})

				this.props.dispatch({
					type: 'LogIn',
					username: this.state.email,
					password: this.state.password,
					uid: Platform.OS == 'android' ? DeviceInfo.getInstanceID() : DeviceInfo.getUniqueID()
				});
			} catch (error) {
				console.log(error);
			}
			//this.props.dispatch({type: 'LogIn', username: this.state.email, password: this.state.password, uid: Platform.OS=='android'?DeviceInfo.getInstanceID():DeviceInfo.getUniqueID()})
		}
	}

	render() {
		return (
			<KeyboardAwareScrollView
				style={{ flex: 1, backgroundColor: Colors.brandPrimary }}
				automaticallyAdjustContentInsets={false}
			>
				<View style={Styles.fullScreen}>
					<View style={[ Styles.center, { flex: 5 } ]}>
						<Text style={[ Fonts.style.h1, { color: Colors.textPrimary } ]}>{I18n.t('APP_NAME')}</Text>
					</View>

					{/* -----Body---- */}
					<View style={styles.bodyContainer}>
						<View
							style={[
								Styles.textInputContainerStyle,
								{ borderColor: Utils.getTextInputBorderColor(this.state.emailFocus) }
							]}
						>
							<TextInput
								style={Styles.textInputStyle}
								underlineColorAndroid={'transparent'}
								placeholder={'USERNAME'}
								placeholderTextColor={Colors.textPlaceholder}
								multiline={false}
								onChangeText={(text) => this.setState({ email: text })}
								keyboardType={'email-address'}
								returnKeyType={'next'}
								value={this.state.email}
								onSubmitEditing={() => this.loginpwd.focus()}
								onFocus={() => this.onTextInputFocus('email')}
							/>
						</View>
						{CommonWidgets.renderSpacer(1)}
						<View
							style={[
								Styles.textInputContainerStyle,
								{ borderColor: Utils.getTextInputBorderColor(this.state.passwordFocus) }
							]}
						>
							<TextInput
								value={this.state.password}
								ref={(c) => {
									this.loginpwd = c;
								}}
								style={Styles.textInputStyle}
								underlineColorAndroid={'transparent'}
								placeholder={I18n.t('PASSWORD')}
								placeholderTextColor={Colors.textPlaceholder}
								multiline={false}
								secureTextEntry
								onChangeText={(text) => this.setState({ password: text })}
								returnKeyType={'go'}
								onSubmitEditing={() => this.doLogin()}
								onFocus={() => this.onTextInputFocus('password')}
							/>
						</View>
						{CommonWidgets.renderSpacer(20)}
						{CommonWidgets.renderMaterialButton(I18n.t('LOGIN'), Colors.brandLogin, () => this.doLogin())}
					</View>
				</View>
				<OverlaySpinner visible={this.props.globals.spinnerVisible} />
			</KeyboardAwareScrollView>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		setNavigator: (route) => dispatch(setNavigator(route)),
		setSpinnerVisible: (spinnerVisible) => dispatch(setSpinnerVisible(spinnerVisible))
	};
}
function mapStateToProps(state) {
	const globals = state.get('globals');
	return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
