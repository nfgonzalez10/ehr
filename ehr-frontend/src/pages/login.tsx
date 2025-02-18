import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { loginUser } from "../services/api";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function Login() {
  const { login, token } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    const isAuth = !!token;
    if (isAuth) {
      navigation("/");
    }
  }, [token, navigation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const token = await loginUser("test");
    login(token);
    navigation("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Button type="submit"> Login</Button>
      </Form>
    </div>
  );
}
