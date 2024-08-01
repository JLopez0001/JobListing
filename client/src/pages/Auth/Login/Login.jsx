import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/users";

function Login({ setUser }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try{
            const user = await login(formData);
            // console.log(user);
            setUser(user)
            navigate('/listing');
        } catch (error) {
            console.error("Error trying to login", error.message);
            setFormData((prevForm) => ({
                ...prevForm,
                isError: true,
                errorMsg: error.message,
                username: prevForm.username,
                password: "",
              }));
        }
    };


    // Renders error button if register was not successful
    const renderError = () => {
        const toggleForm = formData.isError ? "danger" : "";
        if (formData.isError) {
          return (
            <button type="submit" className={toggleForm}>
              {formData.errorMsg}
            </button>
          );
        } else {
          return (
            <button className="submitButton" type="submit">
              Submit
            </button>
          );
        }
    };


  return (
    <div>
        <main>
            <form onSubmit={onLogin} id="login-form">
                <header>
                    <h1>Login</h1>
                    <p>Please fill out all fields</p>
                </header>
                
                <section>
                    <label htmlFor="username">Username: </label>
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        value={formData.username}
                        required 
                    />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password} 
                        required
                    />
                </section>
                {renderError()}
            </form>
        </main>
    </div>
  );
}

// Define PropTypes for the Login page
Login.propTypes = {
    setUser: PropTypes.func.isRequired, 
};

export default Login;