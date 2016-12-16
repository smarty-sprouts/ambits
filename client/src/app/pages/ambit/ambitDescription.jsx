import React                  from 'react';
import {Component}            from 'react';

import FlatButton       from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader}  from 'material-ui/Card';

import * as Utils       from '../../utils/utils.js';

const notCheckedStyle = {
  color: 'white', //TODO: not working colors...
  rippleColor: 'green',
  backgroundColor:'green'
};

const checkedStyle = {
  color: 'white',
  backgroundColor:'blue'
};

class AmbitDescription extends Component {
  constructor(props) {
    super(props);
  }

  // When the component mounts, do something....
  componentDidMount() {
  }

  render() {
    // convert data into more sensible format
    const date = Utils.convertDate(new Date(this.props.ambit.startDate));
    const time = Utils.convertTime(new Date(this.props.ambit.startDate));

    // styling for CardStyle
    const cardStyle = {
      margin: '0px',
      marginTop: 20
    };

    const linkStyle = {
      color:'white',
      textDecoration:'none',
      fontSize: '11px',
    };

    return(
      <div>
        <Card style={cardStyle}>
          <CardHeader
            title = {'Activity: ' + this.props.ambit.name}
            avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
            subtitle = { date + ' ' + time }
          />
          <CardActions>
            <FlatButton
              label= {
                <span style={linkStyle}>
                  {this.props.ambit.checkedIn ? "Checked In":"Check In!"}
                </span>
              }
              onTouchTap={() => {
                this.props.handleCheckinAmbit(this.props.ambit);
                }
              }
              disabled = {this.props.ambit.checkedIn}
              style={this.props.ambit.checkedIn ? checkedStyle : notCheckedStyle}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default AmbitDescription;
