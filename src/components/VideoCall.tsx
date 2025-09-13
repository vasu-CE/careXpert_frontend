import React, { useEffect, useMemo, useRef, useState } from "react";   
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

function ParticipantView() {
  return null
}

function MeetingView() {
const [joined, setJoined] = useState(null);
//Get the method which will be used to join the meeting.
//We will also get the participants list to display all participants
const { join, participants } = useMeeting({
  //callback for when meeting is joined successfully
  onMeetingJoined: () => {
    setJoined("JOINED");
  }
});
const joinMeeting = () => {
  setJoined("JOINING");
  join();
};

return (
  <div className="container">
    {joined && joined == "JOINED" ? (
      <div>
        {[...participants.keys()].map((participantId) => (
          <ParticipantView
            participantId={participantId}
            key={participantId}
          />
        ))}
      </div>
    ) : joined && joined == "JOINING" ? (
      <p>Joining the meeting...</p>
    ) : (
      <button onClick={joinMeeting}>Join the meeting</button>
    )}
  </div>
);
}
const VideoCall = () => {
 return (
  <MeetingProvider
  config={{
    meetingId: "66vu-6ag4-bguw",
    micEnabled: true,
    webcamEnabled: true,
    name: "Vasu's Org",
    debugMode : false
  }}
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhMTRmYjJkYy0xODcyLTQzMWItYTVlNy1kMTA0NThjNDJiMWIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc1MTc5ODcwNSwiZXhwIjoxNzUxODg1MTA1fQ.M-d2a7TBP2v_WpxNMf4m_uXEYwr9n7Bh3JyIW8mEIbk"
>
  <MeetingView />
</MeetingProvider>
 )
};
export default VideoCall;