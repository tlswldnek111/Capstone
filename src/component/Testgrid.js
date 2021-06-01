import React, { Component } from "react";
import Slider from "react-slick";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'

export default class Testgrid extends Component {
  render() {
    const styles = {
      text: {
        textAlign:"center"
      }
    }
    const settings = {
      dots: true,
    };
    return (
      <div>
        <center>
          <Card style={{width:"500px", background: "#419be0"}} variant="outlined">
            <CardContent>
              <Slider style={{width: "400px"}} {...settings}>
                <div>
                  <h3 style={styles.text}>1</h3>
                </div>
                <div>
                  <h3 style={styles.text}>2</h3>
                </div>
                <div>
                  <h3 style={styles.text}>3</h3>
                </div>
                <div>
                  <h3 style={styles.text}>4</h3>
                </div>
                <div>
                  <h3 style={styles.text}>5</h3>
                </div>
                <div>
                  <h3 style={styles.text}>6</h3>
                </div>
              </Slider>
            </CardContent>
          </Card>
        </center>
      </div>
    );
  }
}