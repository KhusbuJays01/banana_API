import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, Form, FormLabel, Image, Navbar, Row } from 'react-bootstrap';
import life from '../assets/images/life.png'
import axios from 'axios';
import axiosClient from '../axios';
import { useStateContext } from '../context/ContextProvider';
import Swal from 'sweetalert2';
import * as confetti from 'confettis';
import { useTimer } from 'react-timer-hook';
import { Switch } from '@headlessui/react';
import cookie from 'js-cookie';
const Game = () => {
  const [urlData, setUrlData] = useState({
    question: '',
    solution: ''
  })
  const [score, setScore] = useState(getScoreFromLocalStorage() || 0);
  const [timerstate, setTimerState] = useState(getTimerState() || false);
  const [answer, setAnswer] = useState('');
  const [chances, setChances] = useState(3);
  const [highestScore, setHighestScore] = useState();

  const { setIsLoading } = useStateContext();
  const { showToast } = useStateContext();
  const { userToken, currentUser } = useStateContext();

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }
  //for hearts
  const minCryCount = 50
  const maxCryCount = 100

  const minCrySize = 0.2
  const maxCrySize = 0.5

  const minCryDisappear = 50
  const maxCryDisappear = 70

  //for Happy
  const minHappyCount = 50
  const maxHappyCount = 100

  const minHappySize = 0.2
  const maxHappySize = 0.5

  const minDisappear = 50
  const maxDisappear = 70

  const HappyColors = ['#FFFC9A', '#FFD655', '#FFC155', '#FF9D55']

  const submitAnswer = () => {
    setAnswer();
    console.log(answer);
    console.log(urlData.solution.toString());

    if (urlData.solution.toString() === answer) {
      const newScore = score + 1;
      confetti.create({
        x: 0.5,
        y: 0.5,
        count: randomNumber(minHappyCount, maxHappyCount),
        gravity: -0.001,
        ticks: randomNumber(minDisappear, maxDisappear),
        scale: [
          randomNumber(minHappySize, maxHappySize),
          randomNumber(minHappySize, maxHappySize),
          randomNumber(minHappySize, maxHappySize)
        ],
        speed: 20,
        decay: 0.94,
        spread: 360,
        shapes: ['emoji'],
        emojis: ['😄'],
        colors: HappyColors
      })
      setScore(newScore);
      saveScoreToLocalStorage(newScore);
      getUrlData();
      console.log(answer);
      showToast("Hurrrey!! Got the correct answer.", "success");
    }
    else {
      confetti.create({
        x: 0.5,
        y: 0.5,
        count: randomNumber(minCryCount, maxCryCount),
        gravity: -0.001,
        ticks: randomNumber(minCryDisappear, maxCryDisappear),
        scale: [
          randomNumber(minCrySize, maxCrySize),
          randomNumber(minCrySize, maxCrySize),
          randomNumber(minCrySize, maxCrySize)
        ],
        speed: 20,
        decay: 0.94,
        spread: 360,
        shapes: ['emoji'],
        emojis: ['😢']
      })
      if (chances === 1) {
        Swal.fire({
          title: "GAME OVER !!",
          text: "You have used all of your three lives.",
          icon: "warning",
          backdrop: 'rgba(60,60,60,0.8)',
          confirmButtonText: "Restart the game."
        }).then((result) => {
          if (result.value) {

          }
        }).catch((error) => {
          console.log(error);
        })
        let userID = currentUser.id;
        let item = { userID, score };
        axiosClient.post("/history", item)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          })
        resetChances();
      } else {
        decrementChances();
        getUrlData();
        showToast("Wrong answer", "error");
      }

    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    restart(time)
    setAnswer(null);
  }

  const getHighestScore = () => {
    axiosClient.get(`/history/score/${currentUser.id}`)
      .then((response) => {
        setHighestScore(response.data.data.highest_score);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getUrlData = () => {
    if (chances === 0) {
      Swal.fire({
        title: "GAME OVER !!",
        text: "You have used all of your three lives.",
        icon: "warning",
        backdrop: 'rgba(60,60,60,0.8)',
        confirmButtonText: "Restart the game."
      }).then((result) => {
        if (result.value) {
          resetChances();
        }
      }).catch((error) => {
        console.log(error);
      })
    } else {
      axios
        .get("https://marcconrad.com/uob/banana/api.php")
        .then((data) => {
          console.log(data.data);
          setUrlData(data.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }

  };

  useEffect(() => {
    const storedChances = cookie.get('chances');
    getHighestScore();

    const storedTimer = getTimerState();
    if (storedTimer !== null) {
      setTimerState(storedTimer);
    }

    if (storedChances) {
      setChances(parseInt(storedChances, 10));
    }

    // Initialize the score from localStorage
    const storedScore = getScoreFromLocalStorage();
    if (storedScore !== null) {
      setScore(storedScore);
    }

    if (chances === 0) {
      Swal.fire({
        title: "GAME OVER !!",
        text: "You have used all of your three lives.",
        icon: "warning",
        backdrop: 'rgba(60,60,60,0.8)',
        confirmButtonText: "Restart the game."
      }).then((result) => {
        if (result.value) {
          resetChances();
        }
      }).catch((error) => {
        console.log(error);
      })
    }
    getUrlData();
  }, []);

  const decrementChances = () => {
    if (chances > 0) {
      const newChances = chances - 1;
      setChances(newChances);
      cookie.set('chances', newChances.toString());
    }
  }

  const resetChances = () => {
    setChances(3);
    cookie.set('chances', '3');
    setScore(0);
    cookie.set('score', 0);
    getHighestScore();
  }

  // Set your initial time (in seconds) for the countdown
  const initialTime = 10; // 10 seconds

  // Define the function to be triggered when the countdown reaches zero
  const handleTimeout = () => {
    submitAnswer();
  };

  // Use the useTimer hook to manage the countdown timer
  const {
    seconds,
    minutes,
    restart,
    pause,
    resume,
  } = useTimer({
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30),
    onExpire: handleTimeout,
  });

  const handleTimerState = () => {
    if (timerstate === true) {
      cookie.set('timer', 'false');
      pause();
      console.log("pause");
    }
    else {
      cookie.set('timer', 'true');
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time)
      console.log("restart")
    }
    setTimerState(!timerstate);
  }

  function getTimerState() {
    const storedTimer = cookie.get('timer');
    return storedTimer === 'true';
  }

  const handleLoading = () => {
    setIsLoading(true);
  }

  // Function to retrieve score from localStorage
  function getScoreFromLocalStorage() {
    const storedScore = cookie.get('score');
    return storedScore ? parseInt(storedScore, 10) : null;
  }

  // Function to save score to localStorage
  function saveScoreToLocalStorage(newScore) {
    cookie.set('score', newScore.toString());
  }

  const chancesArray = new Array(chances).fill(null);
  return (
    <>
      <section className='d-flex justify-content-around m-3'>
        <h4>High Score: {highestScore}</h4>
        <h3>Score: {score}</h3>
        <h4 className='d-flex gap-1'>
          You have:
          {Array.from({ length: chances }).map((_, index) => (
            <Image key={index} src={life} width={30} height={30} />
          ))}
        </h4>
      </section>
      <div className='d-flex justify-content-center gap-2'>
        <h4>Set on the timer to train the brain{' '}</h4>
        <Form.Check
          type="switch"
          id="custom-switch"
          label=""
          checked={timerstate}
          onChange={handleTimerState}
          className={`custom-switch`}
          style={{ fontSize: "1.30rem" }}
        />
      </div>
      {timerstate ?
        <div className='text-center'>
          <h4>
            You have:{' '}
            <span>
              <h2 className='d-inline text-danger'>{minutes}:{seconds}</h2>
            </span>{' '}
            SECONDS!!
          </h4>
        </div>
        :
        <></>
      }
      <h5 className='text-center m-2'>What's the number under the banana!!</h5>
      <Container className='text-center'>
      Current User: {currentUser.name} &nbsp;
        Solution:{urlData.solution} &nbsp; 
        Token:{userToken}
        Life:{chances} 
        <Image 
          width={750}
          height={600}
          className='text-center'
          src={urlData.question}
        />
      </Container>
      <Row className='justify-content-center m-5'>
        <Col md="2">
          <input
            className='form-control'
            type='number'
            name='answer'
            placeholder='Enter the missing digit'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Col>
        <Col md="2" className='d-flex gap-3'>
          <Button onClick={submitAnswer} variant='btn btn-danger'>Submit</Button>
          <Button onClick={resetChances} variant='btn btn-danger'>Restart</Button>
        </Col>
      </Row>
    </>
  )
}

export default Game;


