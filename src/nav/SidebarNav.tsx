import { Nav } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { paths } from "../routes/routes"
import logo from "../styles/images/logo.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faChartColumn,
  faProjectDiagram,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { resetUserData } from "../pages/auth/auth-slice"
import { useDispatch } from "react-redux"

export function SidebarNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(resetUserData())
    navigate(paths.login)
  }

  return (
    <div className="sidebar p-3 d-flex flex-column justify-content-between">
      <div className="flex-grow-1">
        <div className="brand-logo mb-3">
          <img src={logo} alt="Logo" onClick={() => navigate(paths.home)} />
        </div>
        <Nav
          className="d-flex flex-column"
          activeKey={pathname}
          onSelect={(path) => navigate(path ?? "/")}
        >
          <Nav.Link eventKey={paths.home} className="mb-3">
            <div className="d-flex align-items-center f-14">
              <div className="menu-icon">
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <span className="menu-title">Home</span>
            </div>
          </Nav.Link>
          <Nav.Link eventKey={paths.dashboard} className="mb-3">
            <div className="d-flex align-items-center f-14">
              <div className="menu-icon">
                <FontAwesomeIcon icon={faChartColumn} />
              </div>
              <span className="menu-title">Dashboard</span>
            </div>
          </Nav.Link>
          <Nav.Link eventKey={paths.workflow}>
            <div className="d-flex align-items-center f-14">
              <div className="menu-icon">
                <FontAwesomeIcon icon={faProjectDiagram} />
              </div>
              <span className="menu-title">Workflow</span>
            </div>
          </Nav.Link>
        </Nav>
      </div>
      <div className="menu-bottom">
        <a href="/" className="logout-link" onClick={handleLogout}>
          <div className="d-flex align-items-center f-14">
            <div className="menu-icon">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            <span className="menu-title">Logout</span>
          </div>
        </a>
      </div>
    </div>
  )
}
