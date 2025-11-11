// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = ({ setUser }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     useremail: "",
//     userpass: "",
//     userbirthdate: "",
//     userprofile: null,
//   });
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, userprofile: URL.createObjectURL(file) }));
//       const reader = new FileReader();
//       reader.onload = () => setPreviewUrl(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if user already exists
//     const userExists = users.some((u) => u.useremail === formData.useremail);
//     if (userExists) {
//       alert("User already registered! Please sign in.");
//       navigate("/signin");
//       return;
//     }

//     // Add new user
//     users.push(formData);
//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.setItem("user", JSON.stringify(formData)); // log in new user
//     setUser(formData);
//     alert("Registration successful!");
//     navigate("/"); // dashboard
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col items-center">
//             {previewUrl ? (
//               <img
//                 src={previewUrl}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover mb-2"
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
//                 <span className="text-gray-500">+</span>
//               </div>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="hidden"
//               id="userprofile"
//             />
//             <label htmlFor="userprofile" className="cursor-pointer text-indigo-600 hover:underline">
//               Upload Photo
//             </label>
//           </div>

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             required
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="email"
//             name="useremail"
//             placeholder="Email"
//             required
//             value={formData.useremail}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="password"
//             name="userpass"
//             placeholder="Password"
//             required
//             value={formData.userpass}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//           />
//           <input
//             type="date"
//             name="userbirthdate"
//             required
//             value={formData.userbirthdate}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//           />

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Register
//           </button>

//           <p className="text-center text-sm">
//             Already have an account?{" "}
//             <span
//               className="text-indigo-600 cursor-pointer hover:underline"
//               onClick={() => navigate("/signin")}
//             >
//               Sign in
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpass: "",
    userbirthdate: "",
    userprofile: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.useremail)) {
      newErrors.useremail = "Please enter a valid email address";
    }
    
    if (formData.userpass.length < 6) {
      newErrors.userpass = "Password must be at least 6 characters long";
    }
    
    const birthDate = new Date(formData.userbirthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (!formData.userbirthdate || age < 13) {
      newErrors.userbirthdate = "You must be at least 13 years old";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, userprofile: "Please select an image file" }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors((prev) => ({ ...prev, userprofile: "Image size must be less than 5MB" }));
        return;
      }
      
      setFormData((prev) => ({ ...prev, userprofile: URL.createObjectURL(file) }));
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      
      // Clear file error
      if (errors.userprofile) {
        setErrors((prev) => ({ ...prev, userprofile: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      const userExists = users.some((u) => u.useremail === formData.useremail);
      if (userExists) {
        alert("User already registered! Please sign in.");
        navigate("/signin");
        return;
      }

      // Add new user
      const userData = { ...formData, id: Date.now() };
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      // Show success message
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Join Our Community</h2>
          <p className="text-indigo-100">Create your account to get started</p>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">👤</span>
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="userprofile"
                  className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors duration-200"
                  title="Upload profile picture"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="userprofile"
                />
              </div>
              {errors.userprofile && (
                <p className="text-red-500 text-sm mt-2">{errors.userprofile}</p>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="useremail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="useremail"
                  name="useremail"
                  placeholder="Enter your email"
                  required
                  value={formData.useremail}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.useremail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.useremail && (
                  <p className="text-red-500 text-sm mt-1">{errors.useremail}</p>
                )}
              </div>

              <div>
                <label htmlFor="userpass" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="userpass"
                  name="userpass"
                  placeholder="Create a password"
                  required
                  value={formData.userpass}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.userpass ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.userpass && (
                  <p className="text-red-500 text-sm mt-1">{errors.userpass}</p>
                )}
              </div>

              <div>
                <label htmlFor="userbirthdate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="userbirthdate"
                  name="userbirthdate"
                  required
                  value={formData.userbirthdate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.userbirthdate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.userbirthdate && (
                  <p className="text-red-500 text-sm mt-1">{errors.userbirthdate}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors duration-200"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;