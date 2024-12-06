import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
      toast.error( "Error al iniciar sesión", {position: "top-center"});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full px-4 py-2 border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <Field
                name="password"
                type="password"
                className="w-full px-4 py-2 border rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isSubmitting ? "Cargando..." : "Ingresar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
