// JavaScript source code
$(document).ready(function () {
    var apiKey = "3dThXC4gbm6HUYkBi8y4yfocYtoZwm43CM0cMJY22wEqL51eWo+T27comK3pKeLhexJn2qChvOtMBm/C5j8gNg==";
    $.support.cors = true;
    $("#getml").click(function () {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            processData: false,
            beforeSend: function (req) { req.setRequestHeader('Authorization', 'Bearer ' + apiKey) },
            url: "https://ussouthcentral.services.azureml.net/workspaces/a600625d21f640eb87bfb3aa92053508/services/01d83a413265431b9c3ad8835ecf267e/execute?api-version=2.0&details=true",
            data: '{"Inputs":{"input1":{"ColumnNames":["invID","Company","dfvc","rounds","totalInvest","teamRank"],"Values":[["0","value","0","0","0","0"],["0","value","0","0","0","0"]]}},"GlobalParameters":{}}'
        })
        .success(function (successData) { debugger; })
        .error(function (errData) { debugger; })
    });
});