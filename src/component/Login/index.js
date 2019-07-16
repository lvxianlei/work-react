import Login from './component/Login';
import { connect } from "react-redux";

export default connect(state => { return { Login: state.get('Login') } })(Login);