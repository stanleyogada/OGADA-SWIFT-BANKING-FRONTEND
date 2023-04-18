import styled from 'styled-components'
import profilePic from '../../assets/profile-picture.png'


const Avatar = () => {
  return (
    <ImageWrapper>
    <img src={profilePic} alt="" />
    </ImageWrapper>
  )
}

export default Avatar

const ImageWrapper = styled.section`
    img{
  object-fit: cover;
  border-radius: 50%;
}

`