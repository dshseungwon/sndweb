import React from "react";
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


class Scoring extends React.Component {
  state = {
    value: 0,
    type: "all",
    email: "",
    fullname: "",
    loading: true,
    searchKey: "",
    clickSearch: false,
  };

  formCss = {
    matrix: {
        root: "table table-striped"
    },
    navigationButton: "button btn-lg"
  };
  

  surveyForm = {
  "locale": "ko",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "checkbox",
      "name": "Presentator",
      "title": "발표자",
      "description": "본인이 피드백하고자 하는 학회원을 선택해주시기 바랍니다. 팀 발표인 경우 팀원 모두를 선택해주세요.\n",
      "isRequired": true,
      "choices": [
       {
        "value": "p1",
        "text": "김가영"
       },
       {
        "value": "p2",
        "text": "김서은"
       },
       {
        "value": "p3",
        "text": "김지헌"
       },
       {
        "value": "p4",
        "text": "김진호"
       },
       {
        "value": "p5",
        "text": "김찬민"
       },
       {
        "value": "p6",
        "text": "남경민"
       },
       {
        "value": "p7",
        "text": "박지영"
       },
       {
        "value": "p8",
        "text": "박하눌"
       },
       {
        "value": "p9",
        "text": "손지안"
       },
       {
        "value": "p10",
        "text": "송호용"
       },
       {
        "value": "p11",
        "text": "위성윤"
       },
       {
        "value": "p12",
        "text": "전병성"
       },
       {
        "value": "p13",
        "text": "정주승"
       },
       {
        "value": "p14",
        "text": "조영인"
       },
       {
        "value": "p15",
        "text": "조하림"
       },
       {
        "value": "p16",
        "text": "주승원"
       },
       {
        "value": "p17",
        "text": "최성욱"
       },
       {
        "value": "p18",
        "text": "최진아"
       },
       {
        "value": "p19",
        "text": "허우진"
       },
       {
        "value": "p20",
        "text": "홍성현"
       }
      ],
      "otherText": "전병성",
      "colCount": 5
     },
     {
      "type": "panel",
      "name": "panel2",
      "elements": [
       {
        "type": "matrix",
        "name": "question2",
        "title": "문제 진단",
        "description": {
         "default": "",
        },
        "isRequired": true,
        "columns": [
         {
          "value": "Column 1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "Column 2",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "Column 3",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "Column 4",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "Row 1",
          "text": "상황 이해"
         },
         {
          "value": "Row 2",
          "text": "문제 상황/목표 제시"
         },
         {
          "value": "Row 3",
          "text": "MECE"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "question3",
        "title": "문제 진단에 대한 보완/개선점",
        "isRequired": true
       }
      ]
     },
     {
      "type": "panel",
      "name": "panel3",
      "elements": [
       {
        "type": "matrix",
        "name": "question6",
        "title": "전략 도출",
        "description": {
         "default": "▶ 가능성\t\t- 현실적이고 실행 가능한 전략을 도출하고자 하였는가?\n\n▶ 효과    \t\t- 문제 해결과 목표 달성에 있어서 효과가 있는 전략을 도출하였는가?\n\n▶구체화        \t- 전략/해결방안을 충분히 구체화하였는가?",
         "ko": " "
        },
        "isRequired": true,
        "columns": [
         {
          "value": "Column 1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "Column 2",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "Column 3",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "Column 4",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "Row 1",
          "text": "가능성"
         },
         {
          "value": "Row 2",
          "text": "효과"
         },
         {
          "value": "Row 3",
          "text": "구체화"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "question7",
        "title": "전략 도출에 대한 보완/개선점",
        "isRequired": true
       }
      ]
     },
     {
      "type": "panel",
      "name": "panel1",
      "elements": [
       {
        "type": "matrix",
        "name": "question4",
        "title": "Overview",
        "description": {
         "default": "▶ Storyline/Flow     - 전체 발표 스토리라인/흐름을 탄탄하고, 설득적이게 하고자 하였는가?\n\n▶ Reasoning            - 각 주장을 뒷받침하기 위해 적절한 근거를 활용하고자 하였는가?",
         "ko": " "
        },
        "isRequired": true,
        "columns": [
         {
          "value": "Column 1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "Column 2",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "Column 3",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "Column 4",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "Row 1",
          "text": "Storyline/Flow"
         },
         {
          "value": "Row 2",
          "text": "Reasoning"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "question5",
        "title": "Overview에 대한 보완/개선점",
        "isRequired": true
       }
      ]
     },
     {
      "type": "panel",
      "name": "panel4",
      "elements": [
       {
        "type": "matrix",
        "name": "question8",
        "title": "Communication",
        "description": {
         "default": "▶ 덱\t\t\t- 헤드메시지가 각 장표의 내용을 효과적으로 요약, 전달하는가?\n\t\t\t\t- 각 장표가 핵심적인 내용을 선별하여 적절히 구조화 했는가?\n\n▶ 발표\t\t        - 목소리의 높낮이와 톤, 말의 속도를 적절히 조절하였는가?\n\t\t\t\t- 적절한 제스처와 말투를 사용하여 발표하였는가?\n\n▶ Q&A\t\t\t- 질문을 바르게 이해하고 적절한 답을 Answer first하였는가?",
         "ko": " "
        },
        "isRequired": true,
        "columns": [
         {
          "value": "Column 1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "Column 2",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "Column 3",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "Column 4",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "Row 1",
          "text": "덱"
         },
         {
          "value": "Row 2",
          "text": "발표"
         },
         {
          "value": "Row 3",
          "text": "Q&A"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "question9",
        "title": "Communication에 대한 보완/개선점",
        "isRequired": true
       }
      ]
     },
     {
      "type": "comment",
      "name": "question10",
      "title": "기타 보완/개선점",
      "description": "그 외 항목에 대한 피드백을 자유롭게 서술해 주세요. (*참고자료를 추천해주거나, 타 학회원 혹은 같은 학회원의 과거 발표와의 비교분석 등을 바탕으로 하는 피드백도 여기에 포함됨)"
     }
    ]
   },
   {
    "name": "page2"
   },
   {
    "name": "page3"
   }
  ]
 };

  //Define a callback methods on survey complete
  onComplete(survey, options) {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
  }

  componentDidMount() {
    Survey
    .StylesManager
    .applyTheme("bootstrap");
  
    
    const db = this.props.firebase.db;

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

  onPressSearch = () => {
    console.log(this.state.clickSearch);
    this.setState({clickSearch: true});
  }

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
    return (<Survey.Survey model={model} css={this.formCss} onComplete={this.onComplete}/>);
  }
}

export default withFirebase(withStyles(dashboardStyle)(Scoring));

