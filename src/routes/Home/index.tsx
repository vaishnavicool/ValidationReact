import "./style.scss"

import TablePanel from "./components/TablePanel";
import TopSection from "../../layout/breadcrumb/index";
import useEnhancer from "./enhancer"

function Dashboard(props: any) {
  let extraProps = useEnhancer();

  return (
    <>
    <TopSection {...extraProps}/>
    <div className='filterchip-container'>FIlter chips</div>
        
    <div className="container-fluid p-0">
      <div className="profile-container pt-3 ">
        <div className="table-container">
          {/* <LeftPanel {...extraProps} /> */}
          <TablePanel {...extraProps} />
        </div>
      </div>
    </div>
    </>
  )
}
export default Dashboard
