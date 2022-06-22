import "./style.scss"

import { Dropdown } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import Image from "shared/Image"
import menuConfig from "./config"

const Menubar = () => {
  return (
    <>
      
      <div className="menu-list">
        <div className="menubar">
          {menuConfig.map((d, index) =>
            !d.children ? (
              <div className="col" key={index}>
                <div className="custom-dropdown">
                  <button
                    type="button"
                    id="dropdown-basic"
                    aria-expanded="false"
                    className="bg-transparent border-0 custom-dropdown btn btn-light"
                  >
                    <Image src={`${d.icon}_grey.png`} className="menubar-icon"/>
                    <FormattedMessage id={d.title} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="col">
                <Dropdown drop="end">
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    className="bg-transparent border-0 custom-dropdown"
                  >
                    <Image src={`${d.icon}_grey.png`} className="menubar-icon"/><span className="menubar-name"><FormattedMessage id={d.title} /></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="menu">
                    {d.children.map((child) => (
                      <Dropdown.Item key={child.path} href={child.path}>
                        <FormattedMessage id={child.title} />
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Menubar
