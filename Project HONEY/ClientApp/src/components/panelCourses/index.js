import CoursesPanel from './panelCourses';
import { connect } from 'react-redux';
import { getData } from './actions';

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

const PanelCoursesPage = CoursesPanel;
export default connect(mapState, { getData })(PanelCoursesPage)