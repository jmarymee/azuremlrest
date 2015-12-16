// JavaScript source code
$(document).ready(function () {
        var apiKey = "FvxxfBlKswpfFuu3stOx8EnFHX2+WKq2yjTv429rBhQ+np+U9cd64TNHE9QqDPUtQBml0jv+0qsvz+ZNfuHOKA==";
        var columns = ['VisitsLast7', 'VisitDurationLast7', 'VisitsLast30', 'VisitDurationLast30', 'AgeFirstVisitDay','NbVisitPerQuarter', 'NbVisitPerMonth', 'NbVisitPerWeek', 'VisitBetween_21_and_60mn', 'VisitMonday', 'VisitTuesday'];
        var option1 = ['3','15','12','20','20','12','10','10','12','12','5'];
        var option2 = ['0','5','5','3','4','5','1','1','0','4','2'];
        var option3 = ['0','0','0','0','0','0','0','0','0','0','0'];
        
        $.support.cors = true;
        
        //This prototype sets up an object that can emit a properly formatted Azure ML call
        function MLCall(colsArray)
        {
            this.columns = colsArray;
            this.vals1 = [];
            this.vals2 = [];
            this.GetMLObj = function () { return { 'Inputs' : { 'input1' : { 'ColumnNames':this.columns, 'Values': [ this.vals1, this.vals2 ]  } }, 'GlobalParameters': {} }; };
            this.init = function () { 
                for(var loop=0; loop<this.columns.length; loop++)
                {
                    this.vals2.push('0');
                }
            };
        }

    
        //used to populate the data required for this ML REST call
        function createObj(option) {
            
            var ml = new MLCall(columns);
            ml.init();
            
            switch(option)
            {
                case '1':
                    ml.vals1 = option1;
                    break;
                case '2':
                    ml.vals1 = option2;
                    break;
                    
                case '3':
                    ml.vals1 = option3;
                    break;
                
                default:
                    ml.val1 = option1;
                    break;
            }
                        
            var thing = ml.GetMLObj();               
            
            return thing;
    }
    
    $("#getml").click(function () {
        var opt = $('#myselect').val();
        var dataforcall = createObj(opt);
        var datastring = JSON.stringify(dataforcall);
        
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            processData: false,
            beforeSend: function (req) { req.setRequestHeader('Authorization', 'Bearer ' + apiKey) },
            url: "https://asiasoutheast.services.azureml.net/workspaces/e5fedc52e630461cb2ccb69bec93b57a/services/abac8f9453294dc7babda631bff2ceb9/execute?api-version=2.0&details=true",
            data: datastring
        })
        .success(function (successData) { 
            //debugger; 
            var mlvalues = successData.Results.output1.value.Values[0];
            var columns = successData.Results.output1.value.ColumnNames;
            $('#cbcompdump').val(JSON.stringify(mlvalues));
            $('#mlfieldlist').val(JSON.stringify(columns));
            })
        .error(function (errData) { 
            //debugger; 
             $('#cbcompdump').val(JSON.stringify(errData));
            })
    });
    
    $("#getcb").click(function () {
        var cbname = $('#cbname').val();
        if (cbname == '') { return; }
        $.ajax({
            type: "GET",
            accepts: '*/*',
            url: "https://api.crunchbase.com/v/3/organizations/"+cbname+"?user_key=aaa39318c1303f9827a049a01501dd71"
        })
        .success(function (successData) {
            //debugger;
            $('#cbcompdump').val(JSON.stringify(successData));
        })
        .error(function (errData) { debugger; })
        });

    $("#getcomps").click(function () {
        $.ajax({
            type: "GET",
            accepts: '*/*',
            url: "https://api.crunchbase.com/v/3/organizations?name=cloudflare&&&&user_key=aaa39318c1303f9827a049a01501dd71"
        })
        .success(function (successData) { debugger; })
        .error(function (errData) { debugger; })
    });

});