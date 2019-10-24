/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
	doInit : function(component, event, helper) {
        // Take all the parameters and pass them into the Flow, assumes all are strings
        var acceptedParamsComma = component.get("v.acceptedUrlParams");
        var urlParams = [];
		var query = location.search.substr(1);
        var result = {};
                
        //console.log("Looking for a key to add:");
        //console.log(acceptedParamsComma);
        var acptParams = acceptedParamsComma.split(",");
        
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            var i = {
                "name": item[0],
                "type": "String",
                "value": decodeURIComponent(item[1])
            };
            if (i.name !== "" && acptParams.includes(i.name)) {
                //console.log("Found a key to add");
				urlParams.push(i);
            }
        });
        
        var includeCurrUrl = component.get("v.includeCurrentUrl");
        if (includeCurrUrl) {
            var currenturl = location.href.replace(location.search, "");
            var i = {
                "name": "currenturl",
                "type": "String",
                "value": currenturl
            };
            urlParams.push(i);
        }
        
        component.set("v.urlParams", urlParams);
        
        // Find the component whose aura:id is "flowId"
        var flow = component.find("flowId");
        // In that component, start your flow. Reference the flow's Unique Name from config.
        var flowName = component.get("v.flowName");
        flow.startFlow(flowName, urlParams);
	}
})