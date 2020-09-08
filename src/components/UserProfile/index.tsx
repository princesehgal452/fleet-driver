// import * as React from 'react';
// import { withRouter } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/auth';
//
// class UserProfile extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.handleSignOut = this.handleSignOut.bind(this);
//     const user = firebase.auth().currentUser;
//     this.state = {
//       username: user ? user.displayName || user.email : null
//     };
//   }
//
//   handleSignOut() {
//     this.props.location.pathname = '/';
//     firebase
//       .auth()
//       .signOut();
//   }
//
//   render() {
//     if (this.state.username === null) {
//       return (null);
//     }
//     return (
//       <li className="nav-item pl-2 pr-2 dropdown">
//         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           {this.state.username}
//         </a>
//         <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
//           <a className="dropdown-item" onClick={this.handleSignOut}>Log Out</a>
//         </div>
//       </li>
//     );
//   }
// }
//
// export default withRouter(UserProfile);
