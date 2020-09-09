import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './SelectSource.css';
const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function EachDatabase(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} id='accordian-databases'>
      {props.databases.length === 0 && (
        <h6>Please login to your MySQL database..</h6>
      )}
      {props.databases.map((database, index) => {
        return (
          <div className='' key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography className={classes.heading}>
                  <strong> {database[0]} </strong>
                </Typography>
              </AccordionSummary>
              {database.map((table, index) => {
                return (
                  index + 1 !== database.length && (
                    <AccordionDetails key={index} className='db-table-name'>
                      {index + 1 !== database.length && (
                        <Typography>
                          {index + 1}. {database[index + 1]}
                        </Typography>
                      )}
                    </AccordionDetails>
                  )
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default EachDatabase;
