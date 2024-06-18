// Quiz Logic

// quiz questions
// attributeScore categories: determination, friendship, confidence, adaptability 
const questions = [
    {
        title: "What do you value most in a song?",
        description: "Which vibe strikes a chord with you?",
        imageSrc: "images/hsm1.webp",
        answers: [
            { text: "Empowerment and breaking free from limitations",
              attributeScores: [ 9, 2, 5, 1, 3 ], },
            { text: "Love and friendship overcoming obstacles",
              attributeScores: [ 1, 10, 3, 2, 7 ], },
            { text: "Self-confidence and glamour",
              attributeScores: [ 4, 1, 9, 7, 2 ], },
            { text: "Seizing opportunities and embracing change",
              attributeScores: [ 8, 4, 3, 10, 6 ], },
        ],
    },
    {
        title: "When faced with a challenge, what is your usual approach?",
        description: "How do you Get'cha Head in the Game",
        imageSrc: "images/hsm2.webp",
        answers: [
            { text: "Obstacles with determination and perseverance",
              attributeScores: [ 3, 1, 4, 10, 6 ], },
            { text: "Stay true to yourself even in difficult times",
              attributeScores: [ 1, 9, 5, 2, 7 ], },
            { text: "Face challenges with confidence and style",
              attributeScores: [ 6, 1, 10, 4, 3 ], },
            { text: "Confront obstacles head-on and learn from experiences",
              attributeScores: [ 7, 6, 4, 8, 2 ], },
        ],
    },
    {
      title: "Which message resonates with you the most?",
      description: "We have to work this out",
      imageSrc: "images/hsm3.webp",
      answers: [
          { text: "Empowerment and liberation",
            attributeScores: [ 9, 2, 3, 4, 1 ], },
          { text: "Love and friendship conquering all",
            attributeScores: [ 1, 10, 3, 4, 1 ], },
          { text: "Self expression and confidence",
            attributeScores: [ 3, 1, 10, 4, 2 ], },
          { text: "Self-discovery and resilience",
            attributeScores: [ 4, 3, 2, 9, 6 ], },
      ],
  },
  {
    title: "How do you envision your ideal relationship?",
    description: "What is your perfect duet?",
    imageSrc: "images/hsm4.webp",
    answers: [
        { text: "Supportive and Empowering",
          attributeScores: [ 7, 2, 5, 9, 4 ], },
        { text: "Honest and true",
          attributeScores: [ 1, 10, 3, 2, 6 ], },
        { text: "Glamorous and confident",
          attributeScores: [ 3, 2, 9, 7, 1 ], },
        { text: "Real and authentic",
          attributeScores: [ 4, 6, 3, 10, 2 ], },
    ],
},
{
  title: "Which theme do you most enjoy in a song?",
  description: "Are we all in this together or are you walking away?",
  imageSrc: "images/hsm5.webp",
  answers: [
      { text: "Overcoming adversity and challenges",
        attributeScores: [ 10, 3, 4, 9, 6 ], },
      { text: "Celebrating friendship and togetherness",
        attributeScores: [ 2, 10, 3, 4, 7 ], },
      { text: "Confidence and self-expression",
        attributeScores: [ 3, 1, 10, 7, 5 ], },
      { text: "Discovery and personal growth",
        attributeScores: [ 5, 4, 3, 10, 2], },
  ],
},
];

// get the relevant html elements and save to variables
const progressBar = document.getElementById("progress-bar");
const submitButton = document.getElementById('submit-btn');
const questionNavigation = document.getElementById( "qnav" );

// where all the new questions will be added
const questionSection = document.getElementById('qsection');

let cumulativeScores = [0, 0, 0, 0, 0];

let lastSelected = new

Array(questions.length).fill(null);

function updateProgressBar() {
    const totalQuestions = questions.length; // Get the total number of questions
    const answeredQuestions = lastSelected.filter(ans => ans !== null).length; // Count the answered questions

    const progressPercentage = (answeredQuestions / totalQuestions) * 100; // Calculate the progress percentage
    progressBar.style.width = `${progressPercentage}%`; // Update the progress bar width
    progressBar.innerText = `${Math.round(progressPercentage)}%`; // Display the percentage
}


function captureAnswer(questionIndex,newAnswerIndex) {
  if (lastSelected[questionIndex] !== null) {
    const previousScores = questions[questionIndex].answers[lastSelected[questionIndex]].attributeScores;
      for(let i = 0; i < cumulativeScores.length; i++) {
        cumulativeScores[i] -= previousScores[i];
      }
  }

    const newScores = questions[questionIndex].answers[newAnswerIndex].attributeScores;
      for (let i = 0; i < cumulativeScores.length; i++) {
        cumulativeScores[i] += newScores[i]
      }
      lastSelected[questionIndex] = newAnswerIndex;

      updateProgressBar();
}

// functions

function generateQuestions() {
    questions.forEach(( question, qIndex )  => {
        let qNum = qIndex + 1;
        let qTitleID = `qtitle-${qNum}`;

        // handle navigation menu
        let qNavBtn = document.createElement( "a" );
          // create unique id matching question title
        qNavBtn.setAttribute( "href", "#" + qTitleID );
        qNavBtn.innerHTML = `Question ${qNum}`;
          // add new button to navigation
        questionNavigation.appendChild( qNavBtn );

        // create the qbox element and add the corrosponding elements to them
        let qBox = document.createElement( "div" );
        qBox.classList.add( "qbox" );

        // add title
          // create new div and add class
        let qTitle = document.createElement( "div" );
        qTitle.classList.add( "qtitle" );
          // add unique id matching nav
        qTitle.setAttribute( "id", qTitleID );
          // add text from questions array
        qTitle.innerHTML = `${qNum}. ${question.title}`;
          // add to qbox
        qBox.appendChild( qTitle );

        // add info
          // create element and add class
        let qInfo = document.createElement( "div" );
        qInfo.classList.add( "qinfo" );
          // add decriptions info
        if( question.description ) {
            qDescription = document.createElement( "p" );
            qDescription.innerHTML = question.description;
            qInfo.appendChild( qDescription );
        }
          // add image
        if( question.imageSrc ) {
            qImage = document.createElement( "img" );
            qImage.src = question.imageSrc;
            qInfo.appendChild( qImage );
        }

          // add the info section
        qBox.appendChild( qInfo );

        // add answers
          // create answer section
        let aSection = document.createElement( "div" );
        aSection.classList.add( "qans" );
          // add each answer to the section
        question.answers.forEach( function( answer, aIndex ) {
            // create unique id
            let aID = `q${qNum}a${aIndex}`;

            // create input element
            let aInput = document.createElement( "input" );
            aInput.type = "radio";
            aInput.id = aID;
            aInput.setAttribute("name", `q${qNum}-ans-group` );

            //track user selections and update score
            aInput.addEventListener("change", () => {
              captureAnswer(qIndex,aIndex);
            });

            // create label element
            let aLabel = document.createElement( "label" );
            aLabel.setAttribute( "for", aID );
            aLabel.innerHTML = answer.text;

            // add both to answer section
            aSection.appendChild( aInput );
            aSection.appendChild( aLabel );
        });
          // add the answer section to the qbox
        qBox.appendChild( aSection );

        // add to qbox element to document
        questionSection.appendChild( qBox );
    });
}

//cumulative attribute scores
  function determineQuizResult() { const averageScores = cumulativeScores.map(score => score / questions.length);
  const songAttributes = {
  "Start of Something New! Determination: Just like Troy and Gabriella, you're ready to step outside your comfort zone and start something new. This song resonates with your ability to embrace change and take that leap of faith. Confidence: Like when Troy sings in front of a crowd for the first time, this song celebrates your growing self-belief and courage to take risks.Adaptability: This song reflects your willingness to adjust to new situations and discover unexpected possibilities, just as Troy did when he joined the musical": [7, 3, 6, 5, 2],

  "What I've Been Looking For! Friendship: This song reminds you of Sharpay and Ryan's close bond. It reflects your value for genuine connections and the power of teamwork. Confidence: Sharpay's boldness and style inspire you to express yourself and stay true to who you are, just like she does on stage. Determination: Like the Evans siblings' relentless drive for stardom, this song speaks to your commitment to achieving your dreams and facing challenges head-on": [3, 9, 4, 2, 7],

  "Fabulous! Confidence: You're all about the glam, just like Sharpay in Fabulous. This song is acelebration of your self-assurance and flair for the dramatic. Determination: Sharpay knows what she wants, and so do you. This song is a reflection of your drive to achieve your dreams, no matter what it takes. Adaptability: Despite her diva moments, Sharpay can adapt to changing circumstances, just like you. This song represents your ability to stay fabulous even in unexpected situations": [6, 2, 10, 3, 5],

  "Bet On It! Determination: You're as driven as Troy in Bet On It. This song reflects your willingness to work hard and overcome obstacles with determination and perseverance. Confidence: When Troy faces his inner conflicts, he finds confidence in himself. This song resonates with your journey to find your inner strength and trust your instincts. Adaptability: Like Troy adapting to new roles, this song represents your ability to evolve and embrace change, even when the path ahead is uncertain": [9, 1, 4, 10, 6],

  "Get'cha Head in the Game! Determination: Just like Troy on the basketball court, you're focused and determined to succeed. This song is all about keeping your eye on the prize and working hard to achieve your goals. Confidence: You exude the same confidence that Troy shows when he's in his element, leading his team to victory. Adaptability: This song represents your ability to adapt to different challenges and keep pushing forward, no matter what the game throws at you": [7, 5, 3, 6,4],

  "Everyday! Friendship: You're a team player, like the Wildcats in Everyday. This song speaks to your belief in the power of friendship and sticking together. Determination: Like Troy and Gabriella's commitment to each other, you're determined to stay true to your friends and work through any challenges. Adaptability: This song represents your ability to adapt and overcome challenges with the support of those around you, just like the Wildcats do in the championship game": [2, 7, 5, 6, 10],

  "Now or Never! Determination: You're as determined as the Wildcats in the final game. This song represents your willingness to give it your all when it counts the most. Confidence: Like Troy rallying his team, you're confident in your abilities and ready to take charge when needed. Adaptability: This song reflects your adaptability, as you adjust to new circumstances and make the most of every opportunity": [10, 4, 3, 9, 6],

  "Can I Have This Dance! Friendship: This song is all about connections, like Troy and Gabriella's dance in the rooftop garden. It resonates with your value for deep and meaningful relationships. Confidence: You're confident enough to take the lead, just like Troy in his dance with Gabriella, showing your strength and tenderness. Determination: This song represents your determination to build lasting connections and maintain them through thick and thin": [5, 8, 6, 3,7],

  "I Want It All! Confidence: You're as confident as Sharpay in I Want It All. This song embodies your ambition and drive to reach the top. Determination: Like Sharpay's unwavering focus, you don't let anything get in the way of your goals. Adaptability: This song represents your ability to adapt and navigate any challenges on the path to success, just like Sharpay": [9, 2, 10, 7, 4],

  "We're All in This Together! Friendship: This song is the ultimate anthem for unity. Like the Wildcats, you're a strong believer in teamwork and collaboration. Confidence: You have the confidence to lead and support others, just like the Wildcats when they come together for the big performance. Determination: This song reflects your determination to work with others and overcome any obstacle as a team, embracing the spirit of community and unity": [3, 10, 6, 2, 8],
  };

  // determine results 
  
    let closestSong = null;
    let smallestDifference = Infinity;

    for(let song in songAttributes) {
      let totalDifference = 0;

      for(let i = 0; i < averageScores.length; i++) {
        totalDifference += Math.abs(averageScores[i] - songAttributes[song][i]);
      }

      if (totalDifference < smallestDifference) {
        closestSong = song;
        smallestDifference = totalDifference;
      }
      
    }
     const modal = document.getElementById("result-modal");
    const resultTextElement = document.getElementById("result-text");
    const resultGif = document.getElementById("result-gif");

    resultTextElement.innerText = `Your matching song is: ${closestSong}!`; // Display the result text
    
    modal.style.display = "block"; // Show the modal
  
    console.log("Your Matching Song is: !", closestSong);
}
submitButton.addEventListener("click", determineQuizResult);

// main code
generateQuestions(); 