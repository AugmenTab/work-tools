var map;
var directionsService;
var directionsDisplay;
let markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 35.1005361, lng: -106.5710479},
		zoom: 15
	});
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	const searchButton = document.getElementById('searchButton');
	searchButton.addEventListener('click', handleSearchSubmit);
	const searchField = document.getElementById('search');
	searchField.addEventListener('keyup', function(event) {
		event.preventDefault();
		if(event.keyCode === 13) {
			handleSearchSubmit();
		}
	});
}

function handleSearchSubmit() {
	deleteMarkers();
	directionsDisplay.set('directions', null);
	let address = findAddress();
	var geocoder = new google.maps.Geocoder();
	geocodeAddress(geocoder, map, address);
}

function deleteMarkers() {
	clearMarkers();
	markers = [];
}

function clearMarkers() {
	setMapOnAll(null);
}

function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	}
}

function displayCustomerLocation(custLatLng) {
	var marker = new google.maps.Marker({
		position: custLatLng,
		map: map,
		title: 'Customer Location'
	});
	markers.push(marker);
}

function displayShopLocation(shop) {
	let shopLatLng = {lat: shop.lat, lng: shop.lng};
	var marker = new google.maps.Marker({
		position: shopLatLng,
		map: map,
		icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/chflag.png',
		title: shop.name
	});
	markers.push(marker);
}

function findAddress() {
	const search = document.getElementById('search');
	return search.value;
}

function calculateDistanceToShops(custAddress, glassShopAddresses) {
	let distMatrix = new google.maps.DistanceMatrixService();
	distMatrix.getDistanceMatrix(
		{
		  origins: [custAddress],
		  destinations: glassShopAddresses,
		  travelMode: 'DRIVING',
		  unitSystem: google.maps.UnitSystem.IMPERIAL
		},
		(response, status) => {
			if (status !== 'OK') {
				alert("Unable to complete request: " + status)
				return
			}

			let distances = response.rows[0].elements.map(el => el.distance.value);
			let distancesMi = distances.map(meterToMile);
			let mappedShops = mapShopsToDistance(distancesMi, glassShops);
			let shopsWithTotal = mappedShops.map(calculateShopFeeTotal);
			let cheapestShop = getCheapestShop(shopsWithTotal);
			displayDirections(custAddress, cheapestShop);
			displayShopHTML(cheapestShop);
		}
	);
}

function displayDirections(custAddress, cheapestShop) {
    var start = custAddress;
    var end = cheapestShop;
    var request = {
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
		if (status == 'OK') {
		    directionsDisplay.setDirections(result);
		}
    });
}


function getShopAddresses(shops) {
	return shops.map(shop => shop.address);
}

function meterToMile(meter) {
	return meter / 1609.344;
}

function getCheapestShop(shops) {
	let cheapestShop = shops[0];
	for(let i = 1; i < shops.length; i++) {
		if(cheapestShop.feeTotal > shops[i].feeTotal) {
			cheapestShop = shops[i];
		}
	}
	return cheapestShop;
}

function calculateShopFeeTotal(shop) {
	let shopWithTotal = {...shop};
	let feeTotal = shopWithTotal.fee * shopWithTotal.distance;
	shopWithTotal.feeTotal = feeTotal;
	return shopWithTotal;
}

function mapShopsToDistance(distances, shops) {
	let shopsAndDist = [];

	for (let i = 0; i < distances.length; i++) {
		let newShop = {...shops[i]};
		newShop.distance = distances[i];
		shopsAndDist.push(newShop);
	}
	return shopsAndDist;
}

function geocodeAddress(geocoder, map, address) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {			
			customerLatLng = results[0].geometry.location;
			map.setCenter(customerLatLng);

			let shopsAddresses = getShopAddresses(glassShops);
			calculateDistanceToShops(customerLatLng, shopsAddresses);
		} else {
			alert("Could not geocode address because:" + status);
		}
	})
}

function displayShopHTML(shop) {
	const displayArea = document.querySelector('#glass-shop-data');
	const html = `
		<div><strong>Name:</strong> ${shop.name}</div>
		<div><strong>Address:</strong> ${shop.addline1}</div>
		<div class="indent-2">${shop.addline2}</div>
		<div class="indent-2">${shop.city}, ${shop.state} ${shop.zip}</div>
		<br>
		<div><strong>Phone Number:</strong> ${shop.phone}</div>
		<div><strong>Email:</strong> ${shop.email}</div>
		<br>
		<div><strong>Distance:</strong> ${shop.distance.toFixed(1)} mi</div>
		<div><strong>Estimated Fee:</strong> $${shop.feeTotal.toFixed(2)}</div>
	`
	displayArea.innerHTML = html;
}