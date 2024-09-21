import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dateofbirth, setDateofbirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [license, setLicense] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setAddress(userInfo.address);
    setGender(userInfo.gender);
    setCity(userInfo.city);
    setState(userInfo.state);
    setZipCode(userInfo.zipcode);
    setDateofbirth(userInfo.dateofbirth);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          gender,
          dateofbirth,
          phone,
          address,
          city,
          state,
          zipcode,
          experience,
          specialization,
          bio,
          headline,
          image,
          license,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-4xl bg-blue-50 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-gray-800 text-center mb-5">
          Update {userInfo.type === "patient" ? "Patient" : "Doctor"} Profile
        </h1>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateofbirth}
              onChange={(e) => setDateofbirth(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter home/office address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Gender
            </label>
            <div>
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "male"}
                className="mr-2"
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "female"}
                className="ml-4 mr-2"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          {userInfo.type === "doctor" && (
            <>
              <div className="my-2">
                <label className="block mb-2 text-gray-600 font-medium">
                  Medical License No.
                </label>
                <input
                  type="text"
                  placeholder="e.g. #1234567890"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
                />
              </div>

              <div className="my-2">
                <label className="block mb-2 text-gray-600 font-medium">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dentist"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
                />
              </div>

              <div className="my-2">
                <label className="block mb-2 text-gray-600 font-medium">
                  Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
                />
              </div>

              <div className="my-2">
                <label className="block mb-2 text-gray-600 font-medium">
                  Headline
                </label>
                <input
                  type="text"
                  placeholder="Enter profile headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
                />
              </div>

              <div className="my-2">
                <label className="block mb-2 text-gray-600 font-medium">
                  Bio
                </label>
                <input
                  type="text"
                  placeholder="Enter your bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
                />
              </div>
            </>
          )}

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-gray-600 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200"
            />
          </div>

          <div className="col-span-full mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              {isLoading ? <Loader /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
