import './App.css';
import {useState} from "react";
import http from './utils/api/UsersApi'

function App() {
    const [text, setText] = useState('paragraph')

    function alive() {
        http.get('/')
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response.data)
                    setText(response.data)
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error)
                return 'Error'
            })
            .then(function () {
                // always executed

            })
    }

    function getUsers() {
        http.get('/users')
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function getUserById(id) {
        http.get(`/users/${id}`)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function createUser(name, age, gender) {
        const payload = {
            "name": name,
            "age": age,
            "gender": gender
        }
        http.post('/users', payload)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function updateUser(id, name, age, gender) {
        const payload = {
            "id": id,
            "name": name,
            "age": age,
            "gender": gender
        }
        http.put('/users', payload)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <h1>Users API with Axios</h1>
            <h3>'npm install axios'</h3>
            <p>{text}</p>

            <button onClick={() => {
                setText('New text')
            }}>New text
            </button>
            <button onClick={alive}>Alive</button>
            <button onClick={getUsers}>Get Users</button>
            <button onClick={function () {
                getUserById(14)
            }}>Get user by id
            </button>
            <button onClick={function () {
                createUser('Ada', 18, 'female')
            }}>Create user
            </button>
            <button onClick={function () {
                updateUser(14, 'Ada', 19, 'female')
            }}>Update User
            </button>
        </div>
    );
}

export default App;
