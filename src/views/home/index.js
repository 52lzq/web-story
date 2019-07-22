import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {
  Body,
  Header
} from '../../components'

const Home = () => {
  return (
    <div>
      <div style={{marginBottom: '30px'}}>
        {/* <Header /> */}
      </div>
      
      <Body/>
    </div>
  );
}

export default Home