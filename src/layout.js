import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import logo from "assets/airbnb-logo.svg";
import background from "assets/background.jpg";
import { Menu, X } from "react-feather";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <BackgroundedContainer>
      <Container>
        <Nav>
          <Link to="/">
            <img src={logo} alt="air bnb logo" />
          </Link>
          <NavControl>
            <Menu />
          </NavControl>
          <Navs>
            <li>dark/light</li>
            <li>
              <Link to="/host">Become a host</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/sing-up">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </Navs>
        </Nav>
        {children}
      </Container>
    </BackgroundedContainer>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 29px 0;
  color: white;
`;

const NavControl = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Navs = styled.ul`
  list-style-type: none;
  display: flex;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  @media screen and (max-width: 769px) {
    display: none;
  }

  color: #ffffff;

  li {
    margin: 0 36px;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const BackgroundedContainer = styled.div`
  background: url(${background}) top left no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
