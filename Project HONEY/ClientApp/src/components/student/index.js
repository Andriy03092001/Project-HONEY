import StudentPanel from './panelStudent';
import { connect } from 'react-redux';
import { getCourse } from './actions';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panelCourses.loading,
        errors: stateRedux.panelCourses.errors,
        courses: stateRedux.panelCourses.courses,
        currentPage: stateRedux.panelCourses.currentPage,
        totalCount: stateRedux.panelCourses.totalCount,
        sizePage: stateRedux.panelCourses.sizePage,
    }
}

const PanelStudentPage = StudentPanel;
export default connect(mapState, { getCourse })(PanelStudentPage)