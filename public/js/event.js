// Franco @TODO To add this js to the Event page instead of Template

var step=1;
const createAddEditEventModal = (id) =>{

    let xhr = new XMLHttpRequest();
    if(id){
        xhr.open('GET', `index.php?action=addEditEvent&eventId=${id}`);
    }else{
        xhr.open('GET', `index.php?action=addEditEvent`);
    }

    xhr.onload = function () {
        if(xhr.status == 200){
            var polyLineArray = Array();
            let addEditEventModal = new Modal(xhr.responseText);
            let addEditEventObj = {

            }
            addEditEventModal.generate(addEditEventObj,allowCancel=false);

            //Create event listener for the buttons inside the modal form
        
            var eventPreviousBut =  document.querySelector("#eventPreviousButton");
            if (eventPreviousBut) {
                eventPreviousBut.addEventListener("click", function(){movePreviousStep(id)});  
            }
            var eventNextBut =  document.querySelector("#eventNextButton");
            if (eventNextBut) {
                eventNextBut.addEventListener("click", function(){moveNextStep(id)});  
            }
            var eventForm =  document.querySelector("#formAddEditEvent");

            if (eventForm) {
                eventForm.addEventListener("submit", function(e){

                    //if user did not choose any points on map, use previously chosen points on map
                    var eventItineraryEle  = document.getElementById("itinerary");
                    if(polyLineArray.length > 0){
                        eventItineraryEle.value = JSON.stringify(polyLineArray);
                    }
                    
                    //check that all the inputs have been entered
                    var missingField='';
                    var eventNameEle = document.getElementById("eventName2");
                    var eventGuestLimitEle = document.getElementById("eventGuestLimit");
                    var eventDateEle = document.getElementById("eventDate");
                    var eventTimeEle = document.getElementById("eventTime");
                    var eventExpiryDateEle = document.getElementById("eventExpiryDate");
                    var eventExpiryTimeEle = document.getElementById("eventExpiryTime");
                    var eventDescriptionEle = document.getElementById("eventDescription");

                    if(eventNameEle.value.length == 0){
                        missingField += " Name of event,";

                    }
                    if(eventGuestLimitEle.value.length == 0){
                        missingField += " Guest limit,";
                    }
                    if (eventDateEle.value.length == 0){
                        missingField += " Event date,";

                    }
                    if (eventTimeEle.value.length == 0){
                        missingField += " Event time,";
                    }
                    if (eventExpiryDateEle.value.length == 0){
                        missingField += " Last date,";
                    }
                    if (eventExpiryTimeEle.value.length == 0){
                        missingField += " Last time,";
                    }
                    if (eventDescriptionEle.value.length == 0){
                        missingField += " Event description,";
                    }

                    if (missingField.length > 0){
                        var errorMsgEle = document.getElementById("errorMsg");
                        var msg = "The following has missing values:" + missingField;
                        errorMsgEle.innerHTML = msg;
                        errorMsgEle.style.color = 'red';

                        //Prevent the submitting of the form
                        e.preventDefault();
                    }
                });  
            }


            startMap(polyLineArray);
            displayPicture();
            showEventStep("eventStep1", id);
            recommendExpiryDateTime();

            
        }
    }
     xhr.send(null);
}

// TODO to change the location of the add Event button
var addEventBut =  document.querySelector("#addEvent");
if (addEventBut) {
    addEventBut.addEventListener("click", createAddEditEventModal);  
}


function moveNextStep(id){
    step +=1;
    let currentStep="eventStep"+step;
    showEventStep(currentStep,id);
}

function movePreviousStep(id){
    step -=1;
    let currentStep="eventStep"+step;
    showEventStep(currentStep,id);
}
function showEventStep(currentStep, id=null){
    switch (currentStep){
        case "eventStep1":
            document.getElementById("eventStep1").style.display = "block";
            document.getElementById("eventStep2").style.display = "none";
            document.getElementById("eventStep3").style.display = "none";
            document.getElementById("eventStep4").style.display = "none";
            document.getElementById("eventPreviousButton").style.display = "none";
            document.getElementById("eventNextButton").style.display = "block";
            // document.getElementById("eventSubmitButton").style.display = "none";
            document.getElementById("lblStepIndicator").innerHTML="Step 1 of 4";
            document.getElementById("stepIndicator").value = "25";
            // document.getElementById("eventSpaceMiddle").style.display = "block";
            //Force step to be 1 on first page
            if(step!==1) step=1;

            if(id){
                document.getElementById("eventSubmitButton").style.display = "block";
                document.getElementById("eventSpaceRight").style.width = "58%";
                document.getElementById("eventSpaceRight").style.justifyContent = "space-between";
            }else{
                document.getElementById("eventSubmitButton").style.display = "none";
                document.getElementById("eventSpaceRight").style.justifyContent = "flex-end";
            }
      
            break;
            
        case "eventStep2":
            document.getElementById("eventStep1").style.display = "none";
            document.getElementById("eventStep2").style.display = "block";
            document.getElementById("eventStep3").style.display = "none";
            document.getElementById("eventStep4").style.display = "none";
            document.getElementById("eventPreviousButton").style.display = "block";
            document.getElementById("eventNextButton").style.display = "block";
            // document.getElementById("eventSubmitButton").style.display = "none";
            document.getElementById("lblStepIndicator").innerHTML="Step 2 of 4";
            document.getElementById("stepIndicator").value = "50";

            if(id){
                document.getElementById("eventSubmitButton").style.display = "block";
                document.getElementById("eventSpaceRight").style.width = "58%";
                document.getElementById("eventSpaceRight").style.justifyContent = "space-between";

            }else{
                document.getElementById("eventSubmitButton").style.display = "none";
                document.getElementById("eventSpaceRight").style.justifyContent = "flex-end";
            }
            break;
 
        case "eventStep3":
            document.getElementById("eventStep1").style.display = "none";
            document.getElementById("eventStep2").style.display = "none";
            document.getElementById("eventStep3").style.display = "block";
            document.getElementById("eventStep4").style.display = "none";
            document.getElementById("eventPreviousButton").style.display = "block";
            document.getElementById("eventNextButton").style.display = "block";
            
            document.getElementById("lblStepIndicator").innerHTML="Step 3 of 4";
            document.getElementById("stepIndicator").value = "75";
            if(id){
                document.getElementById("eventSubmitButton").style.display = "block";
                document.getElementById("eventSpaceRight").style.width = "58%";
                document.getElementById("eventSpaceRight").style.justifyContent = "space-between";
            }else{
                document.getElementById("eventSubmitButton").style.display = "none";
                document.getElementById("eventSpaceRight").style.justifyContent = "flex-end";
            }
            break;
        case "eventStep4":
            document.getElementById("eventStep1").style.display = "none";
            document.getElementById("eventStep2").style.display = "none";
            document.getElementById("eventStep3").style.display = "none";
            document.getElementById("eventStep4").style.display = "block";
            document.getElementById("eventPreviousButton").style.display = "block";
            document.getElementById("eventNextButton").style.display = "none";
            document.getElementById("eventSubmitButton").style.display = "block";
            document.getElementById("lblStepIndicator").innerHTML="Step 4 of 4";
            document.getElementById("stepIndicator").value = "100";
            document.getElementById("eventSpaceRight").style.justifyContent = "flex-end";

            break;
        default:
            break;
    }
}

function recommendExpiryDateTime(){
    let eventDateEle = document.getElementById("eventDate");
    let eventTimeEle = document.getElementById("eventTime");
    eventDateEle.addEventListener('change', function(e){
        // If there are no value in expiry date then recommend a date for 
        addRecommendedDateTime();
    });
    eventTimeEle.addEventListener('change', function(e){
        addRecommendedDateTime();
    });


}

function addRecommendedDateTime(){
    
    let eventDateEle = document.getElementById("eventDate");
    let eventTimeEle = document.getElementById("eventTime");
    let expiryDateEle = document.getElementById("eventExpiryDate");
    let expiryTimeEle = document.getElementById("eventExpiryTime");
    let expiryDate = expiryDateEle.value;
    let expiryTime = expiryTimeEle.value;
    let eventDate = eventDateEle.value;
    let eventTime = eventTimeEle.value;
    let currentDate = new Date(eventDate+" "+eventTime);

    if(eventDate && eventTime && !(expiryDate) && !(expiryTime)){
        let recommendedDateTime = addMinutes(currentDate,-1440);
        let dd=String(recommendedDateTime.getDate()).padStart(2,'0');
        let mm = String(recommendedDateTime.getMonth()+1).padStart(2,'0');
        let yyyy = recommendedDateTime.getFullYear();
        let hh = String(recommendedDateTime.getHours()).padStart(2,'0');
        let min = String(recommendedDateTime.getMinutes()).padStart(2,'0');;
        
        let recommendedDate = yyyy + '-' + mm +'-'+ dd;
        let recommendedTime = hh+":"+min;
         expiryDateEle.value = recommendedDate;
         expiryTimeEle.value = recommendedTime;
    }

}
function addMinutes(date, minutes){
    return new Date(date.getTime()+minutes*60000);
}



var startEndHandler = function startEnd(mouseEvent){
    // 클릭한 위도, 경도 정보를 가져옵니다   
    var latlng = mouseEvent.latLng; 
    var markerClick = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        map: map,
        position: latlng 
    }); 

    //지도에 마커를 표시합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : markerInfo,
    });
    infowindow.open(map, markerClick);
    bounds2.extend(latlng);
    map.setBounds(bounds2);
    polyLineArray.push(latlng);
    var destination = document.createElement("div");
    var dash = document.createElement("div");
    dash.textContent = "************";
    destination.textContent = "StopBy Point "+stopByCounter
    locationList.appendChild(destination);
    locationList.appendChild(dash);
    markerClickArray.push(latlng);
    markerInfo = "Stop by point";
    stopByCounter++;
    if(markerClickArray.length==3){
        kakao.maps.event.removeListener(map, 'click', startEndHandler);
    }
    
}

function startMap(polyLineArray){
    var stopByCounter = 1;
    var locationList = document.getElementById("locationList2");
    var bounds2 = new kakao.maps.LatLngBounds();
    // var polyLineArray = Array();
    var mapContainer = document.getElementById('map2'); // 지도를 표시할 div 

    var mapOption = { 
            center: new kakao.maps.LatLng(37.530767, 126.971937), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            
    var zoomControl = new kakao.maps.ZoomControl();
    // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


    // kakao.maps.event.addListener(map, 'click', startEndHandler);
    kakao.maps.event.addListener(map, 'click', function(mouseEvent){
        // 클릭한 위도, 경도 정보를 가져옵니다   
        var latlng = mouseEvent.latLng; 
        var markerClick = new kakao.maps.Marker({ 
            // 지도 중심좌표에 마커를 생성합니다 
            map: map,
            position: latlng 
        }); 

        //지도에 마커를 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content : markerInfo,
        });
        infowindow.open(map, markerClick);
        bounds2.extend(latlng);
        map.setBounds(bounds2);
        polyLineArray.push(latlng);
        var destination = document.createElement("div");
        var dash = document.createElement("div");
        dash.textContent = "************";
        destination.textContent = "StopBy Point "+stopByCounter
        locationList.appendChild(destination);
        locationList.appendChild(dash);
        markerClickArray.push(latlng);
        markerInfo = "Stop by point";
        stopByCounter++;
        if(markerClickArray.length==3){
            kakao.maps.event.removeListener(map, 'click', startEndHandler);
        }


    });
   

    //클릭이벤트를 생성합니다 
    var markerClickArray = Array();
    var markerInfo = "Stop by point";
    //creation of the maps
    var locationData = [
        ['더블유코딩','서울 용산구 한강대로40길 39-13 1층', '<div class="infoWindow" style="padding:5px;">Wcoding: <div class="infoText"></div> </div>','<div id="roadview" style="width:100;height:50;"></div>'+'<div class="addButton">AddButton</div>'+'where Pet Venture was born!<div><a href="https://map.kakao.com/link/to/'+'Wcoding,' + '37.530750,' + '126.971979'+'">Directions</a></div>','<div>add</div>'],
        ['르시앙블랑','서울 용산구 신흥로2길', '<div class="infoWindow" style="padding:5px;">Le Chien Blanc: <div class="infoText"></div> </div>','<div id="roadview" style="width:100;height:50;"></div>'+'<div class="addButton">AddButton</div>'+'The greatest bakery in the world!<div><a href="https://map.kakao.com/link/to/'+'Le Chien Blanc,' + '37.530750,' + '126.971979'+'">Directions</a></div>','<div>add</div>'],
        ['서울스테이션어썸스테이션','서울 용산구 한강대로 405', '<div class="infoWindow" style="padding:5px;">Seoul Station: <div class="infoText"></div> </div>','<div id="roadview" style="width:100;height:50;"></div>'+'<div class="addButton">AddButton</div>'+'for no reason...<div><a href="https://map.kakao.com/link/to/'+'Seoul Station,' + '37.530750,' + '126.971979'+'">Directions</a></div>','<div>add</div>']
    ]

    let listVendor = Array();
    var addButtonMap = 'click';
    let counter = 1;
    for(let i=0; i<locationData.length; i++){
            let myLocation = locationData[i];
            let containerVendor = document.getElementById("vendorList2");
            var vendor = document.createElement("div");
            vendor.className="vendorElement";
            vendor.textContent = "* "+locationData[i][0];
            listVendor.push(containerVendor.appendChild(vendor));
            // vendor.addEventListener("click", function(){
                
                // getLatLonFromAddress(myLocation);
                // Expanded START
                var geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(myLocation[1], function (result, status) {
                    // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        var marker = new kakao.maps.Marker({
                                        position: coords,
                                        map: map,
                                        clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                                    });
                        // var location4 = location[4];
                        var infowindow = new kakao.maps.InfoWindow({
                                            content :"<"+counter+">"+myLocation[2],
                                        });
                        // location4.addEventListener('click', function(){
                        //     polyLineArray.push(coords);
                        // })
                        infowindow.open(map, marker);  
                        // polyLineArray.push(coords);
                        bounds2.extend(coords);
                        map.setBounds(bounds2);
                        let titles = document.getElementsByClassName("infoWindow");
                        titles[titles.length-1].addEventListener('click', function(e){
                            let modalMapObj = { }
                            let infoView = new Modal(location[3]);
                            infoView.generate(modalMapObj, allowCancel=false);
                            var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
                            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
                            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
                            roadviewClient.getNearestPanoId(coords, 50, function(panoId) {
                                roadview.setPanoId(panoId, coords); //panoId와 중심좌표를 통해 로드뷰 실행
                            });
                            var addButton = document.getElementsByClassName("addButton");
                            addButton[0].addEventListener('click', function(){
                                polyLineArray.push(coords);
                                var destination = document.createElement("div");
                                destination.textContent = myLocation[0];
                                var dash = document.createElement("div");
                                dash.textContent = "************";
                                locationList.appendChild(destination);
                                locationList.appendChild(dash);
                                console.log(polyLineArray);
                            })
                        });
                          
                        counter++;
            
                        
                    } else{
                        // alert("We could not find the address you provided");
                    }
                });


                //Expanded END
                console.log("coutner qfter", counter);
            // });  
                // getLatLonFromAddress(myLocation);
        // });  
    }


    var distanceButton = document.getElementById("calculateDistance2");
    var distanceDiv = document.getElementById("distanceDiv2");
    var distanceLength = document.createElement("span");
    
    distanceButton.addEventListener('click', function(){
        console.log(polyLineArray);
        var polyline = new kakao.maps.Polyline({
            map: map,
            path: polyLineArray,
            strokeWeight: 2,
            strokeColor: 'red',
            strokeOpacity: 0.6,
            strokeStyle: 'shortdot'
        });
        polyline.setMap(map);
        var polyLength = polyline.getLength(); 
        distanceLength.textContent = "The total travel distance for this journey is "+Math.trunc(polyLength)+" m.";
        distanceDiv.appendChild(distanceLength); 
    
        })

}

function displayPicture(){

    var picInput = document.getElementById('eventPicture');
    var image = document.getElementById('eventImage');
    if(picInput.value){
        image.src = "./private/event/"+picInput.value;
    }

    document.getElementById('file').onchange = function (e) {
         
         image.src = URL.createObjectURL(e.target.files[0]);

    };
}
