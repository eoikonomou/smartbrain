import React from 'react';
import * as apiCalls from '../../api/apiCalls';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => {
            return { dropdownOpen: !prevState.dropdownOpen }
        });
    }

    handleSignOut = () => {
        const token = window.sessionStorage.getItem('token');
        apiCalls.signOut(token)
            .then(resp => {
                if (resp === 'OK') {
                    window.sessionStorage.removeItem('token');
                    this.props.onRouteChange('signout');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-100 ba h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu
                        right
                        className="b--transparent shadow-5"
                        style={{ marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                    >
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={this.handleSignOut}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;
