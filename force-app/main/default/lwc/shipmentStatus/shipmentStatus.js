import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getStatusByTrackingNumber from '@salesforce/apex/shipmentStatusCallout.getStatusByTrackingNumber';

const FIELDS = ['Shipment.ShipmentNumber','Shipment.TrackingNumber'];

export default class shipmentStatus extends LightningElement {
    isLoading = false;
    noTrackingNumber = false;
    @api recordId;
    shipmentNumber;
    trackingNumber;
    shipmentStatus;
    error;

    @wire(getRecord, {recordId: '$recordId', fields: FIELDS})  
    shipmentObj({data, error}){
        this.isLoading = true;
        if(data){
            this.shipmentNumber = data.fields.ShipmentNumber.value;
            this.trackingNumber = data.fields.TrackingNumber.value;
            this.noTrackingNumber =  this.trackingNumber === null;
            //this.isLoading = false;
            console.log('Shipment Object: ' + JSON.stringify(data));
        } else if(error){
            this.error='Error fetching Shipment Data. Please notify the support team.';
            this.isLoading = false;
            console.log(this.error + 'Full Error: ' + JSON.stringify(error));
        }
    }

    @wire(getStatusByTrackingNumber, {trackingNumber: '$trackingNumber'})
    shipmentStatusResult({data, error}){
        this.isLoading = true;
        if(data){
            this.shipmentStatus = data;
            this.isLoading = false;
            console.log('Shipment Status Result: ' + this.shipmentStatus); 
        }else if(error){
            this.error = 'Error fetching Shipment Status Result. Please notify the support team.';
            this.isLoading = false;
            console.log(this.error + 'Full Error: ' + JSON.stringify(error));
        }
    }  

}