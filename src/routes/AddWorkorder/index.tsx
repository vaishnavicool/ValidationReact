import "./style.scss"

import CreateManifest from "./components/CreateManifest"
import Form from "shared/Form"
import ModalForm from "shared/ModalForm"
import NewGenerator from "./components/NewGenerator"
import Topsection from "shared/Topsection"
import { pageConfig } from "./config"
import useEnhancer from "./enhancer"
import { useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"

const AddWorkorder = (props: any) => {
  let allProps = useEnhancer()
  let { updateWorkOrder, popup, setPopup, onHide, allDropdownOpts,workOrder,addWorkOrder } = allProps
  let navigate = useNavigate()

  return (
    <>
      <Topsection>
        <div className="button-container">
          <input
            className="btn-addworkorder-cancel"
            value="Cancel"
            type="button"
            onClick={() => navigate("/customer_processing/work_order")}
          />
          <input className="btn-addworkorder-add" value={"Add"} type="button"  onClick={()=>addWorkOrder()}/>
        </div>
      </Topsection>

      <div className="d-flex mx-4">
        <div className="col-9 row">
          <Form
            config={pageConfig?.addWorkOrderConfig}
            allDropdownOpts={allDropdownOpts}
            update={updateWorkOrder}
            filters={workOrder}
          />
        </div>
        <div className="col-3 d-flex flex-column">
          <div className=" manifest-container">
            <div className="title"><FormattedMessage id="manifests" /></div>
            <input
              className="btn-right-panel"
              value="+ Add New Manifest"
              type="button"
              onClick={() => setPopup("manifest")}
            />
          </div>
          <div className="invoice-container">
            <div className="title"><FormattedMessage id="invoices"/></div>
            <input
              className="btn-right-panel"
              value="+ Add New Invoice"
              type="button"
            />
          </div>
        </div>
      </div>
      <ModalForm
        show={popup == "manifest"}
        setShow={() => setPopup("manifest")}
        onHide={onHide}
        largeModal={true}
        pageTitle={"Add New Manifest"}
      >
        <CreateManifest {...allProps} />
      </ModalForm>
      <ModalForm
        show={popup == "generator"}
        setShow={() => setPopup("generator")}
        onHide={onHide}
        largeModal={true}
        pageTitle={"Add New Generator"}
      >
        <NewGenerator {...allProps} />
      </ModalForm>
    </>
  )
}

export default AddWorkorder
