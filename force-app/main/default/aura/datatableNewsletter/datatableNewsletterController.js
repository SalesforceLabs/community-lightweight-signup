/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    init: function (cmp, event, helper) {
        
        var additionalcols = new Array();
        additionalcols.push({
            label: 'Action',
            type: 'button',
            typeAttributes: {
                label: {
                    fieldName: 'c25lws__ActionLabel__c'
                },
                title: 'Click to Edit',
                name: 'updateSubscription',
                iconName: 'utility:edit',
                class: 'btn_next'
            }
        });
        cmp.set("v.additionalcols", additionalcols);
        
        var dt = cmp.find("datatableFSC");
        dt.configure(additionalcols);
        
        var action = cmp.get("c.getMyData");
        action.setParams({
            "signupId" : cmp.get("v.signupId")
        });
        
        action.setCallback(this, function (res){
            var state = res.getState();
            if (state === "SUCCESS") {
                var records = res.getReturnValue();
                
                cmp.set("v.mydata", records);
            }  else if (state === "ERROR") {
                $A.log(res.getError());
                // eslint-disable-next-line
                $A.reportError("datatableNewsletter", res.getError());
            } //end if errors
        });
        $A.enqueueAction(action);
    },
    
    handleRowAction : function(cmp, event) {
        var action = event.getParam("action");
        var row = event.getParam("row");
        
        if (action.name === "updateSubscription") {
            cmp.set("v.refreshDataTable", true);
            cmp.set("v.refreshId", row.Id);
            
            var navigate = cmp.get("v.navigateFlow");
            navigate("NEXT");
        }
    }
})