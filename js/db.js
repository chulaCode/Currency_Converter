
if (!window.indexedDB) {
    window.alert("Your browser doesn't support IndexedDB.");
}
// Let us open our database
const request = window.indexedDB.open(currency, 4);

request.onerror = function(event) {
  // Do something with request.errorCode!
  alert(`Database Error:   ${event.target.errorCode}`);
};
let db;
request.onsuccess = function(event) {
  // Do something with request.result!
  db = event.target.result;
};

// This event is only implemented in recent browsers   
request.onupgradeneeded = function(event) { 
		
	  	// Save the IDBDatabase interface 
	  	db = event.target.result;
	  	// Create an objectStore for this database
	  	let objectStore = db.createObjectStore(converter, { keyPath: "id" });
	  	
	  	objectStore.createIndex("id", "id", { unique: true });

	  	objectStore.transaction.oncomplete = function(event) {
	  		// Store values in the newly created objectStore.
	  		var currenciesObjectStore = db.transaction(converter, "readwrite").objectStore(converter);
              fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`)
              .then(res => res.json()).then(json => {
                //to caluclate the initial Outputed result
                console.log(json);
                let currencies = json;
                const curs = currencies.results;
                for (const key in curs) {
                  const objs =curs[key];
                  currenciesObjectStore.add(objs);
                }
            }).catch( (error) => {
                console.log(error);
            });
        };
      console.log('after transaction');
};