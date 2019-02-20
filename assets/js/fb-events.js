// need to make sure to load the facebook javascript sdk: https://developers.facebook.com/docs/javascript/quickstart


FB.api(
    "/870962136249359/events",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        
        const renderedEvents = document.createDocumentFragment();

        // loop through the events
        response.events.forEach((item) => {

          // need to create a function to manipulate the event data (particularly the time) and pass it to the createSingleEvent function
          // need to pass the manipulated data to this function
          renderedEvents.appendChild( createSingleEvent() );

        });

        // get the dom node that we'll inject the rendered events into (you'll need to make/adjust this id in your html)
        const eventsContainer = document.getElementById('#upcoming-events');

        // inject the rendered events into the dom 
        getElementById.appendChild(renderedEvents);

      } // make sure to handle errors
    }
);

/*

  argument is an object:

  .url      = string (url to the event)
  .img      = string (url to the event image)
  .title    = string (title of the event)
  .dateTime = object
    .weekDay   = string
    .month     = string
    .day       = string
    .year      = string
    .startTime = string
    .endTime   = string

*/
function createSingleEvent(info) {

  const eventSkeleton = document.createDocumentFragment();
  const divWrapper = eventSkeleton.createElement('div');
  divWrapper.setAttribute('class', 'col-4');

  const anchor = divWrapper.createElement('a');
  anchor.setAttribute('class', 'text-decoration-none');
  anchor.setAtribute('href', info.url);

  const innerDivWrapper = anchor.createElement('div');

  const img = innerDivWrapper.createElement('img');
  img.setAttribute('class', 'img-fluid mb-3');
  img.setAttribute('src', info.img);

  const h3 = innerDivWrapper.createElement('h3');
  // we will need to do some fancy date formatting here, probably with moment.js
  h3.innerHTML = `${info.dateTime.weekDay} ${info.dateTime.month} ${info.dateTime.day}, ${info.dateTime.year}<br>${info.dateTime.startTime} – ${info.dateTime.endTime}`;

  const h2 = innerDivWrapper.createElement('h2');
  h2.innterText = '';

  return eventSkeleton;

}


// <div class="col-4">
//     <a class="text-decoration-none" href="#">
//         <div>
//             <img class="img-fluid mb-3" src="../assets/images/event-placeholder.png">
//             <h3>Tues Jan 23, 2O19<br>1O:3O AM – 1:3O PM</h3>
//             <h2>42nd Annual Ski Freeze 2O19</h2>
//         </div>
//     </a>
// </div>