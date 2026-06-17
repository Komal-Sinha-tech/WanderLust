
           const map = L.map('map').setView([19.0760, 72.8774], 13);

          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

        navigator.geolocation.watchPosition(success,error);

        let marker,circle,zoomed;


        function success (position){
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          if(marker){
            map.removeLayer(marker);
            map.removeLayer(circle);
          }

         marker = L.marker([lat,lng,]).addTo(map);
         circle =  L.circle([lat,lng,],{ radius : accuracy}).addTo(map);
         
         if(!zoomed){
         zoomed = map.fitBounds(circle.getBounds());
         }
          
         map.setView([lat,lng]);
        }

        function error(err){
          if(err.code === 1){
            alert("Please allow your geolocation access");
          }else{
            alert("Cannot get current location");
          }
        }

        