var gameScore=0;
var question_count=0;
var quizScore=0;
function customisedGame(point){
		gameScore=gameScore+point;
	    var questions=[
			{
			   q:"Full form of RBS",
			   option1:"Royal BS",
			   option2:"Royal Bank of Scotland",
			   corrrect:"b"
			},
			{
			   q:"Full form of DBS",
			   option1:"Doyal BS",
			   option2:"Doyal Bank of Scotland",
			   corrrect:"a"
			}
		];
        if(question_count<questions.length)
		{

			/*
 * @title {String or DOMElement} The dialog title.
 * @message {String or DOMElement} The dialog contents.
 * @value {String} The default input value. 
 * @onok {Function} Invoked when the user clicks OK button.
 * @oncancel {Function} Invoked when the user clicks Cancel button or closes the dialog.
 *
 * alertify.prompt(title, message, value, onok, oncancel);
 * 
 */
        alertify.prompt( 'Quiz on BU', questions[question_count].q+"\na) "+questions[question_count].option1+"\nb) "+questions[question_count].option2,""
               , function(evt, value) { 
               	alertify.success('You entered option: ' + value);
               	if(value==questions[question_count].corrrect)
			quizScore=quizScore+20;
			else
			quizScore=quizScore-5;
			alertify.alert("Answer", "Correct answer:"+questions[question_count].corrrect);
			question_count=question_count+1;
                }
               , function() { alertify.error('You have not answered this') });


			/*answer=prompt(questions[question_count].q+"\na)"+questions[question_count].option1+"\nb)"+questions[question_count].option2,"");
			if(answer==questions[question_count].corrrect)
			quizScore=quizScore+20;
			else
			quizScore=quizScore-5;
			alert("Correct answer:"+questions[question_count].corrrect);
			question_count=question_count+1;*/
		}
		else{
		   alertify.alert("Score of the User", "Game Score: "+gameScore+"\n Quiz Score: "+quizScore);
		   window.close();
		}

}
var ytResultBox = (function () {
	
	function ytResultBox (point) {
		
		var s = this;
		customisedGame(point,s);
		LExtends(s, LSprite, []);

		var backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = backgroundBmp.scaleY = 0.5;
		s.addChild(backgroundBmp);

		s.filters = [new LDropShadowFilter()];

		s.txtTemplate = new LTextField();
		s.txtTemplate.color = "white";
		s.txtTemplate.weight = "bold";

		s.txtLayer = new LSprite();
		s.addChild(s.txtLayer);

		s.btnLayer = new LSprite();
		s.addChild(s.btnLayer);

		s.addResult(point);
		
		s.addBtns();
	}

	ytResultBox.prototype.addResult = function (point) {
		var s = this;

		s.txtLayer.y = 50;

		var titleTxt = s.txtTemplate.clone();
		titleTxt.text = "Final Distance";
		titleTxt.size = 20;
		titleTxt.x = (s.getWidth() - titleTxt.getWidth()) / 2;

		s.txtLayer.addChild(titleTxt);
		
		var pointTxt = s.txtTemplate.clone();
		pointTxt.size = 30;
		pointTxt.text = point + " m";
		pointTxt.x = (s.getWidth() - pointTxt.getWidth()) / 2;
		pointTxt.y = titleTxt.getHeight() + 20;
		s.txtLayer.addChild(pointTxt);
	};

	ytResultBox.EVENT_CLICK_BUTTON = "event_click_button";

	ytResultBox.prototype.addBtns = function () {
		var s = this;

		s.btnLayer.y = s.txtLayer.y + s.txtLayer.getHeight() + 50;

		var btnTxtList = [
			 "Go Ahead"
			// "Back to Menu",
			// "Back to Option"
		];

		for (var k = 0, btnY = 0; k < btnTxtList.length; k++) {
			var btnTxt = s.txtTemplate.clone();
			btnTxt.size = 13;
			btnTxt.text = btnTxtList[k];
			var btn = new ytButton(1, [btnTxt, "center", "middle"], [0.5, 0.5]);
			btn.index = k;
			btn.x = (s.getWidth() - btn.getWidth()) * 0.5;
			btn.y = btnY;
			s.btnLayer.addChild(btn);

			btn.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
				var eve = new LEvent(ytResultBox.EVENT_CLICK_BUTTON);
				eve.msg = e.currentTarget.index;

				s.dispatchEvent(eve);
			});

			btnY += btn.getHeight() + 20;
		}
	};

	return ytResultBox;
})();