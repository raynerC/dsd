import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function Message({ timestamp, user, message }) {
  if (!timestamp) return null;

  const timestampDateTime = dayjs
    .unix(timestamp.seconds)
    .tz("Asia/Kuala_Lumpur");

  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message_info">
        <h4>
          {user.displayName}
          <span className="message_timestamp">
            { timestampDateTime.isSame(dayjs(), "day")
              ? `Today at ${timestampDateTime.format("h:mm A")}`
              : timestampDateTime.format("DD/MM/YYYY")}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;