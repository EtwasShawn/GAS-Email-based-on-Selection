//using the obtained settings to set up email info
function onOpen(e) {
   FormApp.getUi().createMenu('Authorizer').addItem('Authorize', 'authorize').addToUi();      
 }
 
//Easily authorize script to run from Form Editor interface
function authorize(){ 
	var respEmail = Session.getActiveUser().getEmail(); 
	MailApp.sendEmail(respEmail,"Form Authorizer", "Your form has now been authorized to send you emails"); 
}
 
function setSettings(e){
  
  var response = e.response; 
  var settings = getSettings();
  var emailSubject = settings[1][2];
  var emailMsg = settings[1][3];
  var formSchool = getResponse(response,"School");
  var formStudent = getResponse(response,"Student Name / ID");
  var emailAddr;
  var school;
  
  //loop through and grab the selected school from the Settings spreadsheet.
  for (i in settings){
    if (settings[i][0] === formSchool){      
      school = settings[i][0];
      emailAddr = settings[i][1];    
        } 
       
  }
 
	//build email and send to email send function
	emailMsg = emailMsg + 'n' + 'School: ' + formSchool +  'n' + 'Student: ' + formStudent;
	mailSendSimple(emailAddr,emailSubject,emailMsg);
 
 }
 
//function to find the selected School. 
function getResponse(response,formItem){ 
  var selected;  
  //loop through the form response to find the school 
  for (var i = 0; i < response.getItemResponses().length; i++){  
 if (formItem == response.getItemResponses()[i].getItem().getTitle()){
    selected = response.getItemResponses()[i].getResponse();       
   }  
  }
  return selected;
} 
 
 //grabbing general settings from spreadsheet sheet Settings
function getSettings() {
  var form = FormApp.getActiveForm();
  var ssID = form.getDestinationId();
  var ss = SpreadsheetApp.openById(ssID);
  var sheet = ss.getSheetByName("Settings");
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var range = sheet.getRange(1,1,lastRow,lastColumn);
  var values = range.getValues();
  return values;  
}
 
 
//function to send out mail
function mailSendSimple(emailAddr,emailSub, emailMsg){
  MailApp.sendEmail(emailAddr,emailSub, emailMsg); //{cc: ccUser}  
}