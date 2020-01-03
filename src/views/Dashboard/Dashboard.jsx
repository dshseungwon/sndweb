import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  communicationChart,
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { withFirebase } from "../../components/Firebase";


class Dashboard extends React.Component {
  state = {
    uid: "",
    name: "",
    email: "",
    password: "",
    loading: false,
  };

  _myScoredSheets = [];

  S_mean = 0;
  C_mean = 0;
  Q_mean = 0;
  A_mean = 0;

  numFirst = 0;
  numSecond = 0;
  numThird = 0;
  numFourth = 0;
  numFifth = 0;
  numSixth = 0;


  sumFirst_S = 0;
  sumSecond_S = 0;
  sumThird_S = 0;
  sumFourth_S = 0;
  sumFifth_S = 0;
  sumSixth_S = 0;

  sumFirst_C = 0;
  sumSecond_C = 0;
  sumThird_C = 0;
  sumFourth_C = 0;
  sumFifth_C = 0;
  sumSixth_C = 0;

  sumFirst_Q = 0;
  sumSecond_Q = 0;
  sumThird_Q = 0;
  sumFourth_Q = 0;
  sumFifth_Q = 0;
  sumSixth_Q = 0;

  sumFirst_A = 0;
  sumSecond_A = 0;
  sumThird_A = 0;
  sumFourth_A = 0;
  sumFifth_A = 0;
  sumSixth_A = 0;

  commentTable = [];

  S_chartdata = {
    labels: ["1차", "2차", "3차", "4차", "5차", "6차"],
    series: [[0,0,0,0,0]],
  };
  C_chartdata = {
    labels: ["1차", "2차", "3차", "4차", "5차", "6차"],
    series: [[0,0,0,0,0]],
  };
  Q_chartdata = {
    labels: ["1차", "2차", "3차", "4차", "5차", "6차"],
    series: [[0,0,0,0,0]],
  };
  A_chartdata = {
    labels: ["1차", "2차", "3차", "4차", "5차", "6차"],
    series: [[0,0,0,0,0]],
  };

  componentDidMount() {
    this._myScoredSheets = [];
    this.listner = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if(authUser) {
          this.props.firebase.getUserInfo(authUser)
            .then((userDoc) => {
              this.setState({
                uid: authUser.uid,
                name: userDoc.name,
                email: userDoc.email,
                password: userDoc.password,
              });

              let myScoredDocsRef = this.props.firebase.db.collection('my_scored').doc(userDoc.name).collection("scoring");
              myScoredDocsRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.setState({loading: true});
                  this._myScoredSheets.push(doc.data());
                  this.setState({loading: false});
                })
              })
            })
            .catch(() => {
              this.setState({
                uid: "",
                name: "",
                email: "",
                password: "",
              });
              console.log('Something went wrong!');
            })
        } else {
          this.setState({ authUser: null });
          this.setState({
            uid: "",
            name: "",
            email: "",
            password: "",
          });
        }
      }
    )
  }



  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;

    if (this.state.name === "") {
      return <h1>대쉬보드 확인을 위해 로그인 해주세요 :)</h1>;
    } else {
      this.S_mean = 0;
      this.C_mean = 0;
      this.Q_mean = 0;
      this.A_mean = 0;

      this.numFirst = 0;
      this.numSecond = 0;
      this.numThird = 0;
      this.numFourth = 0;
      this.numFifth = 0;
      this.numSixth = 0;
    
      this.sumFirst_S = 0;
      this.sumSecond_S = 0;
      this.sumThird_S = 0;
      this.sumFourth_S = 0;
      this.sumFifth_S = 0;
      this.sumSixth_S = 0;

      this.sumFirst_C = 0;
      this.sumSecond_C = 0;
      this.sumThird_C = 0;
      this.sumFourth_C = 0;
      this.sumFifth_C = 0;
      this.sumSixth_C = 0;

      this.sumFirst_Q = 0;
      this.sumSecond_Q = 0;
      this.sumThird_Q = 0;
      this.sumFourth_Q = 0;
      this.sumFifth_Q = 0;
      this.sumSixth_Q = 0;

      this.sumFirst_A = 0;
      this.sumSecond_A = 0;
      this.sumThird_A = 0;
      this.sumFourth_A = 0;
      this.sumFifth_A = 0;
      this.sumSixth_A = 0;

      this.commentTable = [];
      
      this._myScoredSheets.map((obj, index) => {
        this.S_mean += obj.SM;
        this.C_mean += obj.CM;
        this.Q_mean += obj.QM;
        this.A_mean += obj.AM;

        this.commentTable.push([(index+1).toString(), obj.Session + '차', "문제 진단", obj.SS]);
        this.commentTable.push([(index+1).toString(), obj.Session + '차', "전략 도출", obj.CC]);
        this.commentTable.push([(index+1).toString(), obj.Session + '차', "Overview", obj.QQ]);
        this.commentTable.push([(index+1).toString(), obj.Session + '차', "Communication", obj.AA]);
        this.commentTable.push([(index+1).toString(), obj.Session + '차', "기타", obj.EE]);

        if(parseInt(obj.Session) == 1) {
          this.numFirst += 1;

          this.sumFirst_S += obj.SM;
          this.sumFirst_C += obj.CM;
          this.sumFirst_Q += obj.QM;
          this.sumFirst_A += obj.AM;
        } else if(parseInt(obj.Session) == 2) {
          this.numSecond += 1;

          this.sumSecond_S += obj.SM;
          this.sumSecond_C += obj.CM;
          this.sumSecond_Q += obj.QM;
          this.sumSecond_A += obj.AM;
        } else if (parseInt(obj.Session) == 3) {
          this.numThird += 1;

          this.sumThird_S += obj.SM;
          this.sumThird_C += obj.CM;
          this.sumThird_Q += obj.QM;
          this.sumThird_A += obj.AM;
        } else if (parseInt(obj.Session) == 4) {
          this.numFourth += 1;

          this.sumFourth_S += obj.SM;
          this.sumFourth_C += obj.CM;
          this.sumFourth_Q += obj.QM;
          this.sumFourth_A += obj.AM;
        } else if (parseInt(obj.Session) == 5) {
          this.numFifth += 1;

          this.sumFifth_S += obj.SM;
          this.sumFifth_C += obj.CM;
          this.sumFifth_Q += obj.QM;
          this.sumFifth_A += obj.AM;
        } else if (parseInt(obj.Session) == 6) {
          this.numSixth += 1;

          this.sumSixth_S += obj.SM;
          this.sumSixth_C += obj.CM;
          this.sumSixth_Q += obj.QM;
          this.sumSixth_A += obj.AM;
        }
      });

      if (this._myScoredSheets.length != 0) {
        this.S_mean /= this._myScoredSheets.length;
        this.C_mean /= this._myScoredSheets.length;
        this.Q_mean /= this._myScoredSheets.length;
        this.A_mean /= this._myScoredSheets.length;
      }

      if (this.numFirst != 0) {
        this.sumFirst_S/= this.numFirst;
        this.sumFirst_C/= this.numFirst;
        this.sumFirst_Q/= this.numFirst;
        this.sumFirst_A/= this.numFirst;
      }

      if (this.numSecond != 0) {
        this.sumSecond_S/= this.numSecond;
        this.sumSecond_C/= this.numSecond;
        this.sumSecond_Q/= this.numSecond;
        this.sumSecond_A/= this.numSecond;
      }

      if (this.numThird != 0) {
        this.sumThird_S/= this.numThird;
        this.sumThird_C/= this.numThird;
        this.sumThird_Q/= this.numThird;
        this.sumThird_A/= this.numThird;
      }

      if (this.numFourth != 0) {
        this.sumFourth_S/= this.numFourth;
        this.sumFourth_C/= this.numFourth;
        this.sumFourth_Q/= this.numFourth;
        this.sumFourth_A/= this.numFourth;
      }

      if (this.numFifth != 0) {
        this.sumFifth_S/= this.numFifth;
        this.sumFifth_C/= this.numFifth;
        this.sumFifth_Q/= this.numFifth;
        this.sumFifth_A/= this.numFifth;
      }

      if (this.numSixth != 0) {
        this.sumSixth_S/= this.numSixth;
        this.sumSixth_C/= this.numSixth;
        this.sumSixth_Q/= this.numSixth;
        this.sumSixth_A/= this.numSixth;
      }


      this.S_chartdata.series = [[this.sumFirst_S,this.sumSecond_S,this.sumThird_S,this.sumFourth_S,this.sumFifth_S,this.sumSixth_S]];
      this.C_chartdata.series = [[this.sumFirst_C,this.sumSecond_C,this.sumThird_C,this.sumFourth_C,this.sumFifth_C,this.sumSixth_C]];
      this.Q_chartdata.series = [[this.sumFirst_Q,this.sumSecond_Q,this.sumThird_Q,this.sumFourth_Q,this.sumFifth_Q,this.sumSixth_Q]];
      this.A_chartdata.series = [[this.sumFirst_A,this.sumSecond_A,this.sumThird_A,this.sumFourth_A,this.sumFifth_A,this.sumSixth_A]];

      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>문제 진단</p>
                  <h3 className={classes.cardTitle}>
                    {this.S_mean.toFixed(2)} <small>점</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {/* <Danger>
                      <Warning />
                    </Danger>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Get more space
                    </a> */}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>전략 도출</p>
                  <h3 className={classes.cardTitle}>
                  {this.C_mean.toFixed(2)} <small>점</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {/* <DateRange />
                    Last 24 Hours */}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Icon>info_outline</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Overview</p>
                  <h3 className={classes.cardTitle}>
                  {this.Q_mean.toFixed(2)} <small>점</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {/* <LocalOffer />
                    Tracked from Github */}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Communication</p>
                  <h3 className={classes.cardTitle}>
                  {this.A_mean.toFixed(2)} <small>점</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {/* <Update />
                    Just Updated */}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    data={this.S_chartdata}
                    type="Line"
                    options={dailySalesChart.options}
                    listener={dailySalesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>문제 진단</h4>
                  <p className={classes.cardCategory}>
                    {/* <span className={classes.successText}>
                      <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                    </span>{" "} */}
                    상황이해 / 문제상황 및 목표제시 / MECE 측면에서 평가합니다.
                  </p>
                </CardBody>
                {/* <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter> */}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="warning">
                  <ChartistGraph
                    className="ct-chart"
                    data={this.C_chartdata}
                    type="Line"
                    options={emailsSubscriptionChart.options}
                    // responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                    listener={emailsSubscriptionChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>전략 도출</h4>
                  <p className={classes.cardCategory}>
                    가능성 / 효과 / 구체화 측면에서 평가합니다.
                  </p>
                </CardBody>
                {/* <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter> */}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="danger">
                  <ChartistGraph
                    className="ct-chart"
                    data={this.Q_chartdata}
                    type="Line"
                    options={completedTasksChart.options}
                    listener={completedTasksChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Overview</h4>
                  <p className={classes.cardCategory}>
                    Storyline 및 Flow / Reasoning 측면에서 평가합니다.
                  </p>
                </CardBody>
                {/* <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter> */}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="info">
                  <ChartistGraph
                    className="ct-chart"
                    data={this.A_chartdata}
                    type="Line"
                    options={communicationChart.options}
                    listener={communicationChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Communication</h4>
                  <p className={classes.cardCategory}>
                    덱 / 발표 / Q&A 측면에서 평가합니다.
                  </p>
                </CardBody>
                {/* <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter> */}
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="rose">
                  <h4 className={classes.cardTitleWhite}>Comments</h4>
                  <p className={classes.cardCategoryWhite}>
                    세션에 대한 상세한 Comment 입니다.
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="rose"
                    tableHead={["평가 ID", "Session", "Type", "Content"]}
                    tableData={this.commentTable}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(dashboardStyle)(Dashboard));