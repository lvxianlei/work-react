import Edit from './component/Edit';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

export default connect(state => { return { Edit: state.get('Edit') } })(Edit);