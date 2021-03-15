import StudentPanel from './panelStudent';
import { connect } from 'react-redux';
import { getCourse, subOnCourse } from './actions';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panelCourses.loading,
        errors: stateRedux.panelCourses.errors,
        courses: stateRedux.panelCourses.courses,
        currentPage: stateRedux.panelCourses.currentPage,
        totalCount: stateRedux.panelCourses.totalCount,
        sizePage: stateRedux.panelCourses.sizePage,
        successMessage: stateRedux.panelCourses.successMessage
    }
}

const PanelStudentPage = StudentPanel;
export default connect(mapState, { getCourse, subOnCourse })(PanelStudentPage)