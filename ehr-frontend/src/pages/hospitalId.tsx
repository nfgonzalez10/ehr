import React, { useState, useEffect } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { Link, useParams } from "react-router";
import {
  createMappingVariable,
  getMappingVariables,
} from "../services/mappingApi";
import { useAuth } from "../context/authContext";
import { CustomModal } from "../components/modal";
import { NewMappingForm } from "../components/newMappingForm";
import { useEhRConfig } from "../hooks/useEhrConfig";

interface MappingVariable {
  id: number;
  parameterName: string;
  tenantId: number;
  referenceKeyName: string;
  keyReferenceId: number;
}

interface MappingResult {
  tenant: { id: string; name: string };
  mapResult: MappingVariable[];
}

export const HospitalId: React.FC = () => {
  const [mappingVariables, setMappingVariables] = useState<MappingResult>({
    tenant: { id: "", name: "" },
    mapResult: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [redirectToHospitals, setRedirectToHospitals] = useState<boolean>(false);
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const { configs, getEhrConfig } = useEhRConfig();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    getEhrConfig();
  }, [token]);

  const fetchMappingVariables = async () => {
    try {
      const data = await getMappingVariables(hospitalId, token);
      setMappingVariables(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mapping variables:", error);
      setLoading(false);
      setRedirectToHospitals(true);
    }
  };
  useEffect(() => {
    fetchMappingVariables();
  }, [hospitalId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (redirectToHospitals) {
    return <Link to={"/hospitals"}>Return to hospitals</Link>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Hospital mapping for {mappingVariables.tenant.name}</h2>
        <ButtonGroup>
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            Add New Mapping
          </Button>
        </ButtonGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Hospital Variable Name</th>
            <th>Reference system</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappingVariables.mapResult.map((variable) => (
            <tr key={variable.id}>
              <td>{variable.parameterName}</td>
              <td>{variable.referenceKeyName}</td>
              <td>
                <ButtonGroup>
                  <Button variant="outline-secondary">Edit</Button>
                  <Button variant="outline-danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal
        show={showModal}
        title="Add new Mapping"
        key={"new-mapping"}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <NewMappingForm
          ehrkeysList={configs}
          handleSubmint={async (values) => {
            await createMappingVariable(hospitalId, token, values);
            setShowModal(false);
            fetchMappingVariables();
          }}
        />
      </CustomModal>
    </div>
  );
};
