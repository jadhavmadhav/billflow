import React from "react";
import no_data from "../assets/no_data.avif";

export default function NoData() {
  return (
    <div className="flex justify-center items-center">
      <img src={no_data} />
    </div>
  );
}
