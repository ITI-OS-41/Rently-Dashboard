import React, {useContext} from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Nav,
    Navbar,
    UncontrolledDropdown,
} from "reactstrap";
import history from "../../functions/history";
import axios from "../../functions/axios";
import {UserContext} from "../../Context";

const AdminNavbar = (props) => {

    const {user, setUser} = useContext(UserContext);


    const handleLogout = () => {
        setUser({});
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('rently-token');
        localStorage.removeItem('rently-user');

        history.push("/auth/login");
    };

    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        {props.brandText}
                    </Link>

                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        {user && (
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                        alt="..."
                        src={user.photo || "../../assets/img/theme/team-4-800x800.jpg"}
                    />
                  </span>
                                        <Media className="ml-2 ">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.username}
                    </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem href="#" onClick={handleLogout}>
                                        <i className="ni ni-user-run"/>
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
