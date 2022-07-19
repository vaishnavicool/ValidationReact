import React from "react"
import { pageConfig } from "routes/AddWorkorder/config"
import Image from "shared/Image"
import Form from "shared/Form"
import "./style.scss"
import Field from "shared/Field"
import useEnhancer from "routes/AddWorkorder/enhancer"
import { useDetectClickOutside } from "react-detect-click-outside"

const CreateManifest = () => {
  let { showMoreAction, setShowMoreAction } = useEnhancer()
  
  const moreActionMenuClick = useDetectClickOutside({
    onTriggered: () => setShowMoreAction(false)
  })
  return (
    <>
      <div className="d-flex col-12 p-3">
        <div className="col-6 left-section">
          <Form config={pageConfig?.addManifestConfig} />
          
        </div>
        <div className="col-6 right-section">
          <div>
            <div
              className="rightitem-dots"
              ref={moreActionMenuClick}
              onClick={() => setShowMoreAction(true)}
            >
              <Image src="dots.png" />
            </div>
            <div className="rightitem-container">
              <div className="rightitems-text">More Actions</div>
              <div className="rightitem-link">All actions open in new tab</div>
              {showMoreAction && <div className="dots-menu" >
                <div className="arrow-top"></div>
                <div className="img-text-dots">
                  <Image src="ic_details.png" />
                  <span>Details</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_menifes.png" />
                  <span>Copy Menifes</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_reciving_logs.png" />
                  <span>Receiving Logs</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_fixdots.png" />
                  <span>Fix DOTs</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_print.png" />
                  <span>Print Options</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_tracking_report.png" />
                  <span>Tracking Report</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_resend_base.png" />
                  <span>ReSend to OnBase</span>
                </div>
                <div className="img-text-dots">
                  <Image src="ic_delete.png" />
                  <span>Delete</span>
                </div>
              </div>}
            </div>
          </div>

          <div>
            <div className="leftitem-container">
              <div className="left-text">Documents</div>
              <div className="left-textsmall">
                What type of files are you uploading?{" "}
                <span className="icon-info">
                  <Image
                    src="ic_info.png"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Tooltip on top"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="grey-container row">
            <Field
              type="dropdown"
              placeholder="Manifest"
              name={"documenttype"}
              width="col-5 gx-2"
            />
            <Field
              type="file"
              placeholder="Select Document"
              name={"documenttype"}
              width="col-5 gx-2"
            />
            <input
              className="btn-upload col-2 mb-3"
              value="Upload"
              type="button"
            />

            <div className="instruction-text">Instructions</div>
            <div className="instruction-sub-text">{`You must select a file with these extensions: pdf,jpg,jpeg,png,gif`}</div>
            <div className="instruction-sub-text">{`After the file is selected, if you see a red dot, it means the file is not accepted. A green dot means the file is uploaded successfully.`}</div>
            <div className="instruction-sub-text">{`Any spaces, "&", "." or "+" characters in the file name will be replaced with an "_" character`}</div>
          </div>
          <div className=" row tablefooter-container">
            <div className="blackbox"></div>
            <div className="tablefooter-text">Table Comes here</div>
          </div>
          <div className="footer-text">Note</div>
          <div className="footer-subtext">
            if the file you have selected did not appear, your browser might
            have a pop up blocker. Please disable that.
          </div>
          <div className="downarrow-img">
            <Image src="ic_down_arrow.png" />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center g-0">
        <input
          className="btn-addworkorder-cancel"
          value="Cancel"
          type="button"
        />
        <input
          className="btn-addworkorder-add"
          value="Save Manifest"
          type="button"
        />
      </div>
    </>
  )
}

export default CreateManifest
