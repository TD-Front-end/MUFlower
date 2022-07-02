import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { getError } from './utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate} from 'react-router-dom';



export default function Login() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    //
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // localStorage.setItem('accessToken', true);
            Axios.post("http://localhost:5000/login", {
                Email: email,
                Password: password
            })

            toast.success('Login success!');
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }

    }

    return (
        <Container className="small-container">
            <h1 className="my-3">Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign Up</Button>
                </div>
                <div className="mb-3">
                    New account?{' '}
                    <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>
    )
}

