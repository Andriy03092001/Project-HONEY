import Panel from './panel';
import { connect } from 'react-redux';
import { getData, editStudent } from './actions';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panel.loading,
        errors: stateRedux.panel.errors,
        students: stateRedux.panel.students,
        currentPage: stateRedux.panel.currentPage,
        totalCount: stateRedux.panel.totalCount,
        sizePage: stateRedux.panel.sizePage,
    }
}

const PanelPage = Panel;
export default connect(mapState, { getData, editStudent })(PanelPage)