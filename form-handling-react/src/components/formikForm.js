import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        alert("Form submitted");
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <h2>Formik Form</h2>
                <div>
                    <label htmlFor="formik-username">Username:</label>
                    <Field type="text" id="formik-username" name="username" />
                    <ErrorMessage name="username" component="div" />
                </div>
                <div>
                    <label htmlFor="formik-email">Email:</label>
                    <Field type="email" id="formik-email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label htmlFor="formik-password">Password:</label>
                    <Field type="password" id="formik-password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">Register</button>
            </Form>
        </Formik>
    );
};

export default FormikForm;