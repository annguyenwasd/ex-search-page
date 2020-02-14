import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { css, ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import logo from "assets/airbnb-logo.svg";
import background from "assets/background.jpg";
import { Menu, X } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import useThemeMode from "utils/useThemeMode";
import Switch from "react-switch";
import night from "assets/night.svg";
import sunny from "assets/sunny.svg";

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [theme, toggleTheme, mounted] = useThemeMode();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={{ open, theme }}>
      <BackgroundedContainer>
        <BackDropContainer>
          <Container>
            <Nav>
              <Link to="/">
                <img src={logo} alt="air bnb logo" />
              </Link>
              <NavControl>
                {open ? (
                  <X onClick={() => setOpen(false)} width={30} height={30} />
                ) : (
                  <Menu onClick={() => setOpen(true)} width={30} height={30} />
                )}
              </NavControl>
              <Navs open={open}>
                <li>
                  <Switch
                    checked={theme === 'dark'}
                    offColor="#555555"
                    onColor="#555555"
                    checkedIcon={<Check src={night} />}
                    uncheckedIcon={<Uncheck src={sunny} />}
                    onChange={() => {
                      toggleTheme();
                    }}
                  />
                </li>
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
            <Content>{children}</Content>
          </Container>
        </BackDropContainer>
      </BackgroundedContainer>
    </ThemeProvider>
  );
}

const Check = styled.img`
  margin-top: 5px;
  margin-left: 8px;
`;

const Uncheck = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-left: 4px;
`;

// for dark theme
const BackDropContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${p =>
    p.theme.theme === "dark" ? "rgba(0, 0, 0, 0.85)" : "transparent"};
`;

// hold position for nav
const Content = styled.main`
  ${p =>
    p.theme.open &&
    css`
      padding-top: 60px;
    `};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 29px 0;
  color: white;
  height: 60px;

  @media screen and (max-width: 769px) {
    ${p =>
      p.theme.open &&
      css`
        height: 100vh;
        background-color: ${p.theme.theme === "dark"
          ? "#0E0E0E"
          : "rgba(71, 71, 71, 0.65)"};
        align-items: flex-start;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 2;
      `};
  }
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
    display: ${p => (p.open ? "block" : "none")};
    position: absolute;
    top: 90px;
    padding: 0;
    margin: 0;

    li {
      margin: 0 !important;
      padding: 10px 0;
      font-size: 16px;
    }
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
  position: relative;
`;

const BackgroundedContainer = styled.div`
  background: url(${background}) top left no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {};

export default Layout;
