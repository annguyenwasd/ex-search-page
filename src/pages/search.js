import React, { useCallback, useState } from "react";
import styled from "styled-components/macro";
import Autocomplete from "components/autocomplete";
import cities from "../data/cities";
import { isEmpty } from "lodash";
import translate from "../utils/nonVietnamese";

const transformedCities = cities.map(c => ({
  label: c,
  value: translate(c)
}));

function Search() {
  const [result, setResults] = useState(null);
  const [selected, setSelected] = useState(null);

  const fakeFetch = useCallback(searchString => {
    setTimeout(() => {
      if (isEmpty(searchString)) {
        setResults(null);
        return;
      }

      setResults(
        transformedCities.filter(
          c => c.value.includes(searchString) || c.label.includes(searchString)
        )
      );
    }, 200);
  }, []);
  return (
    <Wrapper>
      <Autocomplete
        onChange={fakeFetch}
        options={result}
        selected={selected}
        onSelect={option => setSelected(option)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20% 20px 0;
`;

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
