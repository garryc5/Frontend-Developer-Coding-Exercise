var checkBox = document.querySelectorAll(".newsletterAgreement");
var Timer, countDownTimer;

checkBox.forEach(e => { e.addEventListener( 'change' , toggleCheckBox) });

function toggleCheckBox(evt)
{
    let setTo = (evt.target.checked)
    checkBox.forEach(e=>{
    e.checked = setTo
 }) }

 function setTimer()
 {
     var todaysDate = new Date()
     var webinarDate = new Date(todaysDate.getFullYear(),todaysDate.getMonth(),todaysDate.getDate()+5);
     countDownTimer = Math.trunc((webinarDate.getTime() - todaysDate.getTime())/1000);
     var webinarDateMonthDay = webinarDate.toDateString().split(' ').splice(1,2).join('  ');
     var webinarDateTime = webinarDate.toLocaleString('en-US', {hour:'2-digit',minute:'2-digit',timeZoneName:'short'});
     document.getElementById('webinarMonthDate').textContent = `${webinarDateMonthDay}th`;
     document.getElementById('webinarTime').textContent = `at ${webinarDateTime} EDT`
     Timer = setInterval(updateTimer, 1000);
    
}

function timeToSting(countDownTimer)
{
    var daysLeft = Math.trunc(countDownTimer/86400);
    countDownTimer = countDownTimer%86400;
    var hoursLeft = Math.trunc(countDownTimer/3600);
    countDownTimer = countDownTimer%3600;
    var minsLeft = Math.trunc(countDownTimer/60);
    var secsLeft = countDownTimer%60;
    return(`${daysLeft} Days, ${hoursLeft} Hours, ${minsLeft}Minutes, ${secsLeft} Seconds Left to Sign Up`);
}

function updateTimer()
{
    document.getElementById('countDownTimer').textContent = timeToSting(countDownTimer);
    countDownTimer--;

    if(countDownTimer==0)
    {
        document.getElementById('countDownTimer').textContent = 'The webinar Has Already Started';
        clearInterval(Timer);
    }
}

function checkBoxes()
{
    if(checkBox[0].checked && checkBox[1].checked)
    {
        const url='https://bl45immth4.execute-api.us-east-1.amazonaws.com/production/';
        fetch(url)
        .then((resp)=> resp.json())
        .then((data)=>
        {
            document.querySelectorAll(".submitOk").forEach((e)=>
            {
                e.textContent = JSON.parse(data.body).submitok
            })   
        })
    }
    else
    {
        alert('please check the box')
    }
}

 setTimer();