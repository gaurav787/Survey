var enumOptionType = {
    Multichoice: "1",
    Paragraph: "2",
    Checkboxes: "3"
};
var space = " ";
var dropDownValue = "1";

function Generator() {
    Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
    Generator.prototype.getId = function () {
        return this.rand++;
    };
};

$("body").on("click", ".add-question", function () {

    var uniqueId = new Generator();
    var template = "<div class='col-sm-7 question-editing-panel' id=" + uniqueId.rand + ">" +
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<textarea placeholder='Question' class='text-area'></textarea>" +
        "</div>" +
        "<div class='select'>" +
        "<select name='slct' id='option-dropdown'>" +
        "<option value='1'>Multiple choice</option>" +
        "<option value='2'>Paragraph</option>" +
        "<option value='3'>Checkboxes</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        "<div class='row mg-top-15 all-options-placeholder'>" +
        "<div class='mg-left-15 options-placeholder'></div>" +
        "<div class='mg-left-15 mg-top-10 default-multi-choice-option'>" +
        "<input type='radio' disabled />" +
        "<label class='mg-left-3 add-multichoice-option'>Add option</label>" +
        "</div>" +
        "<div class='mg-left-15 mg-top-10 default-paragraph'>" +
        "<input type='text' placeholder='Paragraph' disabled class='paragraph-input'>" +
        "</div>" +
        "</div>" +
        "<hr />" +
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<button class='btn btn-default btn-submit'>Submit</button>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<span class='glyphicon glyphicon-trash trash-can' aria-hidden='true'></span>" +
        "</div>" +
        "</div>" +
        "</div>";

    $(".blank-editing-panel").append(template);
})

//Dropdown change
$("body").on("change", "#option-dropdown", function () {
    dropDownValue = $(this).val();
    switch (dropDownValue) {
        case enumOptionType.Multichoice:
            $(".default-multi-choice-option").css("display", "block");
            $(".default-paragraph").css("display", "none");
            break;
        case enumOptionType.Paragraph:
            $(".options-placeholder").empty();
            $(".default-multi-choice-option").css("display", "none");
            $(".default-paragraph").css("display", "block");
            break;
        case enumOptionType.Checkboxes:
            //TODO checkboxes
            break;
        default:
            return;
    }
});

//Add option click
$("body").on("click", ".add-multichoice-option", function () {
    var getOptions = GetAddMcOptionTemplate();
    $(".options-placeholder").append(getOptions);
});

//Submit click
$("body").on("click", ".btn-submit", function () {

    debugger;
    var allOptions = "";
    var uniqueId = $(".btn-submit").closest(".question-editing-panel").attr("id");
    //TODO get with uniqueid using $this
    var question = "";
    var question = $("#" + uniqueId + space + ".text-area").val();

    //TODO get with uniqueid using $this
    var optionsEmptyCheck = $("#" + uniqueId + space + ".options-placeholder").is(":empty");

    if (question === undefined || question == null || (optionsEmptyCheck && dropDownValue === enumOptionType.Multichoice)) {
        return;
    }

    //Radio button / mulitchoice question
    if (dropDownValue === enumOptionType.Multichoice) {
        var radioBtnCount = $("#" + uniqueId + space + ".user-added-options input[type='radio']").length
        if (radioBtnCount != 0) {
            $("#" + uniqueId + space + ".user-added-options input[type = 'text']").each(function () {
                var inputVal = $(this).val();
                allOptions += GetUserAddedOptionTemplate(uniqueId, inputVal);
            });
        }
        $(".blank-baked-question-panel").append(GetBakedQuestionTemplate(question, dropDownValue, allOptions));
    }

    //Paragraph
    if (dropDownValue === enumOptionType.Paragraph) {
        $(".blank-baked-question-panel").append(GetBakedQuestionTemplate(question, dropDownValue, null));
    }

    $("#" + uniqueId).remove();



});


$("body").on("click", ".user-baked-question", function () {
    debugger;

    var hasEditingClass = $(this).hasClass("question-editing-panel");
    if (hasEditingClass) {
        return;
    }
    var panelId = $(this).attr("id");
    var optionType = $("#" + panelId + space + ".user-option-placeholder").attr("option-type");
    var question = $("#" + panelId + space + ".user-question").text();
    //Multichoice
    if (optionType === enumOptionType.Multichoice) {
        $("#" + panelId + space + "label").each(function () {
            alert($(this).text())
        })
    }

    //Paragraph
    if (optionType === enumOptionType.Paragraph) {

    }

    var readyTemplate = GetEditingPanel(panelId, optionType, question);

    $("#" + panelId).addClass("question-editing-panel");
    $("#" + panelId).empty();
    $("#" + panelId).append(readyTemplate);
    $("#option-dropdown option[value=" + optionType + "]").attr("selected", "selected");

});


function GetBakedQuestionTemplate(question, optionType, options) {
    var uniqueId = new Generator().rand;
    var bakedTemplate = "";
    //dropDownValue = optionType;
    if (optionType === enumOptionType.Multichoice) {
        bakedTemplate =
            "<div class='col-sm-7 user-baked-question' id=" + uniqueId + ">" +
            "<label class='user-question'>" + question + "</label>" +
            "<div class='user-option-placeholder' option-type=" + optionType + " >" +
            options +
            "</div>";
    }
    if (optionType === enumOptionType.Paragraph) {
        bakedTemplate =
            "<div class='col-sm-7 user-baked-question' id=" + uniqueId + ">" +
            "<label class='user-question'>" + question + "</label>" +
            "<div class='user-option-placeholder' option-type=" + optionType + " >" +
            "<input type='text' placeholder='Paragraph' disabled class='paragraph-input'>" +
            "</div>";
    }
    return bakedTemplate;
}

function GetUserAddedOptionTemplate(uniqueId, inputText) {
    var mcUserOptionTempate =
        "<div>" +
        "<input type='radio' name=" + uniqueId + "/>" +
        "<label class='mg-left-5'>" + inputText + "</label>" +
        "</div>"
    return mcUserOptionTempate;
}


function GetAddMcOptionTemplate() {
    var mcOptionTemplate =
        "<div class='user-added-options'>" +
        "<input type='radio' disabled />" +
        "<input type='text' class='multichoice-input mg-left-3 mg-top-10'>" +
        "</div>";
    return mcOptionTemplate;
}

function GetParagraphTemplate() {
    var paragraph = "<div class='mg-left-15 mg-top-10 default-paragraph'>" +
        "<input type='text' placeholder='Paragraph' disabled class='paragraph-input'>" +
        "</div>";
    return paragraph;
}



function GetEditingPanel(uniqueId, optionType, question) {

    var editingTemplate =
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<textarea placeholder='Question' class='text-area'>" + question + "</textarea>" +
        "</div>" +
        "<div class='select'>" +
        "<select name='slct' id='option-dropdown'>" +
        "<option value='1'>Multiple choice</option>" +
        "<option value='2'>Paragraph</option>" +
        "<option value='3'>Checkboxes</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        GetDynamicPlaceHolderOption(optionType) +
        "<hr />" +
        "<div class='row'>" +
        "<div class='col-sm-6'>" +
        "<button class='btn btn-default btn-submit'>Submit</button>" +
        "</div>" +
        "<div class='col-sm-6'>" +
        "<span class='glyphicon glyphicon-trash trash-can' aria-hidden='true'></span>" +
        "</div>" +
        "</div>";
        

    return editingTemplate;
}

function GetDynamicPlaceHolderOption(optionType) {

    var option = "";

    if (optionType === enumOptionType.Multichoice) {

    }

    if (optionType === enumOptionType.Paragraph) {
        option = "<div class='row mg-top-15 all-options-placeholder'>" +
            "<div class='mg-left-15 options-placeholder'></div>" +
            "<div class='mg-left-15 mg-top-10 default-multi-choice-option' style='display: none;'>" +
            "<input type='radio' disabled=''>" +
            "<label class='mg-left-3 add-multichoice-option'>Add option</label>" +
            "</div>" +
            "<div class='mg-left-15 mg-top-10 default-paragraph' style='display: block;'>" +
            "<input type='text' placeholder='Paragraph' disabled='' class='paragraph-input'>" +
            "</div>" +
            "</div>";
    }
    return option;
}