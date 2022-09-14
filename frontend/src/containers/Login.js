import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/appContext";
import { onError } from "../lib/errorLib";
import { useFormFields } from "../lib/hookLib";
import "./Login.css";

export default function Login() {

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
      });

    const { email, password } = fields;
    
    const { setIsAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(email, password);
            setIsAuthenticated(true);

        } catch (e) {
            onError(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton
  block="true"
  size="lg"
  type="submit"
  isLoading={isLoading}
  disabled={!validateForm()}
>
  Login
</LoaderButton>
            </Form>
        </div>
    );
}