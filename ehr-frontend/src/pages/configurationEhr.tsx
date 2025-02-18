import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import {
  deleteEhrConfiguration,
  getEhrConfiguration,
  loadEhrConfigurations,
  postEhrConfiguration,
} from "../services/api";
import { KeyForm } from "../components/newConfigurationForm";
import { CustomModal } from "../components/modal";

interface ConfigItem {
  id: number;
  key: string;
}

export function ConfigurationEhr() {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  async function getEhrConfig() {
    console.log("token", token);
    const response = await getEhrConfiguration(token);
    setConfigs(response);
  }

  useEffect(() => {
    if (!token) return;
    getEhrConfig();
  }, [token]);

  const handleDeleteConfig = async (id: number) => {
    await deleteEhrConfiguration(token, id.toString());
    getEhrConfig();
  };

  const handleLoadSampleData = async () => {
    // Implement logic to load sample data
    console.log("Loading sample data...");

    await loadEhrConfigurations(token);

    getEhrConfig();
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>EHR Configuration</h2>
        <ButtonGroup>
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            Add New Configuration
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => handleLoadSampleData()}
          >
            Load Sample Data
          </Button>
        </ButtonGroup>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {configs.map((config) => (
            <tr key={config.id}>
              <td>{config.key}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteConfig(config.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal
        show={showModal}
        title="Add new Key Config"
        key={"new-key"}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <KeyForm
          nameInput="key"
          handleSubmint={async (values) => {
            await postEhrConfiguration(token, values);
            setShowModal(false);
            getEhrConfig();
          }}
        />
      </CustomModal>
    </div>
  );
}
