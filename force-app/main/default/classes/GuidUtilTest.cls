@IsTest
public class GuidUtilTest
{
    @isTest
    private static void GuidIsV4()
    {
        Pattern p = Pattern.compile('[\\w]{8}-[\\w]{4}-4[\\w]{3}-[89ab][\\w]{3}-[\\w]{12}');
        for(Integer x = 0; x < 100; x++)
        {
            Matcher m = p.matcher(GuidUtil.NewGuid());
            System.assert(m.matches() == true);
        }
    }
    
    @isTest
    private static void InvocableMethodVersion()
    {
        Pattern p = Pattern.compile('[\\w]{8}-[\\w]{4}-4[\\w]{3}-[89ab][\\w]{3}-[\\w]{12}');
        List<Id> sampleId = new List<Id> {'a0254000002TN1pAAG'};
        for(Integer x = 0; x < 100; x++)
        {
            List<String> newguids = GuidUtil.Generate(sampleId);
            for (String singleguid : newguids)
            {
                Matcher m = p.matcher(singleguid);
                System.assert(m.matches() == true);
            }
        }
    }
}