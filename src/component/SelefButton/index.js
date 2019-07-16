import SelefButton from './component/SelefButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
export default withRouter(connect(state => { return { SelefButton: state.get('SelefButton') } })(SelefButton));