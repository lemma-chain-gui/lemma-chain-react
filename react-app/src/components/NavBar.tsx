import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BASE_URL } from '../helpers/Globals';
import { FiSearch } from 'react-icons/fi';

const InputAlert = withReactContent(Swal);
const alertIt = async () => {
  const { value: terms } = await InputAlert.fire({
    title: 'Search',
    input: 'text',
    inputPlaceholder: 'Enter search terms',
    showCancelButton: true,
    inputValidator: (value): any => {
      if (!value) {
        return 'Search terms must not be empty!';
      }
    }
  });

  if (terms) {
    window.open(`${BASE_URL}/search/${encodeURI(terms)}`, '_blank');
  }
};

const NavBar = (props: { refs: { ref: string; title: string }[] }) => {
  return (
    <Nav>
      <NavLink to="/" exact={true}>
        <span className="menu">CR</span> Create Ref
      </NavLink>
      <NavLink to="/create-account">
        <span className="menu">CA</span> Create Account
      </NavLink>
      <NavLink to="/refs">
        <span className="menu">YR</span> Your Refs{' '}
        <Badge pill={true} color="success">
          {props.refs.length}
        </Badge>
      </NavLink>
      <NavLink to="/account-ref">
        <span className="menu">AR</span> Account Refs
      </NavLink>
      <FiSearch onClick={alertIt} id="search" />
      <UncontrolledTooltip placement="bottom" target="search">
        Search
      </UncontrolledTooltip>
    </Nav>
  );
};
const Nav = styled.nav`
  background: #3e4061;
  display: flex;
  flex-direction: column;
  position: relative;

  svg {
    overflow: hidden;
    vertical-align: middle;
    position: absolute;
    bottom: 5%;
    right: 5%;
    stroke: white;
    stroke-width: 3.2px;
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      stroke: #32cc32;
    }
  }

  a {
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #80808059;
    min-width: 250px;
    font-weight: 600;
    color: #cccccc;
    cursor: pointer;
    display: flex;
    align-items: center;
    @media (max-width: 500px) {
      padding: 0.8rem 1rem;
    }
    &.active {
      color: white;
    }
    &:hover {
      text-decoration: none;
      color: white;
    }
    span.menu {
      border-radius: 50%;
      background-color: #cccccc;
      color: #3e4061;
      font-size: 1.2rem;
      height: calc(3vw + 1.5rem);
      width: calc(3vw + 1.5rem);
      display: flex;
      font-weight: 400;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;
      box-shadow: 1px 1px 15px #00000036;
      @media (max-width: 500px) {
        font-size: 1rem;
      }
    }
    &.active span {
      background-color: #33cc33;
      color: white;
    }
  }
`;

export default NavBar;
