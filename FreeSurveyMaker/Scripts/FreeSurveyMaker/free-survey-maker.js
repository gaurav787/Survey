var space = " ";
var titleBool = true;


$(document).ready(function () {
    //GenerateDefaultPanel();
});

$("body").on("change", "#slct", function () {
    alert($(this).val());
    var questionPanelId = $(this).closest(".questionPanelClass").attr("id");

    //multi choice
    if ($(this).val() == 1) {

    }

    //paragraph
    if ($(this).val() == 2) {

    }

    //checkboxes
    if ($(this).val() == 3) {

    }

});

$("body").on("click", ".deleteOption", function () {
    var closestFormCheckId = $(this).parent('.form-check').attr('id');
    $("#" + closestFormCheckId).remove();
});

$("body").on("click", ".addMoreOption", function () {
    var idGen = new Generator();
    var id = $(this).closest(".radioPanel").attr("id")
    var addMultiOption = "<div class='form-check' id=" + idGen.rand + " style='margin-top:10px'><input type = 'radio' disabled /><input type='text' style='width: 263px; margin-left:5px;outline:none;border-top:none;border-left:none;border-right:none;border-bottom:1px solid #4285f4;' /><span class='glyphicon glyphicon-remove deleteOption' style='margin-left:7px;'></span></div >";
    $("#" + id + " .form-check:last").before(addMultiOption);
});

$("body").on("click", ".deletePanelClass", function () {
    var mostParentDiv = $(this).closest(".questionPanelClass").attr("id");
    $("#" + mostParentDiv).remove();
});


$("body").on("click", ".btnSubmit", function () {

    var questionPanelId = $(this).closest(".questionPanelClass").attr("id");
    var question = $("#" + questionPanelId + space + "textarea").val();

    var makeQuestionLabel = "<label>" + question + "</label>";

    var allOptionsArray = [];
    $("#" + questionPanelId + space + ".radioPanel .form-check").each(function () {
        var id = $(this).attr('id');
        if (id !== "defaultRadioOptionAdder" && id !== "undefined") {
            allOptionsArray.push($("#" + id + space + "input[type=text]").val());
        };
    });

    var idGen1 = new Generator();
    var createRadioButton = "";
    for (var i = 0; i < allOptionsArray.length; i++) {
        var optionValue = allOptionsArray[i];
        createRadioButton += "<div><input type=radio name=" + idGen1.rand + " /><label style='margin-left:5px;' >" + optionValue + "</label></div>";
    }

    //createRadioButton = createRadioButton.replace(undefined, '');
    var idGen2 = new Generator();
    var questionFormat = "<div class='col-sm-7 questionPanelStyling' id=" + idGen2.rand + ">" +
        "<div style='margin-left:20px;'>" +
        "<div class='row appendDynamicLabel'>" +
        makeQuestionLabel +
        "</div>" +
        "<div class='row appendDynamicOptions' style='margin-top:10px;'>" +
        createRadioButton +
        "</div>" +
        "</div>" +
        "</div>";

    $("#readyQuestions").append(questionFormat);

    var createNewPanelLink = "<div id='createDiv' class='col-sm-7' style='text-align:center;margin-top:15px;'>" +
        "<span class='question-creator-link' id='questionCreatorLink' style='font-weight:bold;font-size:12px;'><span style='font-size:35px;'>+</span>Add question</span>" +
        "</div>";

    $("#readyQuestions").append(createNewPanelLink);

    $("#" + questionPanelId).remove();

    //$("#questionCreatorLink").parent().remove();
});

$("body").on("click", "#questionCreatorLink", function () {

    $(this).parent().remove();
    var idGen = new Generator();
    var panelFormat = "<div class='questionPanelClass' id=questionPanel" + idGen.rand + ">" +
        "<div class='col-sm-7 questionPanelStyling'>" +
        "<div class='row'><div class='col-sm-6'>" +
        "<textarea class='textAreaQuestion' id=blankTextArea" + idGen.rand + " placeholder='Question' cols='100'>" +
        "</textarea>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<div class='select'>" +
        "<select name='slct' id='slct'><option value='1'>Multiple Choice</option><option value='2'>Paragraph</option><option value='3'>Checkboxes</option></select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' style='margin-top:15px;'>" +
        "<div class='col-sm-12 radioPanel' id=defaultRadioOptionPanel" + idGen.rand + ">" +
        "<div class='form-check' id='defaultRadioOptionAdder' style='margin-top:10px;'>" +
        "<input type='radio' />" +
        "<label style='margin-left:5px;' id=addMultiOption" + idGen.rand + " class=addMoreOption>Add option</label>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<hr/>" +
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<button class='btn btn-primary btnSubmit' id=submit" + idGen.rand + ">Submit</button>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<span class='glyphicon glyphicon-trash deletePanelClass' id='deletePanelId' style='float:right; cursor:pointer;' aria-hidden='true'></span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    $("#blankPanel").append(panelFormat);

    if (titleBool) {
        CreateTitleAndDesc()
    }
    titleBool = false;

});


function GenerateDefaultPanel() {

    var idGen = new Generator();

    var panelFormat = "<div class='questionPanelClass' id=questionPanel" + idGen.rand + ">" +
        "<div class='col-sm-7 questionPanelStyling'>" +
        "<div class='row'><div class='col-sm-6'>" +
        "<textarea class='textAreaQuestion' id=blankTextArea" + idGen.rand + " placeholder='Question' cols='100'>" +
        "</textarea>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<div class='select'>" +
        "<select name='slct' id='slct'><option value='1'>Multiple Choice</option><option value='2'>Long Paragraph</option><option value='3'>Short Paragraph</option></select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' style='margin-top:15px;'>" +
        "<div class='col-sm-12 radioPanel' id=defaultRadioOptionPanel" + idGen.rand + ">" +
        "<div class='form-check' id='defaultRadioOptionAdder' style='margin-top:10px;'>" +
        "<input type='radio' />" +
        "<label style='margin-left:5px;' id=addMultiOption" + idGen.rand + " class=addMoreOption>Add option</label>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<hr/>" +
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<button class='btn btn-primary btnSubmit' id=submit" + idGen.rand + ">Submit</button>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<span class='glyphicon glyphicon-trash deletePanelClass' id='deletePanelId' style='float:right; cursor:pointer;' aria-hidden='true'></span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    $("#blankPanel").append(panelFormat);
}


$("body").on("click", ".questionPanelStyling", function () {

    debugger;

    var question = "";
    var nameField = "";
    var getOptionEditable = "";
    var questionPanelId = $(this).attr("id");
    if (questionPanelId !== undefined) {
        if ($("#" + questionPanelId + space + "label")[0] !== undefined) {
            question = $("#" + questionPanelId + space + "label")[0].innerText;
            if (question !== undefined) {
                nameField = $("#" + questionPanelId + space + ".appendDynamicOptions div input[type=radio]").attr("name");
                for (var i = 1; i < $("#" + questionPanelId + space + "label").length; i++) {
                    var option = $("#" + questionPanelId + space + "label")[i].innerText;
                    getOptionEditable += "<div class='row appendDynamicOptions' style='margin-top:10px;'><div><input type=radio name=" + nameField + " disabled><input type=text style='width: 263px; margin-left:5px;outline:none;border-top:none;border-left:none;border-right:none;border-bottom:1px solid #4285f4;'>" + option + "</input></div></div>";
                }
            }
        }
    }

    var getQuestionPanel = "<div class='questionPanelClass' id=questionPanel" + questionPanelId + ">" +
        "<div class='col-sm-7 questionPanelStyling'>" +
        "<div class='row'><div class='col-sm-6'>" +
        "<textarea class='textAreaQuestion' id=blankTextArea" + questionPanelId + " placeholder='Question' cols='100'>" +
        question +
        "</textarea>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<div class='select'>" +
        "<select name='slct' id='slct'><option value='1'>Multiple Choice</option><option value='2'>Long Paragraph</option><option value='3'>Short Paragraph</option></select>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' style='margin-top:15px;'>" +
        "<div class='col-sm-12 radioPanel' id=defaultRadioOptionPanel" + questionPanelId + ">" +
        "<div class='form-check' id='defaultRadioOptionAdder' style='margin-top:10px;'>" +
        getOptionEditable +
        "<input type='radio' />" +
        "<label style='margin-left:5px;' id=addMultiOption" + questionPanelId + " class=addMoreOption>Add option</label>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<hr/>" +
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<button class='btn btn-primary btnSubmit' id=submit" + questionPanelId + ">Submit</button>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<span class='glyphicon glyphicon-trash deletePanelClass' id='deletePanelId' style='float:right; cursor:pointer;' aria-hidden='true'></span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    if (questionPanelId !== undefined && $("#" + questionPanelId + space + "label")[0] !== undefined && question !== undefined) {
        $("#" + questionPanelId).remove();
        $("#readyQuestions").append(getQuestionPanel);
    }
});

function CreateTitleAndDesc() {

    var titleValue = $("#title").val();
    var descValue = $("#shortDesc").val();

    $("#TitlePanel").remove();

    var newTitlePanel = "<div class='col-sm-7 questionPanelStyling' id='TitlePanel'>" +
        "<div style='text-align:center;'>" +
        "<label style='font-size:30px;font-weight:bold;'>" + titleValue + "</label>" +
        "</div>" +
        "<div style='margin-top:5px;'>" +
        "<p style='word-break: break-word;'>" + descValue + "</p>" +
        "</div>" +
        "</div>";

    $("#blankTitlePanel").append(newTitlePanel);

}




function Generator() {
    Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
    Generator.prototype.getId = function () {
        return this.rand++;
    };
};