/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
public with sharing class datatableNewsletterCtlr {
    @AuraEnabled
    public static List<Newsletter_Subscription__c> getMyData(String signupId)
    {
        List<Newsletter_Subscription__c> results = null;
        
        if (Schema.sObjectType.Newsletter_Subscription__c.fields.Newsletter_Title__c.isAccessible()
            && Schema.sObjectType.Newsletter_Subscription__c.fields.Status__c.isAccessible()
            && Schema.sObjectType.Newsletter_Subscription__c.fields.ActionLabel__c.isAccessible())
        {
            results = [SELECT Id, Name, Newsletter_Title__c, Status__c, ActionLabel__c
                       FROM Newsletter_Subscription__c
                       WHERE Signup__c = :signupId
                       ORDER BY Newsletter_Title__c];
        }
        
        return results;
    }
    
}