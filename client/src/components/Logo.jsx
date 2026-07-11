import React from "react";
import { Link } from "react-router";

export const Logo = ({userType}) => {
    return (
        <>
            {userType === "/citizen" ? 
                (
                    <Link to="/citizen">
                        <img src="/Logo.png"></img>
                    </Link>
                ) : (
                    <Link to="/settings">
                        <img src="/Logo.png"></img>
                    </Link>
                )
            }
        </>
    );
}