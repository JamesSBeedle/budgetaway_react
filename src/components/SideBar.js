import './SideBar.css'
import BudgetContainer from '../containers/BudgetContainer.js'
 

import React from 'react';
import { slide as SideBar } from 'react-burger-menu';

const SideBarContainer = () => {
  return (
    <SideBar>
      <BudgetContainer/>
    </SideBar>
  );
};

export default SideBarContainer