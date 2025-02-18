import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./context/authContext";
import { Card, Container, ListGroup } from "react-bootstrap";

export function App() {
  const { token } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    const isAuth = !!token;
    if (!isAuth) {
      navigation("/login");
    }
  }, [token, navigation]);

  const steps = [
    "Go to Configuration tab",
    "Click on Load sample data",
    "Go to Hospitals tab",
    "Add a new hospital",
    "The new hospital will appear in the below table",
    "Click on Add Mapper",
    "Select the configuration name and insert the EHR value (e.g., Select Name, insert p_name), (Select gender, insert p_gender). Add the mapper",
    "Go to test tab",
    "Select the hospital",
    "Insert the patient data",
    "Check the JSON output"
  ];

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title className="text-primary text-center">
            Step-by-Step Guide
          </Card.Title>
          <ListGroup numbered>
            {steps.map((step, index) => (
              <ListGroup.Item key={index} className="py-2">
                {step}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
