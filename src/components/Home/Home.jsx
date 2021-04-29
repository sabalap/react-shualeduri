import { withAuthProtected } from '../../Hoc/Protected';

import './home.css';

import { getUsers } from '../../services/users';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Home = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    //   const [sorted, setSorted] = useState([]);
    const [newUser, setNewUser] = useState({ firstname: '', lastname: '' });
    const [filter, setFilter] = useState({ gender: '', quantity: '' });

    const handleFilter = async () => {
        console.log('filter');
        const filtered = await getUsers(filter.quantity, filter.gender);
        console.log(filtered);
        setUsers(filtered.data);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            console.log(users.data);
            setUsers(users.data);
        };
        fetchUsers();
    }, []);

    const handleNewUser = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setNewUser((state) => ({
            ...state,
            [name]: value,
        }));
        console.log(newUser);
    };

    const addUser = () => {
        setUsers((state) => {
            return [newUser, ...state];
        });
        setNewUser({ firstname: '', lastname: '' });
    };

    const handelogout = () => {
        localStorage.removeItem('token');
        history.replace('/auth');
    };

    return (
        <div className="home-page">
            <h1>Home Page</h1>
            <div className="logout">
                <button className="btn btn-outline-danger" onClick={handelogout}>
                    logout
        </button>
            </div>
            <div>
                <select
                    onChange={(e) => {
                        setFilter((state) => ({
                            ...state,
                            gender: e.target.value,
                        }));
                    }}>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <input
                    type="number"
                    onChange={(e) => {
                        setFilter((state) => ({
                            ...state,
                            quantity: e.target.value,
                        }));
                    }}
                />
                <button className="btn btn-dark" onClick={handleFilter}>
                    filter
        </button>
            </div>
            <div className="create-new-user">
                <input
                    type="text"
                    name="firstname"
                    placeholder="firstName"
                    onChange={(e) => handleNewUser(e)}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="lastName"
                    onChange={(e) => handleNewUser(e)}
                />
                <button className="btn btn-primary" onClick={addUser}>
                    add
        </button>
            </div>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {users.map((user) => (
                            <div
                                className="card shadow-sm"
                                key={user.uuid ? user.uuid : users.length}>
                                <img
                                    src={user.image ? user.image : users[users.length - 1].image}
                                    className=" card-img-top"
                                    alt=""
                                />

                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary">
                                                {user.firstname}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary">
                                                {user.lastname}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuthProtected(Home);