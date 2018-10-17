import React from 'react';
import './Profile.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
        let joined = new Date(this.props.user.joined);
        this.joined = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"][joined.getMonth()] + " " + joined.getFullYear();
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case 'user-name':
                this.setState({ name: event.target.value });
                break;
            case 'user-age':
                this.setState({ age: event.target.value });
                break;
            case 'user-pet':
                this.setState({ pet: event.target.value });
                break;
            default:
                return;
        }
    }

    onProfileUpdate = () => {
        let data = { ...this.props.user, ...this.state };
        fetch(`http://localhost:3002/profile/${this.props.user.id}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formInput: data })
        }).then(response => {
            this.props.toggleModal();
            this.props.loadUser(data);
        })
    }

    render() {
        const { user, toggleModal } = this.props;
        const { name } = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-100 ba h3 w3 dib" alt="avatar" />
                        <h1>{name}</h1>
                        <h4>{`Images Submitted: ${user.entries}`}</h4>
                        <p>{`Member since: ${this.joined}`}</p>
                        <hr />
                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            type="text"
                            placeholder={user.name}
                            name="user-name"
                            id="name"
                        />
                        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            type="text"
                            placeholder={user.age}
                            name="user-age"
                            id="age"
                        />
                        <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            type="text"
                            placeholder={user.pet}
                            name="user-pet"
                            id="pet"
                        />
                        <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20" onClick={this.onProfileUpdate}>
                                Save
                        </button>
                            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={toggleModal}>
                                Cancel
                        </button>
                        </div>
                    </main>
                    <div className="modal-close" onClick={toggleModal}>&times;</div>
                </article>
            </div>
        );
    }
}

export default Profile;
