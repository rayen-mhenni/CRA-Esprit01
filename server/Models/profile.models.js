import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    
    address: {
        type: String
    },
    city: {
        type: String
    },
    email: {
        type: String
    },
    universty: {
        type: String
    },
    country: {
        type: String
    },
    postalcode: {
        type: String
    },
    about: {
        type: String
    }
  
}
);

const Profile = mongoose.model("prof", profileSchema);

export default Profile;