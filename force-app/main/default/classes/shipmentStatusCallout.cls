public class shipmentStatusCallout {
	
    /*
    NOTE: The endpoint for this callout is stored under shipmentStatusAPINamedCredential and 
    uses shipmentStatusAPIExternalCredential (currently set to no auth), 
    users will need the customerServiceRepresentative principal assigned to use the endpoint
    */

    @AuraEnabled(cacheable=true) 
    public static string getStatusByTrackingNumber( String trackingNumber ) {
        
        system.debug('trackingNumber input:' + trackingNumber);
        
        string statusResult = '';

        if(String.isBlank(trackingNumber)){
            return 'Invalid or Missing Tracking Number';
            //TODO: extend this to better validate trackingNumber values prior to API callout
        } else{
            HttpRequest req = new HttpRequest();
            req.setEndpoint('callout:shipmentStatusAPINamedCredential' + '?trackingNumber=' + trackingNumber);
            req.setMethod('GET');
            Http h = new Http();
            HttpResponse res = h.send(req);
            
            system.debug('Callout Response Status:' + res);
            
            if(res.getStatusCode() >= 200 && res.getStatusCode() < 300){
            statusResult = res.getBody()!=null ? res.getBody() : 'No Status Returned';
            }else {
                throw new AuraHandledException('Error fetching Status');
            }
        } 
        return statusResult;
        /*TODO: if requirement exists, extend logic to set statusResult on Shipment.Status field for automation/reporting. 
        Will neeed mapping of API Enums to field's picklist values.*/
    }
}