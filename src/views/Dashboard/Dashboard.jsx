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

  commentTable = [];

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

    // this.listner = this.props.firebase.auth.onAuthStateChanged(
    //   authUser => {
    //     if(authUser) {
    //       db.collection("works")
    //         .where("isRecent", "==", true)
    //         .where("owner", "==", authUser.uid)
    //         .get()
    //         .then(
    //           function(querySnapshot) {
    //             querySnapshot.forEach(function(doc) {
    //               let tempdata = doc.data();
    //               tempdata.id = doc.id;
    //               workArray.push(tempdata);
    //               console.log(doc.id, " => ", tempdata);
    //             });
    //             this.setState({ loading: false });
    //           }.bind(this)
    //         )
    //         .catch(function(error) {
    //           console.log("Error getting documents: ", error);
    //   });
    //     } else {
    //       workArray = [];
    //       this.setState({
    //         authUser: null,
    //       });
    //     }
    //   }
    // );
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

      this.commentTable = [];
      
      this._myScoredSheets.map((obj, index) => {
        this.S_mean += obj.SM;
        this.C_mean += obj.CM;
        this.Q_mean += obj.QM;
        this.A_mean += obj.AM;

        this.commentTable.push([index.toString(), "정규 3차 세션", "문제 진단", obj.SS]);
        this.commentTable.push([index.toString(), "정규 3차 세션", "전략 도출", obj.CC]);
        this.commentTable.push([index.toString(), "정규 3차 세션", "Overview", obj.QQ]);
        this.commentTable.push([index.toString(), "정규 3차 세션", "Communication", obj.AA]);
        this.commentTable.push([index.toString(), "정규 3차 세션", "기타", obj.EE]);
      });

      if (this.S_mean != 0 || this._myScoredSheets.length != 0)
        this.S_mean /= this._myScoredSheets.length;
      if (this.C_mean != 0 || this._myScoredSheets.length != 0)
        this.C_mean /= this._myScoredSheets.length;
      if (this.Q_mean != 0 || this._myScoredSheets.length != 0)
      this.Q_mean /= this._myScoredSheets.length;
      if (this.A_mean != 0 || this._myScoredSheets.length != 0)
      this.A_mean /= this._myScoredSheets.length;


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
                    data={dailySalesChart.data}
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
                    data={emailsSubscriptionChart.data}
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
                    data={completedTasksChart.data}
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
                    data={communicationChart.data}
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
                    tableHead={["ID", "Session", "Type", "Content"]}
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






          // <GridItem xs={12} sm={12} md={6}>
          //     <CustomTabs
          //       title="Tasks:"
          //       headerColor="primary"
          //       tabs={[
          //         {
          //           tabName: "Bugs",
          //           tabIcon: BugReport,
          //           tabContent: (
          //             <Tasks
          //               checkedIndexes={[0, 3]}
          //               tasksIndexes={[0, 1, 2, 3]}
          //               tasks={bugs}
          //             />
          //           )
          //         },
          //         {
          //           tabName: "Website",
          //           tabIcon: Code,
          //           tabContent: (
          //             <Tasks
          //               checkedIndexes={[0]}
          //               tasksIndexes={[0, 1]}
          //               tasks={website}
          //             />
          //           )
          //         },
          //         {
          //           tabName: "Server",
          //           tabIcon: Cloud,
          //           tabContent: (
          //             <Tasks
          //               checkedIndexes={[1]}
          //               tasksIndexes={[0, 1, 2]}
          //               tasks={server}
          //             />
          //           )
          //         }
          //       ]}
          //     />
          //   </GridItem>