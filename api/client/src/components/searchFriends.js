import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Avatar } from '@mui/material';

export default function FriendSelect() {
  const {user} = useContext(AuthContext); 
  const [friends, setFriends] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const getFriends = async () => {
      try {
          const res = await axios.get("/users/friends/"+user._id);
          setFriends(res.data);
      }
      catch (error) {
        console.log(error);
      }
    };
    getFriends();
  },[user._id]);

  useEffect(()=>{
    if(receiver){ 
    const createConversation = async () => {
      const x = {
        senderId : user._id,
        receiverId : receiver?._id
      };
      try {
          const res = await axios.post("/conversations", x);
          window.location.reload();
      }
      catch (error) {
        console.log(error);
      }
    };
    createConversation();}
  },[ receiver?._id]);


  return (
    <Autocomplete
      onChange={(event, newValue) => {
        setReceiver(newValue);
      }}
      id="friend-search"
      sx={{ width: 300, margin: 2 }}
      options={friends}
      autoHighlight
      getOptionLabel={(option) => option.username}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}
         >
          <Avatar src={PF+option.profilePicture} style={{marginRight:10}} />
           {option.username} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search friends"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          variant="standard"
        />
      )}
    />
  );
}
