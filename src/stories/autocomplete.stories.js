import React from "react";
import Autocomplete from "../components/autocomplete";

export default {
  title: "Autocomplete",
  component: Autocomplete
};

const options = [
  { id: 1, label: "Ho chi minh", value: "hcm" },
  { id: 2, label: "Ha noi", value: "hanoi" },
  { id: 0, label: "Hoi an", value: "hoian" }
];

export const emptyOption = () => <Autocomplete />;

export const withOption = () => <Autocomplete options={options} />;
