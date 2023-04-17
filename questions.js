var questions = {
    "questions": [
        {
            "question": "Which of the following best describes your social behavior?",
            "options": [
                {
                    "option": "A",
                    "description": "I am outgoing and enjoy socializing with others"
                },
                {
                    "option": "B",
                    "description": "I am more reserved and prefer spending time alone or with a few close friends"
                }
            ]
        },
        {
            "question": "When attending a party or social gathering, do you:",
            "options": [
                {
                    "option": "A",
                    "description": "Enjoy meeting new people and engaging in conversations"
                },
                {
                    "option": "B",
                    "description": "Feel uncomfortable and prefer to stick with familiar people or leave early"
                }
            ]
        },
        {
            "question": "Which of the following activities do you enjoy more?",
            "options": [
                {
                    "option": "A",
                    "description": "Attending social events and meeting new people"
                },
                {
                    "option": "B",
                    "description": "Spending time alone, reading or pursuing solitary hobbies"
                }
            ]
        },
        {
            "question": "When trying to learn new information, do you:",
            "options": [
                {
                    "option": "A",
                    "description": "Prefer to learn through hands-on experiences and practical applications"
                },
                {
                    "option": "B",
                    "description": "Prefer to learn through theory and abstract concepts"
                }
            ]
        },
        {
            "question": "How do you typically make decisions?",
            "options": [
                {
                    "option": "A",
                    "description": "Based on concrete, factual information and practical considerations"
                },
                {
                    "option": "B",
                    "description": "Based on abstract ideas, concepts, and possibilities"
                }
            ]
        },
        {
            "question": "Which of the following do you prefer?",
            "options": [
                {
                    "option": "A",
                    "description": "Focusing on the details and specifics of a situation"
                },
                {
                    "option": "B",
                    "description": "Considering the big picture and overall context of a situation"
                }
            ]
        },
        {
            "question": "When making decisions, do you:",
            "options": [
                {
                    "option": "A",
                    "description": "Base your decisions on logic and objective analysis"
                },
                {
                    "option": "B",
                    "description": "Base your decisions on your personal values and emotions"
                }
            ]
        },
        {
            "question": "How do you typically handle conflicts?",
            "options": [
                {
                    "option": "A",
                    "description": "By objectively analyzing the situation and finding a rational solution"
                },
                {
                    "option": "B",
                    "description": "By considering everyone's emotions and values to find a mutually acceptable solution"
                }
            ]
        },
        {
            "question": "Which of the following do you value more?",
            "options": [
                {
                    "option": "A",
                    "description": "Objectivity and rationality"
                },
                {
                    "option": "B",
                    "description": "Empathy and compassion"
                }
            ]
        },
    ]
}



/// request for username
var username = "John Doe";

function PersonalityTest(questions) {
    this.questions = questions;
    this.currentQuestionIndex = -1;
    this.selectedAnswer = null;
    this.progressBar = $('#progress-bar');

    this.load = () => {
        this.currentQuestionIndex++;
        const jsonData = this.questions['questions'][this.currentQuestionIndex];

        // Create question element
        const newDivElement = $('<div>').addClass('form-group my-2').attr('id', 'question-wrapper');
        const newParagraphElement = $('<p>').addClass('form-control-static').attr('id', 'question').text("Question: " + jsonData.question);
        newDivElement.append(newParagraphElement);
        $('#qna-form').append(newDivElement);

        // Create answer options
        $.each(jsonData.options, (index, option) => {
            // Use arrow function to automatically bind 'this'
            const divElement = $('<div>').addClass('form-group');
            const radioElement = $('<input>').addClass('mx-1').attr({
                'type': 'radio',
                'id': 'option' + (index + 1),
                'name': 'answer',
                'value': option.option,
                'required': true
            });

            radioElement.on('click', this.radioCheck.bind(this)); // Use bind to bind 'this' to radioCheck function

            const labelElement = $('<label>').attr('for', 'option' + (index + 1)).text(option.description);
            divElement.append(radioElement).append(labelElement);
            $('#qna-form').append(divElement);
        });

        // Create submit button
        const newButtonElement = $('<button>').attr({
            'class': 'btn btn-primary my-3'
        }).text('Submit');
        $('#qna-form').append(newButtonElement);
        newButtonElement.on('click', (e) => {
            e.preventDefault();
            this.submit();
        });
    }

    this.clearData = () => {
        this.selectedAnswer = null;
        $('#qna-form').html('');
    }

    this.submit = () => {
        // console.log(this.selectedAnswer == NaN);
        if (this.selectedAnswer != null) {
            if (this.questions['questions'].length - 1 > this.currentQuestionIndex) {
                this.progressBar.addClass('progress-bar-animated');
                // start progress bar animation
                const percCompleted = Math.round(((this.currentQuestionIndex + 1) / this.questions['questions'].length) * 100);
                // console.log(this.progressBar, `width: ${percCompleted}%`);
                this.progressBar.css(`width`, percCompleted + '%');
                setTimeout(() => {
                    this.progressBar.removeClass('progress-bar-animated');
                }, 800);

                this.questions['questions'][this.currentQuestionIndex].answer = this.selectedAnswer;
                this.clearData();
                this.load();
            }
            else {
                // test completed.
                alert('test is completed');

                var textContainer = $('<div>', { class: 'container border my-4', id: 'text-container' })
                    .append($('<h3>', { class: 'text-center', text: `Welcome ${username}!` }))
                    .append($('<p>', { class: 'text-center', text: 'Rest assured, your personality data is safe and secure in our top-notch servers. Our team of experts takes utmost care to protect your information with cutting-edge security measures.' }))
                    .append($('<p>', { class: 'text-center', text: 'As part of our trusted community, you are now ready to embark on an exciting journey of self-discovery. Your unique personality data will be used to provide you with personalized experiences tailored just for you.' }))
                    .append($('<p>', { class: 'text-center', text: 'So, get ready to unlock a world of possibilities as you explore our application. Your data is in safe hands, and we are excited to have you on board!' }))
                    .append($('<p>', { class: 'text-center', text: 'Thank you for choosing us. Let\'s begin this enriching journey together!' }))
                    .append($('<p>', { class: 'text-center' }).append($('<strong>', { text: 'Best regards,' })).append(' Bit rebels Team'));

                // var nextButton = $('<button>', { class: 'btn btn-primary center-block', id: 'next-button' })
                //     .append($('<span>', { class: 'glyphicon glyphicon-arrow-right' }))
                //     .append(' Go to Next Page');

                // textContainer.append(nextButton);

                // nextButton.on('click', function () {
                //     window.location.href = '#';
                // });
                $('body').html(textContainer);
            }
        }
        else {
            alert("select one option first.");
        }
    }

    this.radioCheck = (event) => {
        this.selectedAnswer = $('input[type=radio]:checked').val();
        console.log(this.selectedAnswer);
    }
}

var test = new PersonalityTest(questions);

test.load();

