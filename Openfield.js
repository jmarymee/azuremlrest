// JavaScript source code
$(document).ready(function () {
        var apiKey = "FvxxfBlKswpfFuu3stOx8EnFHX2+WKq2yjTv429rBhQ+np+U9cd64TNHE9QqDPUtQBml0jv+0qsvz+ZNfuHOKA==";
        var columns = ['VisitsLast7', 'VisitDurationLast7', 'VisitsLast30', 'VisitDurationLast30', 'AgeFirstVisitDay','NbVisitPerQuarter', 'NbVisitPerMonth', 'NbVisitPerWeek', 'VisitBetween_21_and_60mn', 'VisitMonday', 'VisitTuesday'];
        var option1 = ['3','15','12','20','20','12','10','10','12','12','5'];
        var option2 = ['0','5','5','3','4','5','1','1','0','4','2'];
        
        $.support.cors = true;
        
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
            $('#cbcompdump').val(JSON.stringify(mlvalues));
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

            // var bcAPIKey = 'Yn8lrILAhuy1Zx2X5tYnhdCeNq35rgUrACPT+PIKLTFAe//0c8Fo6icApHTeBs4Vt+7ehSgx1/jnVOFzqhjltg==';
            // $("#getmlbcpredict").click(function () {
            //     var oData = packagecall('test');
            //     $.ajax({
            //         type: "POST",
            //         contentType: "application/json",
            //         dataType: "json",
            //         processData: false,
            //         beforeSend: function (req) { req.setRequestHeader('Authorization', 'Bearer ' + bcAPIKey) },
            //         url: "https://ussouthcentral.services.azureml.net/workspaces/1e9859bf8e4d4861abf92463f2b0554a/services/3fd0a0f0bde04b8a88e2460d9533cf2f/execute?api-version=2.0&details=true",
            //         data: '{ "Inputs": { "input1": { "ColumnNames": [ "Column 0", "permalink", "name", "category_list", "market", "funding_total_usd", "status", "country_code", "state_code", "region", "city", "funding_rounds", "founded_quarter", "founded_year", "first_funding_at", "last_funding_at", "angel_raised_sum", "angel_num_investors", "angel_min_funded_year", "angel_max_funded_year", "A_raised_sum", "A_num_investors", "A_min_funded_year", "A_max_funded_year", "min_acquired", "max_acquired", "sum_acquired", "min_acquired_year", "max_acquired_year", "angel_vs_acquired", "A_vs_acquired", "good_exit" ], "Values": [ [ "1", "/organization/0xdata", "H2O.ai", "[Analytics]", "Analytics", "10600000", "operating", "USA", "CA", "SF Bay Area", "San Francisco", "2", "2011-Q1", "2011", "2013-01-03T00:00:00", "2014-07-19T00:00:00", "NA", "NA", "NA", "NA", "35600000", "4", "2014", "2014", "NA", "NA", "NA", "NA", "NA", "NA", "NA", false ], [ "1", "/organization/0xdata", "H2O.ai", "[Analytics]", "Analytics", "10600000", "operating", "USA", "CA", "SF Bay Area", "San Francisco", "2", "2011-Q1", "2011", "2013-01-03T00:00:00", "2014-07-19T00:00:00", "NA", "NA", "NA", "NA", "35600000", "4", "2014", "2014", "NA", "NA", "NA", "NA", "NA", "NA", "NA", false ] ] } }, "GlobalParameters": {} }'
            //     })
            //     .success(function (successData) { debugger; })
            //     .error(function (errData) { debugger; })
            // });
