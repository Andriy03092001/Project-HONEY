import Register from './register';
import {connect} from 'react-redux';
import {registerUser} from './actions';

const mapState = (stateRedux) =>
{
    return {
        loading: stateRedux.register.loading,
        errors: stateRedux.register.errors,
    }
}

const RegisterPage = Register;
export default connect(mapState, {registerUser})(RegisterPage)