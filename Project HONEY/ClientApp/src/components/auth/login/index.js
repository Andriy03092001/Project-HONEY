import Login from './login';
import { connect } from 'react-redux';
import { loginUser, loginFacebook } from './actions';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.login.loading,
        errors: stateRedux.login.errors,
    }
}

const LoginPage = Login;
export default connect(mapState, { loginUser, loginFacebook })(LoginPage)