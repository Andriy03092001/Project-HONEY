import Panel from './panel';
import { connect } from 'react-redux';
import { getData } from './actions';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panel.loading,
        errors: stateRedux.panel.errors,
        students: stateRedux.panel.students
    }
}

const PanelPage = Panel;
export default connect(mapState, { getData })(PanelPage)