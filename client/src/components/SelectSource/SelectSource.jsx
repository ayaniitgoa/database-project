import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import EachDatabase from './EachDatabase.jsx';
import './SelectSource.css';
import { connect } from 'react-redux';
import { getMySQLDatabases } from '../../reduxSetup/actions/mysqlLoginAction';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f5f1f1e5',
  },
}));

function SelectSource(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='mt-5'>
      <h5 className='text-center'>2. Select Source</h5>
      <div className={classes.root} id='select-source-tab'>
        <AppBar
          style={{ background: '#D3D3D3', zIndex: 1 }}
          position='relative'
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
            centered
          >
            <Tab style={{ color: '#000' }} label='Database' {...a11yProps(0)} />
            <Tab style={{ color: '#000' }} label='CSV' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <EachDatabase databases={props.databases} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  databases: state.mysqlLoginData.databases,
});

export default connect(mapStateToProps, { getMySQLDatabases })(SelectSource);
