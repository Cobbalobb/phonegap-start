//SET VARIABLES
var electricity = 0;
var gas = 0;
var meat = 0;
var organic = 0;
var local = 0;
var compost = 0;
var total_clothes = 0;
var total_shopping = 0;
var total_electronics = 0;
var car = 0;
var train = 0;
var bus = 0;
var domestic_flights = 0;
var short_flights = 0;
var long_flights = 0;

//CALCULATOR VARIABLES 
//measurments all in tonnes
// Electricicity
var small_elec = 1.58;
var medium_elec = 2.53;
var large_elec = 3.69;
var green = 0.25; // Green electric provider

// Gas
var small_gas = 2.44;
var medium_gas = 3.65;
var large_gas = 5.48;

// Frequency of meat eating
var more_once = 0.7;
var daily = 0.4;
var few_week = 0.3;
var weekly = 0.2;
var less_frequently = 0.1;
var never = 0;

// Organic produce
var organic_always = 0;
var organic_regularly = 0.2;
var organic_sometimes = 0.5;
var organic_never = 0.7;

// Local produce
var local_always = 0;
var local_regularly = 0.2;
var local_sometimes = 0.3;
var local_never = 0.5;

// Composting
var compost_yes = 0;
var compost_no = 0.2;

// Unavoidable food and health
var food = 0.2;
var health = 1.1;

var clothes = 0.0053; //per £15/month
var electronics = 0.0024; //per £1/year
var shopping = 0.087; //per £1/week

//transport per 100 mile
var train = 0.0086; 
var bus = 0.0048;
var plane = 0.000276;
var petrol_small = 0.030166; 
var petrol_medium = 0.035666;
var petrol_large = 0.049333;
var diesel_small = 0.025166;
var diesel_medium = 0.031333;
var diesel_large = 0.04300;
var hybrid_medium = 0.021;
var hybrid_large = 0.037333;

// plane journeys in miles
var domestic_flight = 264;
var short_flight = 746;
var long_flight = 4350;

function submitCalculateForm() {

//var form = document.getElementById("calculateForm");
var form = $('form').serializeArray();
console.log(form);
var form_results = new Array();
for (var i = 0; i < form.length; i++) {
    form_results[form[i].name] = form[i].value;
    //console.log(form_results.house);
}
// var data = new FormData(form);
// console.log(data);
// alert(data.items.house);
// Set users values
// Gas and electrics
if(form_results.house != undefined){
	if(form_results.house == 'small'){
		electricity = small_elec;
		gas = small_gas;
	} else if(form_results.house == 'medium'){
		electricity = medium_elec;
		gas = medium_gas;
	} else {
		electricity = large_elec;
		gas = large_gas;
	}
}

// Meat consumption
if(form_results.meat != undefined){
	if(form_results.meat == '>1'){
	 meat = more_once;
	} else if(form_results.meat == 'daily'){
	 meat = daily;
	} else if(form_results.meat == 'few_times_a_week'){
	 meat = few_week;
	} else if(form_results.meat == 'weekly'){
	 meat = weekly;
	} else if(form_results.meat == 'less_frequently'){
	 meat = less_frequently;
	} else if(form_results.meat == 'never'){
	 meat = never;
	}
}

// Organic food
if(form_results.organic != undefined){
	if(form_results.organic == 'always'){
	 organic = organic_always;
	} else if(form_results.organic == 'regularly'){
	 organic = organic_regularly;
	} else if(form_results.organic == 'sometimes'){
	 organic = organic_sometimes;
	} else if(form_results.organic == 'never'){
	 organic = organic_never;
	}
}

// Local food
if(form_results.local != undefined){
	if(form_results.local == 'always'){
	 local = local_always;
	} else if(form_results.local == 'regularly'){
	 local = local_regularly;
	} else if(form_results.local == 'sometimes'){
	 local = local_sometimes;
	} else if(form_results.local == 'never'){
	 local = local_never;
	}
}

// Compost
if(form_results.compost != undefined){
	if (form_results.compost == 'yes'){
		compost = compost_yes;
	} else {
		compost = 0;
	}
}

// TRAVEL
// Car
if(form_results.car == 'yes'){
	if(form_results.engine != undefined){
		if (form_results.engine == 'petrol'){
		 if (form_results.car_size == 'small'){
		 	car = (petrol_small/100) * form_results.car_miles;
		 } else if (form_results.car_size == 'medium'){
		 	 car = (petrol_medium/100) * form_results.car_miles;
		 } else {
		 	 car = (petrol_large/100) * form_results.car_miles;
		 }
		} else if (form_results.engine == 'diesel'){
		 if (form_results.car_size == 'small'){
		 	car = (diesel_small/100) * form_results.car_miles;
		 } else if (form_results.car_size == 'medium'){
		 	car = (diesel_medium/100) * form_results.car_miles;
		 } else {
		 	car = (diesel_large/100) * form_results.car_miles;
		 }
		} else if (form_results.engine == 'hybrid'){
		 if (form_results.car_size == 'small'){
		 	car = (hybrid_medium/100) * form_results.car_miles;
		 } else if (form_results.car_size == 'medium'){
		 	car = (hybrid_medium/100) * form_results.car_miles;
		 } else {
		 	car = (hybrid_large/100) * form_results.car_miles;
		 }
		} else {
			car = 0;
		}
	}
}

// Train
train_total = (train/100) * form_results.train_miles;

// Bus
bus_total = (bus/100) * form_results.bus_miles;

// Plane
domestic_flights = (plane*domestic_flight) * form_results.domestic_flights;
short_flights = (plane*short_flight) * form_results.short_flights;
long_flights = (plane*long_flight) * form_results.long_flights;

// Others
total_clothes = clothes * form_results.clothes;
total_electronics = electronics * form_results.electronics;
total_shopping = shopping * form_results.other_shopping;

calculate();

function calculate(){
	//console.log(id);
	console.log(electricity);
	console.log(gas);
	console.log(meat);
	console.log(organic);
	console.log(local);
	console.log(compost);
	console.log(total_clothes);
	console.log(total_shopping);
	console.log(total_electronics);
	console.log(car);
	console.log(train);
	console.log(bus);
	console.log(domestic_flights);
	console.log(short_flights);
	console.log(long_flights);
	var total = electricity + gas + meat + organic + local + compost + total_clothes + total_electronics + total_shopping + car + train + bus + domestic_flights + short_flights + long_flights + food + health;
	console.log("Total: " +total);
	//alert(total);
    var id = localStorage.getItem("id");
    //alert(localStorage.getItem("id"));
    //alert("id:" + id);	
    //var id = 1;
    footprintToDatabase(id, form_results.house, form_results.meat, form_results.organic, form_results.local, form_results.compost, form_results.clothes, form_results.electronics, form_results.other_shopping, form_results.engine, form_results.car_miles, form_results.train_miles, form_results.bus_miles, form_results.domestic_flights, form_results.short_flights, form_results.long_flights, total, total);
    footprintToServerDatabase(id, form_results.house, form_results.meat, form_results.organic, form_results.local, form_results.compost, form_results.clothes, form_results.electronics, form_results.other_shopping, form_results.engine, form_results.car_miles, form_results.train_miles, form_results.bus_miles, form_results.domestic_flights, form_results.short_flights, form_results.long_flights, total);
    //directToHome();
}

}