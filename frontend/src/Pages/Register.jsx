// import { useState } from 'react';
// import { Upload, X } from 'lucide-react';

// export default function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     useremail: '',
//     userpass: '',
//     userbirthdate: '',
//     userprofile: null
//   });
  
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         userprofile: file
//       });
      
//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setFormData({
//       ...formData,
//       userprofile: null
//     });
//     setPreviewUrl(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Create FormData object for file upload
//     const submitData = new FormData();
//     submitData.append('username', formData.username);
//     submitData.append('useremail', formData.useremail);
//     submitData.append('userpass', formData.userpass);
//     submitData.append('userbirthdate', formData.userbirthdate);
//     if (formData.userprofile) {
//       submitData.append('userprofile', formData.userprofile);
//     }
    
//     console.log('Form submitted:', formData);
//     alert('Registration submitted! Check console for data.');
    
//     // Here you would typically send the FormData to your backend
//     // fetch('/api/register', {
//     //   method: 'POST',
//     //   body: submitData
//     // })
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
//           <p className="text-gray-600">Join us today</p>
//         </div>

//         <form onSubmit={handleSubmit} method='post' encType='multipart/form-data' className="space-y-5">
//           {/* Profile Picture Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Profile Picture
//             </label>
//             <div className="flex flex-col items-center">
//               {previewUrl ? (
//                 <div className="relative">
//                   <img
//                     src={previewUrl}
//                     alt="Profile preview"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
//                   />
//                   <button
//                     onClick={removeImage}
//                     type="button"
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-indigo-500 transition">
//                   <Upload className="text-gray-400" size={32} />
//                   <span className="text-xs text-gray-500 mt-2">Upload</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="useremail" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="useremail"
//               name="useremail"
//               value={formData.useremail}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="your@email.com"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="userpass" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="userpass"
//               name="userpass"
//               value={formData.userpass}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="userbirthdate" className="block text-sm font-medium text-gray-700 mb-2">
//               Birth Date
//             </label>
//             <input
//               type="date"
//               id="userbirthdate"
//               name="userbirthdate"
//               value={formData.userbirthdate}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{' '}
//           <a href="#" className="text-indigo-600 font-semibold hover:underline">
//             Sign in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Upload, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpass: "",
    userbirthdate: "",
    userprofile: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        userprofile: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove profile image
  const removeImage = () => {
    setFormData({
      ...formData,
      userprofile: null,
    });
    setPreviewUrl(null);
  };

  // ⭐ Submit Registration (LOCAL ONLY)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // ⭐ LOCAL backend URL ONLY
      const res = await fetch("https://infina-coding-platform-1.onrender.com/api/users/register", {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("✅ Registration Successful!", { position: "top-right" });
        console.log("User registered:", data);

        // store user in local storage
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "/signin";
        }, 1500);
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Join us today</p>
        </div>

        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          className="space-y-5"
        >
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex flex-col items-center">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                  />
                  <button
                    onClick={removeImage}
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-indigo-500 transition">
                  <Upload className="text-gray-400" size={32} />
                  <span className="text-xs text-gray-500 mt-2">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="useremail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="useremail"
              name="useremail"
              value={formData.useremail}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="userpass"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="userpass"
              name="userpass"
              value={formData.userpass}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Birthdate */}
          <div>
            <label
              htmlFor="userbirthdate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="userbirthdate"
              name="userbirthdate"
              value={formData.userbirthdate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
