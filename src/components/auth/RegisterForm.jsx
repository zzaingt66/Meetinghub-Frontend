import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Campo requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register({ name: values.name, email: values.email, password: values.password });
      toast.success("Registro exitoso");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">Nombre</label>
              <Field name="name" type="text" className="w-full px-4 py-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">Email</label>
              <Field name="email" type="email" className="w-full px-4 py-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">Contraseña</label>
              <Field name="password" type="password" className="w-full px-4 py-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <Field name="confirmPassword" type="password" className="w-full px-4 py-2 border rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {isSubmitting ? "Cargando..." : "Registrarse"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
