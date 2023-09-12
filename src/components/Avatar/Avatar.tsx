import ImageWrapper from "./AvatarStyle";
import { DEFAULT_USER_AVATAR } from "@constants/index";

const Avatar = ({ src, alt }: { src?: string; alt?: string }) => {
  console.log(alt);

  return (
    <ImageWrapper>
      <img src={src || DEFAULT_USER_AVATAR} alt={alt} width={50} height={50} />
    </ImageWrapper>
  );
};

export default Avatar;
