import React from "react";
import Footer from "../../../fragments/footer/Footer";
import TestResultsService from "../../../../../api/test/TestResultsService";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../../../css/Test.module.css";
import style from "../../../../../css/Footer.module.css";
import layout from "../../../../../css/UserHome.module.css";
import BackgroundHome from "../../../fragments/background/BackgroundHome";

const TestForm = () => {
  let key = 1;
  let username = AuthenticationService.getLoggedInUser();
  let [loading, setLoading] = useState(true);

  const questions = [
    {
      questionText: "What type of product are you looking for today?",
      value: "categoryOne",
      answerOptions: [
        { answerText: "Electronic", category: "ELECTRONICS" },
        { answerText: "Sports", category: "SPORTS" },
        { answerText: "Machinery", category: "MACHINERY" },
        { answerText: "Building", category: "BUILDING" },
      ],
    },
    // {
    //   questionText: "Do you enjoy office activities?",
    //   value: "categoryTwo",
    //   answerOptions: [
    //     { answerText: "Yes", category: "OFFICE" },
    //     { answerText: "No", category: "OTHER" },
    //     { answerText: "Sometimes", category: "OFFICE" },
    //     { answerText: "Not sure", category: "OTHER" },
    //   ],
    // },
    // {
    //   questionText: "Are you planning to build a house?",
    //   value: "categoryThree",
    //   answerOptions: [
    //     { answerText: "Yes", category: "BUILDING" },
    //     { answerText: "No", category: "OTHER" },
    //     { answerText: "Sometimes", category: "BUILDING" },
    //     { answerText: "Not sure", category: "OTHER" },
    //   ],
    // },
    {
      questionText: "What is Your location?",
      value: "location",
      answerOptions: [
        { answerText: "Kigali", category: "KIGALI" },
        { answerText: "Rubavu", category: "RUBAVU" },
        { answerText: "Musanze", category: "MUSANZE" },
        { answerText: "Huye", category: "HUYE" },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [test, setTest] = useState({
    username: username,
  });

  const handleAnswerOptionClick = (answer) => {
    console.log(questions[currentQuestion].value);

    setTest((test) => ({
      ...test,
      [questions[currentQuestion].value]: answer,
    }));

    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    if (nextQuestion === questions.length) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const check_uploaded = () => {
      if (!loading) {
        TestResultsService(test);
      }
    };
    check_uploaded();
  }, [loading, test]);

  return (
    <>
      <main className={layout.theWarehouse_main}>
        {currentQuestion === questions.length && (
          <div className={styles.test_form_end}>
            <section className={styles.test_end}>
              Thank you! We have processed your Request, Please visit your
              homepage to discover if there is Warehouse Matches! <br></br>
              <button type="submit" className={styles.button}>
                <Link to="/user-home" className={styles.link_home}>
                  Discover
                </Link>
              </button>
            </section>
          </div>
        )}

        {currentQuestion !== questions.length && (
          <div className={styles.test_form}>
            <section className={styles.question_section}>
              {currentQuestion !== questions.length && (
                <div className={styles.question_count}>
                  <span>Question {currentQuestion + 1}</span>
                </div>
              )}

              {currentQuestion !== questions.length && (
                <div className={styles.question_text}>
                  {questions[currentQuestion].questionText}
                </div>
              )}
            </section>
            <section className={styles.answer_section}>
              {currentQuestion !== questions.length &&
                questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    key={key++}
                    className={styles.test_button}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.category)
                    }>
                    {answerOption.answerText}
                  </button>
                ))}
            </section>
          </div>
        )}
      </main>
      <Footer class={style.footer_theWarehouse_details} />
      <BackgroundHome />
    </>
  );
};

export default TestForm;
