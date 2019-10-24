@IsTest
public class datatableNewsletterCtlrTest
{
    @IsTest
    private static void testGetMyData()
    {
        String guid = GuidUtil.NewGuid();
        
        Signup__c s = new Signup__c(
            FirstName__c = 'TestFirst',
            LastName__c = 'TestLast',
            Email__c = 'test@example.com',
            UniqueKey__c = guid);
        
        insert s;
        
        Newsletter__c n = new Newsletter__c(
            Title__c = 'TestNewsletter');
        
        insert n;
        
        Newsletter_Subscription__c ns = new Newsletter_Subscription__c(
            Signup__c = s.Id,
            Newsletter__c = n.Id,
            Status__c = 'Active');
        
        insert ns;
        
        List<Newsletter_Subscription__c> subs = datatableNewsletterCtlr.getMyData(s.Id);
        
        System.assert(subs.size() > 0);
    }
}