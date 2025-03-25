import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/api';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState({ checking: true, available: false });
  const navigate = useNavigate();
  
  // Check API availability on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      const status = await authService.checkApiHealth();
      setApiStatus({ checking: false, available: status.available });
      if (!status.available) {
        setError('Cannot connect to the authentication server. Please try again later.');
      }
    };
    
    checkApiHealth();
  }, []);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (values: { username: string; password: string }, { setSubmitting }: any) => {
    try {
      setError(null);
      await login(values.username, values.password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            UTDRS Dashboard
          </h1>
          <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              {apiStatus.checking ? (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                  Checking connectivity to authentication server...
                </div>
              ) : null}
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || (apiStatus.checking || !apiStatus.available)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              
              {/* Sample credentials for testing */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                <p className="font-bold mb-1">Sample credentials (for demo):</p>
                <p>Username: <span className="font-mono">analyst1</span></p>
                <p>Password: <span className="font-mono">password123</span></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;