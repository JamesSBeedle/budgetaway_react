import './SideBar.css'
import BudgetContainer from '../containers/BudgetContainer.js'
 
import { slide as SideBar } from 'react-burger-menu';

const SideBarContainer = () => {

  // const sendRefresh = true

  return (
    // <SideBar onClick={sendRefresh} sendRefresh={sendRefresh}>
    <SideBar>
      <BudgetContainer/>
    </SideBar>
  );
};

export default SideBarContainer