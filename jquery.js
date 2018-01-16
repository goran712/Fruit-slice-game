
var playing = false;
var score;
var trialsLeft;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var step, action;

$(function () {

// Click start - reset button
    $('#startreset').click(function () {

        // we are playing
        if(playing==true){
            //Reload page
            location.reload();


        }else {
            // we are NOT playing
            playing = true;   // game initiated
            score = 0;        // set score to 0

            $('#scorevalue').html(score);

            // 1. Show trials left
            $('#trialLeft').show();
            trialsLeft = 5;
            addHearts();

            $('#gameover').hide();

            // 2. Change button text "reset game"
            $('#startreset').html('Resetuj Igru');

            // 3. Create random fruit
            startAction();
        }
    });

//Slice a fruit
    $('#fruit1').mouseover(function () {
        score++;
        $('#scorevalue').html(score);
        $('#sliceSound')[0].play();

        //stop fruit
        clearInterval(action);

        //hide fruit
        $('#fruit1').hide('explode', 500);

        //send new fruit
        setTimeout(startAction, 500);

    });

    function addHearts() {
        $('#trialLeft').empty();
        for (var i = 0; i < trialsLeft; i++){
            $('#trialLeft').append('<img src="images/heart.png" class="life">');
        }
    }

    function startAction() {

        $('#fruit1').show();
        chooseFruit();
        $('#fruit1').css({'left': Math.round(Math.random() * 550), 'top': -50});

        // define a random step
        step = 1 + Math.round(5 * Math.random());

        // 4. Move fruit down every 30 seconds
        action = setInterval(function () {
            $('#fruit1').css('top', $('#fruit1').position().top + step);

            // 5. Is fruit too low?
            if ($('#fruit1').position().top > $('#fruitContainer').height()) {

                //check if we have trials left
                if (trialsLeft > 1) {
                    //generate a fruit
                    $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                    // define a random step
                    step = 1 + Math.round(5 * Math.random());

                    //reduce number of  trials by one
                    trialsLeft--;

                    //populate trial box
                    addHearts();

                } else {
                    //game over
                    playing = false;
                    $('#startreset').html('Startuj Igru');
                    $('#gameover').show();
                    $('#gameover').html('<p>game over!</p><p>your score is ' + score + '</p>');
                    $('#trialLeft').hide();
                    stopAction();
                }

            }

        }, 5);

    }

    // Generate random fruit
    function chooseFruit() {
        $('#fruit1').attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png' )

    }

    //stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $('#fruit1').hide();

    }

});



























