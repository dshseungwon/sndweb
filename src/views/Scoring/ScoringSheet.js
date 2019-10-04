export default {
  "locale": "ko",
  "pages": [
   {
    "name": "page1",
    "elements": [
      {
        "type": "dropdown",
        "name": "Session",
        "title": {
         "ko": "세션 선택"
        },
        "isRequired": true,
        "choices": [
         {
          "value": "2차",
          "text": {
           "ko": "정규 2차 세션 (9.28, 고려대)"
          }
         },
         {
          "value": "3차",
          "text": {
           "ko": "정규 3차 세션 (10.05, 서울대)"
          }
         },
         {
          "value": "5차",
          "text": {
           "ko": "정규 5차 세션 (11.02, 연세대)"
          }
         },
         {
          "value": "6차",
          "text": {
           "ko": "정규 6차 세션 (11.09, 고려대)"
          }
         },
         {
          "value": "7차",
          "text": {
           "ko": "정규 7차 세션 (11.16, 고려대)"
          }
         }
        ]
       },
     {
      "type": "checkbox",
      "name": "P",
      "title": "발표자",
      "description": "본인이 피드백하고자 하는 학회원을 선택해주시기 바랍니다. 팀 발표인 경우 팀원 모두를 선택해주세요.\n",
      "isRequired": true,
      "choices": [
       {
        "value": "김가영",
        "text": "김가영"
       },
       {
        "value": "김서은",
        "text": "김서은"
       },
       {
        "value": "김지헌",
        "text": "김지헌"
       },
       {
        "value": "김진호",
        "text": "김진호"
       },
       {
        "value": "김찬민",
        "text": "김찬민"
       },
       {
        "value": "남경민",
        "text": "남경민"
       },
       {
        "value": "박지영",
        "text": "박지영"
       },
       {
        "value": "박하눌",
        "text": "박하눌"
       },
       {
        "value": "손지안",
        "text": "손지안"
       },
       {
        "value": "송호용",
        "text": "송호용"
       },
       {
        "value": "위성윤",
        "text": "위성윤"
       },
       {
        "value": "전병성",
        "text": "전병성"
       },
       {
        "value": "정주승",
        "text": "정주승"
       },
       {
        "value": "조영인",
        "text": "조영인"
       },
       {
        "value": "조하림",
        "text": "조하림"
       },
       {
        "value": "주승원",
        "text": "주승원"
       },
       {
        "value": "최성욱",
        "text": "최성욱"
       },
       {
        "value": "최진아",
        "text": "최진아"
       },
       {
        "value": "허우진",
        "text": "허우진"
       },
       {
        "value": "홍성현",
        "text": "홍성현"
       }
      ],
      "colCount": 5
     },
     {
      "type": "panel",
      "name": "panel2",
      "elements": [
       {
        "type": "matrix",
        "name": "S",
        "title": "문제 진단",
        "description": {
         "default": "",
        },
        "isRequired": true,
        "columns": [
         {
          "value": "1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "3",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "5",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "7",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "S1",
          "text": "상황 이해"
         },
         {
          "value": "S2",
          "text": "문제 상황/목표 제시"
         },
         {
          "value": "S3",
          "text": "MECE"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "SS",
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
        "name": "C",
        "title": "전략 도출",
        "description": {
         "default": "▶ 가능성\t\t- 현실적이고 실행 가능한 전략을 도출하고자 하였는가?\n\n▶ 효과    \t\t- 문제 해결과 목표 달성에 있어서 효과가 있는 전략을 도출하였는가?\n\n▶구체화        \t- 전략/해결방안을 충분히 구체화하였는가?",
         "ko": " "
        },
        "isRequired": true,
        "columns": [
         {
          "value": "1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "3",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "5",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "7",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "C1",
          "text": "가능성"
         },
         {
          "value": "C2",
          "text": "효과"
         },
         {
          "value": "C3",
          "text": "구체화"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "CC",
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
        "name": "Q",
        "title": "Overview",
        "description": {
         "default": "▶ Storyline/Flow     - 전체 발표 스토리라인/흐름을 탄탄하고, 설득적이게 하고자 하였는가?\n\n▶ Reasoning            - 각 주장을 뒷받침하기 위해 적절한 근거를 활용하고자 하였는가?",
         "ko": " "
        },
        "isRequired": true,
        "columns": [
         {
          "value": "1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "3",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "5",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "7",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "Q1",
          "text": "Storyline/Flow"
         },
         {
          "value": "Q2",
          "text": "Reasoning"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "QQ",
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
        "name": "A",
        "title": "Communication",
        "description": {
         "default": "▶ 덱\t\t\t- 헤드메시지가 각 장표의 내용을 효과적으로 요약, 전달하는가?\n\t\t\t\t- 각 장표가 핵심적인 내용을 선별하여 적절히 구조화 했는가?\n\n▶ 발표\t\t        - 목소리의 높낮이와 톤, 말의 속도를 적절히 조절하였는가?\n\t\t\t\t- 적절한 제스처와 말투를 사용하여 발표하였는가?\n\n▶ Q&A\t\t\t- 질문을 바르게 이해하고 적절한 답을 Answer first하였는가?",
         "ko": " "
        },
        "isRequired": true,
        "columns": [
         {
          "value": "1",
          "text": "1점 (미흡해요)"
         },
         {
          "value": "3",
          "text": "3점 (아쉬워요)"
         },
         {
          "value": "5",
          "text": "5점 (잘했어요)"
         },
         {
          "value": "7",
          "text": "7점 (우수해요)"
         }
        ],
        "rows": [
         {
          "value": "A1",
          "text": "덱"
         },
         {
          "value": "A2",
          "text": "발표"
         },
         {
          "value": "A3",
          "text": "Q&A"
         }
        ],
        "isAllRowRequired": true
       },
       {
        "type": "comment",
        "name": "AA",
        "title": "Communication에 대한 보완/개선점",
        "isRequired": true
       }
      ]
     },
     {
      "type": "comment",
      "name": "EE",
      "title": "기타 보완/개선점",
      "description": "그 외 항목에 대한 피드백을 자유롭게 서술해 주세요. (*참고자료를 추천해주거나, 타 학회원 혹은 같은 학회원의 과거 발표와의 비교분석 등을 바탕으로 하는 피드백도 여기에 포함됨)"
     }
    ]
   },
  ]
 };