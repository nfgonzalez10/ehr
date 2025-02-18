import React, { useEffect, useState } from "react";
import { Button, Table, Container, ButtonGroup } from "react-bootstrap";
import { createTenant, getAllTenants } from "../services/hospitalsApi";
import { IHospital } from "../interfaces";
import { CustomModal } from "../components/modal";
import { useAuth } from "../context/authContext";
import { KeyForm } from "../components/newConfigurationForm";
import { Link } from "react-router";

export const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  async function fetchHospitals() {
    const response = await getAllTenants(token);
    setHospitals(response);
  }

  useEffect(() => {
    if (!token) return;
    fetchHospitals();
  }, [token]);

  return (
    <Container>
      <h2 className="my-4">Hospitals</h2>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add New Hospital
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.name}</td>
              <td>
                <ButtonGroup>
                  <Link to={`/hospitals/${hospital.id}`}>
                    <Button variant="outline-primary">View Mapping</Button>
                  </Link>
                  <Button variant="outline-danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal
        show={showModal}
        title="Add new hospital"
        key={"new-key"}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <KeyForm
          nameInput="name"
          handleSubmint={async (values) => {
            const tenant: IHospital = {
              name: values.name,
            };
            await createTenant(tenant, token);
            setShowModal(false);
            fetchHospitals();
          }}
        />
      </CustomModal>
    </Container>
  );
};
