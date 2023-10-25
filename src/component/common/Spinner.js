import React from "react";
import { useSelector } from "react-redux";
export default function Spinner() {
  const loading = useSelector((state) => state.global)?.loading;
  return (
    <div
      className="overlay"
      id="preloader"
      style={{ display: loading ? "flex" : "none" }}
    >
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
