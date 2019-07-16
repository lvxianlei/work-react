import PageFormSetting from './component/PageFormSetting';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

export default connect(state => { return { pageFormData: state.get('PageFormSetting') } })(PageFormSetting);