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

  //Define a callback methods on survey complete
  onComplete = (survey, options) => {
    //Write survey results into database

    var surveyResult = {
      "eval_name": this.state.name,
      "eval_uid": this.state.uid,
      ...survey.data}

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

            console.log(surveyResult.Question1);
            surveyResult.Question1.map((name) => {
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

