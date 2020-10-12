import React from 'react';

import './SideDrawer.css';

const SideDrawer = props => {

  return <aside className="side-drawer" onClick={props.closed}>{props.children}</aside>;


};

export default SideDrawer;
