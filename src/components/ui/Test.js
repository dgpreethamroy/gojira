import React, { useEffect } from "react";
import Dropdown from "./dropdown/Dropdown";

export const Test = () => {
  const data = [
    { id: 1, option: "Wade Cooper" },
    { id: 2, option: "Arlene Mccoy" },
    { id: 3, option: "Devon Webb" },
    { id: 4, option: "Tom Cook" },
    { id: 5, option: "Tanya Fox" },
    { id: 6, option: "Hellen Schmidt" },
  ];
  const [selected, setSelected] = React.useState(data[0]);
  return <Dropdown selected={selected} setSelected={setSelected} data={data} />;
};
