import React from "react";
import { Link } from "react-router";

export const Logo = () => {
    return (
        <Link to="/settings">
            <img src="/Logo.png"></img>
        </Link>
    );
}