import { Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as yup from "yup";
import { useAuth } from "../context/authContext";
import { IHospital } from "../interfaces";
import { getAllTenants } from "../services/hospitalsApi";
import {
  MappingResult,
  MappingVariable,
} from "../interfaces/MappingResultInterface";
import { getMappingVariables } from "../services/mappingApi";
import { testApi } from "../services/testApi";

interface InputFormProps {
  name: string;
  handleChange: (e: React.ChangeEvent<FormikValues>) => void;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  values: { [key: string]: string };
}

const InputForm = ({
  name,
  handleChange,
  errors,
  touched,
  values,
}: InputFormProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{name}</Form.Label>
      <Form.Control
        required
        name={name}
        placeholder={`Enter ${name} value`}
        type="text"
        value={values[name] ?? ""}
        onChange={handleChange}
        isInvalid={!!errors[name] && touched[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const getInitialVariables = (mapList: MappingVariable[]) => {
  return mapList.reduce(
    (acc: { [key: string]: string }, variable: MappingVariable) => {
      acc[variable.referenceKeyName] = "";
      return acc;
    },
    {}
  );
};

export function TestMapper() {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [tenant, setTenant] = useState("");
  const [mappingVariables, setMappingVariables] = useState<MappingResult>({
    tenant: { id: "", name: "" },
    mapResult: [],
  });
  const [initialValues, setInitialValues] = useState<{ [key: string]: string }>(
    {}
  );
  const { token } = useAuth();
  const [showCase, setShowCase] = useState();

  async function fetchHospitals() {
    const response = await getAllTenants(token);
    setHospitals(response);
  }

  useEffect(() => {
    if (!token) return;
    fetchHospitals();
  }, [token]);

  const fetchMappingVariables = async () => {
    try {
      const data = await getMappingVariables(tenant, token);
      setMappingVariables(data);
      const formValues = getInitialVariables(data.mapResult);
      setInitialValues(formValues);
    } catch (error) {
      console.error("Error fetching mapping variables:", error);
    }
  };

  useEffect(() => {
    if (!token || !tenant) return;
    fetchMappingVariables();
  }, [tenant, token]);

  const schema = yup.object().shape({
    tenantId: yup.string().required(),
  });

  const handleSubmint = async (values: FormikValues) => {
    const { tenantId, ...data } = values;

    const response = await testApi(token, tenantId, data);

    setShowCase(response);
  };

  return (
    <>
      <h2>Test mapper</h2>

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmint}
        initialValues={{ tenantId: "", ...initialValues }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
          setValues,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Select the system EHR variable</Form.Label>
                <Form.Select
                  value={values.tenantId}
                  onChange={(e) => {
                    setFieldValue("tenantId", e.target.value);
                    setTenant(e.target.value);
                    setInitialValues({});
                    setValues({ tenantId: e.target.value });
                  }}
                  name="tenantId"
                  isInvalid={!!errors.tenantId && touched.tenantId}
                >
                  <option disabled value="">
                    (Select a hospital)
                  </option>

                  {hospitals.map((hospital) => (
                    <option
                      key={hospital.id}
                      value={hospital.id}
                      id={hospital.id + ""}
                    >
                      {hospital.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {mappingVariables.mapResult.map((mappingVariable) => {
                return (
                  <InputForm
                    key={mappingVariable.id}
                    name={mappingVariable.referenceKeyName}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                );
              })}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Card className="mt-3">
        <Card.Header className="bg-light">
          <h6 className="mb-0">JSON Output</h6>
        </Card.Header>
        <Card.Body>
          <pre
            className="mb-0"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "1rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              overflow: "auto",
              maxHeight: "400px",
            }}
          >
            {JSON.stringify(showCase, null, 2)}
          </pre>
        </Card.Body>
      </Card>
    </>
  );
}
