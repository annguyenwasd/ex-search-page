import React, { useRef, useState } from "react";
import styled from "styled-components/macro";
import { ThemeProvider, css } from "styled-components";
import { Search } from "react-feather";
import { isEmpty, debounce } from "lodash";
import useClickOutside from "utils/useClickOutside";

function Autocomplete({ options, selected, onChange, onSelect, ...rest }) {
  const [isFocusing, setFocusing] = useState(false);
  const input = useRef(null);
  const wrapper = useRef(null);

  const debounced = debounce(val => onChange(val), 500);

  useClickOutside(wrapper, () => {
    setFocusing(false);
  });

  return (
    <ThemeProvider
      theme={{
        isFocusing
      }}
    >
      <Wrapper ref={wrapper}>
        <InputWrapper>
          <Search />
          <Input
            ref={input}
            onChange={e => {
              const { value } = e.target;
              debounced(value);
            }}
            {...rest}
            onFocus={() => setFocusing(true)}
          />
        </InputWrapper>
        {isFocusing && !isEmpty(options) ? (
          <ResultWrapper>
            {options.map(o => (
              <Result
                key={o.value}
                selected={o === selected}
                onClick={() => {
                  onSelect(o);
                  input.current.value = o.label;
                  setFocusing(false);
                }}
              >
                {o.label}
              </Result>
            ))}
          </ResultWrapper>
        ) : null}
      </Wrapper>
    </ThemeProvider>
  );
}

const ResultWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-height: 180px;
  background-color: white;
  border: 1px solid #ebebeb;
  border-top: none;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 4px 4px;
  overflow-y: auto;
  padding: 10px 0;
`;

const Result = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  color: #484848;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 21px;

  &:hover {
    background-color: #f8f8f8;
  }

  ${p =>
    p.selected &&
    css`
      background-color: #dad9d9;
    `};
`;

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  display: inline-block;
  position: relative;
  cursor: default;
`;

const InputWrapper = styled.div`
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  height: 60px;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 15px;
  align-content: center;
  padding: 17px 21px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: white;

  input {
    background-color: inherit;
  }

  ${p =>
    p.theme.isFocusing &&
    css`
      border-radius: 4px 4px 0 0;
      background-color: #f8f8f8;
      border: 1px solid #e3dfdf;
    `};
`;

const Input = styled.input`
  border: 0;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: ${20 / 16}rem;
  line-height: 23px;
  color: #484848;

  &::placeholder {
    color: rgba(72, 72, 72, 0.7);
  }

  &:focus {
    outline: 0;
  }
`;

Autocomplete.propTypes = {};

Autocomplete.defaultProps = {
  placeholder: "Try Vietnam"
};

export default Autocomplete;
