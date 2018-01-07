// yaw => left / right seeing
// roll => left / right tilt
// pitch => down / top


// function makeblob (dataURL) {
//     // function to make the data object from dataURL encoding, to be sent in ajax
//     var BASE64_MARKER = ';base64,';
//     if (dataURL.indexOf(BASE64_MARKER) == -1) {
//         var parts = dataURL.split(',');
//         var contentType = parts[0].split(':')[1];
//         var raw = decodeURIComponent(parts[1]);
//         return new Blob([raw], { type: contentType });
//     }
//     var parts = dataURL.split(BASE64_MARKER);
//     var contentType = parts[0].split(':')[1];
//     var raw = window.atob(parts[1]);
//     var rawLength = raw.length;
//
//     var uInt8Array = new Uint8Array(rawLength);
//
//     for (var i = 0; i < rawLength; ++i) {
//         uInt8Array[i] = raw.charCodeAt(i);
//     }
//     var temp= new Blob([uInt8Array], { type: contentType });
//     return temp;
// }
//
// function processImage(dataURL, timestamp, callback) {
//     // **********************************************
//     // *** Update or verify the following values. ***
//     // **********************************************
//
//     // Replace the subscriptionKey string value with your valid subscription key.
//     var subscriptionKey = "4a8cf0860f0340cba3ec2b2aa7b4cab5";
//
//     // Replace or verify the region.
//     //
//     // You must use the same region in your REST API call as you used to obtain your subscription keys.
//     // For example, if you obtained your subscription keys from the westus region, replace
//     // "westcentralus" in the URI below with "westus".
//     //
//     // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
//     // a free trial subscription key, you should not need to change this region.
//     var uriBase = "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect";
//
//     // Request parameters.
//     var params = {
//         "returnFaceId": "true",
//         "returnFaceLandmarks": "false",
//         "returnFaceAttributes": "headPose",
//     };
//
//     // Display the image.
//     var sourceImageUrl = document.getElementById("inputImage").value;
//     document.querySelector("#sourceImage").src = sourceImageUrl;
//
//     // Perform the REST API call.
//     $.ajax({
//         url: uriBase + "?" + $.param(params),
//
//         type: 'POST',
//         processData: false,
//         contentType: 'application/octet-stream',
//
//
//         // Request headers.
//         beforeSend: function(xhrObj){
//             // xhrObj.setRequestHeader("Content-Type","application/octet-stream");
//             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
//         },
//
//         data: makeblob(dataURL)
//     })
//
//     .done(function(data) {
//         var details;
//
//         if (data == null || data.length == 0) details = null;
//         else {
//             var faceAtt = data[0].faceAttributes;
//             // Error handling
//             if (faceAtt == null || !('headPose' in faceAtt)) {
//                 // we did not receive the required data
//                 details = null;
//             } else {
//                 details = faceAtt.headPose;
//             }
//         }
//         var obj = {
//             timestamp: timestamp,
//             data: details
//         }
//         callback(obj);
//     })
//
//     .fail(function(jqXHR, textStatus, errorThrown) {
//         var obj = {
//             timestamp: timestamp,
//             data: null // change this to actual error message if you want err to be sent
//         }
//         callback(obj);
//     });
// };


function processFaces(file, timestamp, callback) {
    // Use this function for getting the information of the face
    // Input: Image file && TimeStamp
    // Output: null
    //       | {
    //            timestamp: value,
    //            data: {
    //              yaw: value,
    //              roll: value,
    //              pitch: value
    //            }
    //      }
    //
    // Usage: processFace(file, timestamp, function(obj) {
    //                               console.log(obj); <= returned object
    //                          });
    var input=file.src;
    // var input = file.target;
    // console.log(input);
    console.log(file);
    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        processImage(dataURL, timestamp, callback);
    };
    // reader.readAsDataURL(input.files[0]);
    reader.readAsDataURL(input);
};