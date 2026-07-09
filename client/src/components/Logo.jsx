import React from "react";
import { Link } from "react-router";

export const Logo = ({userType}) => {
    return (
        <Link to={`${userType}/settings`}>
            <img src="/Logo.png"></img>
        </Link>
    );
}