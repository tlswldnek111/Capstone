import React, { Component } from "react";
import Slider from "react-slick";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '50vh',
  },
  content: {
    height: '50vh',
  },
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
            VOD: [],
            INFO: [],
        };
    this.Card_Click = this.Card_Click.bind(this);
  }
  show_vod(i) {
    var url = `http://localhost:3001/vod/thumbnail?idx=${this.state.VOD[i].IDX}`
    return(
    <div style={{float:"left"}}>
        <Card
        id={"card" + i}
        style={{width: "185px", height: "280px", marginTop: 25, backgroundColor: "#E8E8E8"}}
        variant="outlined"
        onClick={()=>{
            this.Card_Click(i);
        }}>
          <CardContent>
              <img src={url} style={{width: "100%", height: "100%"}}></img>
              <p>{this.state.VOD[i].TITLE}</p>
          </CardContent>
        </Card>
    </div>);
  }

  Card_Click(i) {
    this.props.history.push('vod_detail?idx=' +
    this.state.VOD[i].IDX);
  }

  componentDidMount() {
    const VOD = [];
    fetch('http://localhost:3001/vod/select', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
    })
    .then(res=>res.json())
    .then(res=>{ if(res.length != 0) {
                    for (let i = 0; i < res.length; i++) {
                        VOD.push({
                            IDX: res[i].IDX,
                            TITLE: res[i].TITLE,
                            CATEGORY: res[i].CATEGORY,
                            CONTENT: res[i].CONTENT,
                            IMAGEPATH: res[i].IMAGE_PATH
                        })
                    }
                }
    })
    .then(()=>{
        this.setState({VOD: VOD});
    })
    .then(()=>{
        const INFO = [];
        for (let i = 0; i < this.state.VOD.length; i++) {
            INFO.push(this.show_vod(i));
        }
        this.setState({INFO: INFO});
    })
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <center>
          <Card style={{ background: "white"}}  variant="outlined">
            <CardContent >
              <Slider style={{width: "600px"}} {...settings}>
                {this.state.INFO.map((unit) => {
                  return unit;
                })}
              </Slider>
            </CardContent>
          </Card>
        </center>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Carousel);