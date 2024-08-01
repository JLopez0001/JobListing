import PropTypes from 'prop-types';
import { useState } from "react";
import { register } from "../../../services/users.js";
import { useNavigate } from "react-router-dom";


function Register({ setUser }) {
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        first_name:'',
        last_name:'',
        employed: null,
        isError: false,
        errorMsg: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name] : value
        }));
    };

    
    const onRegister = async (e) => {
        e.preventDefault();
        try {
            const user = await register(formData);
            // console.log(user);
            setUser(user);

            alert(`${user.username}! Registered Completed!`);
            navigate('/listing');
        } catch (error) {
            console.error("Error trying to Register", error.message);
            setFormData((prevForm) => ({
                isError: true,
                errorMsg: error.message,
                username: prevForm.username,
                email: prevForm.email,
                password: "",
                first_name:'',
                last_name:'',
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
            <form onSubmit={onRegister} id="register-form">
                <header>
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
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
                    <br/>
                    <label htmlFor="email" >Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                    <br/>
                    <label htmlFor="first_name">First Name: </label>
                    <input 
                        type="text" 
                        name="first_name" 
                        id="fname" 
                        onChange={handleChange}
                        value={formData.first_name}
                        required
                    />
                    <br />
                    <label htmlFor="last_name">Last Name: </label>
                    <input 
                        type="text"
                        name="last_name" 
                        id="lname" 
                        onChange={handleChange}
                        value={formData.last_name}
                        required
                    />
                    <br />
                </section>

                <fieldset>
                    <legend>Employment Status</legend>
                    <p>Are You Employed?</p>
                    <label htmlFor="employed">Yes</label>
                    <input 
                        type="radio" 
                        name="employed" 
                        id="employed" 
                        onChange={handleChange}
                        value= "true" 
                        required
                    />
                    <label htmlFor="unemployed">No</label>
                    <input 
                        type="radio" 
                        name="employed" 
                        onChange={handleChange}
                        id="unemployed"
                        value="false" 
                    />
                </fieldset>

                {renderError()}
          
            </form> 
        </main>
    </div>
  );
}

// Define PropTypes for the Register page
Register.propTypes = {
    setUser: PropTypes.func.isRequired, 
};

export default Register;