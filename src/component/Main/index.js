import Main from './component/Main';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default withRouter(connect(state => { return { Main: state.get('Main') } })(Main));