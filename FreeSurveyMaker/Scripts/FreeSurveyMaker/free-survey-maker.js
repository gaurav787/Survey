var space = " ";

function Generator() {
    Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
    Generator.prototype.getId = function () {
        return this.rand++;
    };
};

//Dropdown change
$("body").on("change", "#option-dropdown", function () {

    var dropDownValue = $(this).val();
    switch (dropDownValue) {
        case "1":
            $(".default-multi-choice-option").css("display", "block");
            $(".default-paragraph").css("display", "none");
            break;
        case "2":
            $(".options-placeholder").empty();
            $(".default-multi-choice-option").css("display", "none");
            $(".default-paragraph").css("display", "block");
            break;
        case "3":
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

    //TODO get with uniqueid using $this
    var question = $("#UniqueId .text-area").val();

    //TODO get with uniqueid using $this
    var optionsEmptyCheck = $("#UniqueId .options-placeholder").is(":empty");

    if (question === undefined || question == null || optionsEmptyCheck) {
        return;
    }

    var radioBtnCount = $("#UniqueId .user-added-options input[type='radio']").length
    if (radioBtnCount != 0) {
        var uniqueId = new Generator().rand;

        $("#UniqueId .user-added-options input[type='text']").each(function () {
            var inputVal = $(this).val();
            allOptions += GetUserAddedOptionTemplate(uniqueId, inputVal);
        });
    }

    $(".blank-baked-question-panel").append(GetBakedQuestionTemplate(question, allOptions));

});

function GetBakedQuestionTemplate(question, options) {
    var bakedTemplate =
        "<div class='col-sm-7 user-baked-question'>" +
        "<label class='user-question'>" + question + "</label>" +
        "<div class='user-option-placeholder'>" +
        options +
        "</div>"
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