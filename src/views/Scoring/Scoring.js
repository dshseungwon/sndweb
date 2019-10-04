import React from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Search from "@material-ui/icons/Search";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Selectbar from "components/SelectBar/Selectbar.jsx";
import TextField from '@material-ui/core/TextField';

import { withFirebase } from "../../components/Firebase";
import { Select } from "@material-ui/core";

import * as Survey from "survey-react";
import  ScoringSheet from "./ScoringSheet";


class Scoring extends React.Component {
  state = {
    uid: "",
    name: "",
    email: "",
    password: "",
  };

  formCss = {
    matrix: {
        root: "table table-striped"
    },
    navigationButton: "button btn-lg"
  };
  

  surveyForm = ScoringSheet;

  componentDidMount() {
    Survey
    .StylesManager
    .applyTheme("bootstrap");

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
              console.log(this.state.name);
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

  //Define a callback methods on survey complete
  onComplete = (survey, options) => {
    //Write survey results into database

    var sd = survey.data;

    var surveyResult = {
      "eval_name": this.state.name,
      "eval_uid": this.state.uid,

      "Session": sd.Session,

      "P": sd.P,

      "S1": parseFloat(sd.S.S1),
      "S2": parseFloat(sd.S.S2),
      "S3": parseFloat(sd.S.S3),
      "SS": sd.SS,

      "SM": ((parseFloat(sd.S.S1) + parseFloat(sd.S.S2) + parseFloat(sd.S.S3)) / 3),

      "C1": parseFloat(sd.C.C1),
      "C2": parseFloat(sd.C.C2),
      "C3": parseFloat(sd.C.C3),
      "CC": sd.CC,

      "CM": ((parseFloat(sd.C.C1) + parseFloat(sd.C.C2) + parseFloat(sd.C.C3)) / 3),

      "Q1": parseFloat(sd.Q.Q1),
      "Q2": parseFloat(sd.Q.Q2),
      "QQ": sd.QQ,

      "QM": ((parseFloat(sd.Q.Q1) + parseFloat(sd.Q.Q2)) / 2),

      "A1": parseFloat(sd.A.A1),
      "A2": parseFloat(sd.A.A2),
      "A3": parseFloat(sd.A.A3),
      "AA": sd.AA,

      "AM": ((parseFloat(sd.A.A1) + parseFloat(sd.A.A2) + parseFloat(sd.A.A3)) / 3),

      "EE": sd.EE,
    }

      //upload logic
      let scoringRef = this.props.firebase.db.collection('scoring');
      let myScoredRef = this.props.firebase.db.collection('my_scored');
      let myScoringRef = this.props.firebase.db.collection('my_scoring');

      scoringRef.add({})
        .then((docRef) => {
          docRef.set({
            ...surveyResult
          })
          .catch((error) => {
            console.log(error);
          })
            myScoringRef.doc(this.state.name).collection('scoring').doc(docRef.id).set({
              ...surveyResult
            })
            .catch((error) => {
              console.log(error);
            })

            surveyResult.P.map((name) => {
              myScoredRef.doc(name).collection('scoring').doc(docRef.id).set({
                ...surveyResult
              })
              .catch((error) => {
                console.log(error);
              })
            })
          })
          .catch((error) => {
            console.log(error);
          })
  }

  handleChange = (e) => {
    this.setState({
      searchKey: e.target.value
    })
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeType = type_select => {
    this.setState({ type: type_select });
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = e => {
    e.preventDefault();
    const db = this.props.firebase.db;
    console.log(db);
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("users").add({
      fullname: this.state.fullname,
      email: this.state.email
    });
    this.setState({
      fullname: "",
      email: ""
    });
  };

  render() {
    const { classes } = this.props;
    var model = new Survey.Model(this.surveyForm);

    if (this.state.name === "") {
      return <h1>스코어링을 위해 로그인 해주세요 :)</h1>;
    } else {
      return <Survey.Survey model={model} css={this.formCss} onComplete={this.onComplete}/>;
    }
  }
}

export default withFirebase(withStyles(dashboardStyle)(Scoring));

