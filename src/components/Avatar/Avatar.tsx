import profilePic from "@assets/profile-picture.png";
import ImageWrapper from "./AvatarStyle";

const Avatar = () => {
  return (
    <ImageWrapper>
      <img src={profilePic} alt="" />
    </ImageWrapper>
  );
};

export default Avatar;
