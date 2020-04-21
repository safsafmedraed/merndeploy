import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const classes = useStyles();

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="enter a username" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <h4 className="heading">Rooms</h4><FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">available Rooms</InputLabel>
            <Select defaultValue="" id="grouped-select" onChange={(event) => setRoom(event.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader>IT lobbies</ListSubheader>
              <MenuItem value="React Lobby">React Lobby</MenuItem>
              <MenuItem value="Node Lobby">Node Lobby</MenuItem>
              <ListSubheader>Mecanics Lobbies</ListSubheader>
              <MenuItem value="AutoCad Lobby">AutoCad Lobby</MenuItem>
              <MenuItem value="Tia PorTal Lobby">Tia PorTal Lobby</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
