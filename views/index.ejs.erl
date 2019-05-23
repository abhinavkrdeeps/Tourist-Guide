<% if(place.photos===undefined) {%>
  <img src="img/hotel2.jpeg" />
<%} else {%>
  <img  class= "card-img-top" src="<%= imgUrl+place.photos[0].photo_reference+apiKey %>" class="image-rounded" height="200" width="200">
<%}%>
