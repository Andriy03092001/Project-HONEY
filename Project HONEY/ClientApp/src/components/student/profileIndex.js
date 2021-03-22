import { connect } from 'react-redux';
import { getProfile } from './actions';
import Profile from './profile';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panelStudent.loading,
        errors: stateRedux.panelStudent.errors,
        courses: stateRedux.panelStudent.courses,
        fullName: stateRedux.panelStudent.fullName,
        age: stateRedux.panelStudent.age,
        email: stateRedux.panelStudent.email,
        successMessage: stateRedux.panelStudent.successMessage
    }
}

const ProfilePage = Profile;
export default connect(mapState, { getProfile })(ProfilePage)