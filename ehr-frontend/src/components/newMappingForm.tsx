import { Formik, FormikValues } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { IConfigItem } from "../interfaces";

interface NewMappingFormProps {
  handleSubmint: (event: FormikValues) => void;
  ehrkeysList: IConfigItem[];
}

export const NewMappingForm: React.FC<NewMappingFormProps> = ({
  handleSubmint,
  ehrkeysList,
}) => {
  const schema = yup.object().shape({
    parameterName: yup.string().required(),
    keyReferenceId: yup.number().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmint}
      initialValues={{ parameterName: "", keyReferenceId: "" }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select the system EHR variable</Form.Label>
              <Form.Select
                value={values.keyReferenceId}
                onChange={(e) =>
                  setFieldValue("keyReferenceId", e.target.value)
                }
                name="keyReferenceId"
                isInvalid={!!errors.keyReferenceId && touched.keyReferenceId}
              >
                <option disabled value="">
                  (Select a key system)
                </option>

                {ehrkeysList.map((ehrkey) => (
                  <option key={ehrkey.id} value={ehrkey.id} id={ehrkey.id + ""}>
                    {ehrkey.key}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hospital Variable Name</Form.Label>
              <Form.Control
                name="parameterName"
                placeholder="Enter the variable name hospital"
                type="text"
                value={values.parameterName}
                onChange={handleChange}
                isInvalid={!!errors.parameterName && touched.parameterName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.parameterName}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
