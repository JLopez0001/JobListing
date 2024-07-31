import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/users";

function Login() {
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
            const response = await login(formData);
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error("Error trying to login", error.message);
            setFormData((prevForm) => ({
                ...prevForm,
                isError: true,
                errorMsg: "Invalid Credentials",
                username: prevForm.username,
                password: "",
              }));
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
                <button type="submit">Login</button>
            </form>
        </main>
    </div>
  );
}

export default Login;