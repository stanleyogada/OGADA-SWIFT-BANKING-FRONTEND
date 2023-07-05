import React from 'react'
import styled from "styled-components";
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Livechat = () => {
  return (
    <>
      <Header />

      <MMain>
        <div className="chat chat-container">
          <p className="chat chat-content">
            Hello Pay intelligenr robot will serve you, are you an agent or a
            user? What can I do for you?
          </p>
        </div>
      </MMain>

      <Footer />
    </>

  );
}

export default Livechat;

const MMain = styled.main`


`;