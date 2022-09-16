function getBathValue() {
    const uiBathrooms = document.getElementsByName("uiBathrooms");
    for(const i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    const uiBHK = document.getElementsByName("uiBHK");
    for(const i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice(val) {
    let input = document.getElementById("uiSqft");
    if(val){input.value = val}
    const sqft = parseFloat(document.getElementById("uiSqft").value);
    const bhk = getBHKValue();
    const bathrooms = getBathValue();
    const location = document.getElementById("uiLocations");
    const estPrice = document.getElementById("uiEstimatedPrice");

    if(sqft>800&&sqft<15000){
      const url = "/api/predict_home_price";
    
      $.post(url, {
          total_sqft: sqft,
          bhk: bhk,
          bath: bathrooms,
          location: location.value
      },function(data, status) {
          console.log(data.estimated_price);
          estPrice.innerHTML = "<h2>&#8377; &nbsp;<span>" + data.estimated_price.toString() + " Lakh</span></h2>";
          console.log(status);
      });
    }else{
     const correctedVal =  prompt("Please Enter valid Area in Square Feet. \nArea cannot be less than 800Sq.Ft or greater than 15000Sq. Ft. \n\nPlease enter a valid figure below");
     if(correctedVal){
       onClickedEstimatePrice(correctedVal);
     }
    }
  
  }
  
  function onPageLoad() {
    const url = "/api/get_location_names";
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            const locations = data.locations;
            const uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(const i in locations) {
                const opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;