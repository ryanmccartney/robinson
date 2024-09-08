import * as React from "react";
import Avatar from "@mui/material/Avatar";
import sha256 from "crypto-js/sha256";

import getInitials from "../utils/getInitials";

const UserAvatar = ({ user, sx }) => {
    if (user) {
        const hash = sha256(user?.email);
        return (
            <Avatar
                src={`https://gravatar.com/avatar/${hash}?s=200&d=404`}
                sx={{
                    ...{
                        background: "secondary", opacity: 1, fontSize: "1em"
                    }, ...sx
                }}
            >
                {getInitials(`${user?.firstName} ${user?.lastName} `)}
            </Avatar>
        );
    }
    else {
        return <Avatar />
    }

}

export default UserAvatar;
