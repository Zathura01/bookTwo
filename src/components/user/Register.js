import React from 'react'
import Inputuser from './Inputuser'
import Countryhook from './Countryhook'
import Alerthook from './Alerthook'
import { useNavigate } from 'react-router-dom';
import '../user/Register.css'


function Register() {
    const navigate = useNavigate();

    // Input fields
    const firstName = Inputuser('');
    const lastName = Inputuser('');
    const email = Inputuser('');
    const dob = Inputuser('');
    const country = Inputuser(''); // ✅ Fixed: initialize with empty string
    const username = Inputuser(''); // ✅ Use "username" instead of "userName"
    const password = Inputuser('');
    const repassword = Inputuser('');
    const alerto = Alerthook(2);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.user !== repassword.user) {
            return alerto.setAlerto(2); // ✅ Only alerts if passwords don't match
        }

      const formBody = {
  firstname: firstName.user,
  lastname: lastName.user,
  username: username.user,
  email: email.user,
  dob: dob.user,
  country: country.user || 'india', //default for now since i have no interest to makethis public across world!!
  password: password.user
}

        console.log('Submitting:', formBody);

        try {
            const response = await fetch("http://localhost:4500/api/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formBody)
            });

            const jdata = await response.json();
            console.log('Response:', jdata);

            if (!response.ok) {
                alert('Registration failed: ' + jdata.message);
                return;
            }

            navigate('/home'); // ✅ Navigate after success
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Network error. Please try again.');
        }
    };

   return (
  <div className="register-container">
     <h2>Register</h2>
    <form onSubmit={handleSubmit} className="register-form">
       
      <input placeholder="Enter Your First Name" type="text" {...firstName.bind} />
      <input placeholder="Enter Your Last Name" type="text" {...lastName.bind} />
      <input placeholder="Enter Your Email" type="email" {...email.bind} />
      <input placeholder="Select Your Date Of Birth" type="date" {...dob.bind} />
      {/* <input placeholder="Select Your Country" type="text" {...country.bind} />
      <Countryhook setCountry={country.setUser} /> */}
      <input placeholder="Enter Your Username" type="text" {...username.bind} />
      <input placeholder="Enter Your Password" type="password" {...password.bind} />
      <input placeholder="ReEnter Your Password" type="password" {...repassword.bind} />
      <button type="submit">Submit</button>
    </form>
  </div>
);

}

export default Register;
