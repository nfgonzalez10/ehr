import { Formik, FormikValues } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";

interface KeyFormProps {
  handleSubmint: (event: FormikValues) => void;
  nameInput: string;
}

export const KeyForm: React.FC<KeyFormProps> = ({
  handleSubmint,
  nameInput,
}) => {
  const schema = yup.object().shape({
    [nameInput]: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmint}
      initialValues={{ [nameInput]: "" }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formKey">
              <Form.Label>{`Enter ${nameInput}`}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter ${nameInput}`}
                value={values[nameInput]}
                name={nameInput}
                onChange={handleChange}
                isInvalid={!!errors[nameInput] && touched[nameInput]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[nameInput]}
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
