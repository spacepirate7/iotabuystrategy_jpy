/**
 * Originally Created by Peter on 8/10/2017.
 * Modified for Yen by spacepirate7 on 8/12/2017
 */

var jpyPerUSD = null
var btcPerMIOTA = null
var ethPerMIOTA = null
var jpyPerBTC = null
var jpyPerETH = null

function priceChangedHandler(target, property, value, receiver) {
    target[property] = value
    updateTable()
    return true
}

const startingJPY = 10000

function updateTable() {
    $("#jpyPerUSD").text(jpyPerUSD)
    $("#jpyPerBTC").text(jpyPerBTC)
    $("#jpyPerETH").text(jpyPerETH)
    $("#btcPerMIOTA").text(btcPerMIOTA)
    $("#ethPerMIOTA").text(ethPerMIOTA)
	
	let jpyToUSD = startingJPY / jpyPerUSD
	/*document.getElementById('jpyToUSD').value=jpyToUSD*/
    let jpyToBTCToMIOTA = startingJPY / jpyPerBTC / btcPerMIOTA
	document.getElementById('jpyToBTCToMIOTA').value=jpyToBTCToMIOTA
    let jpyToETHToMIOTA = startingJPY / jpyPerETH / ethPerMIOTA
	document.getElementById('jpyToETHToMIOTA').value=jpyToETHToMIOTA

    let currencies = [
        {
            panelElement: $("#jpyToBTCToMIOTAPanel"),
            priceElement: $("#jpyToBTCToMIOTA")[0],
            price: jpyToBTCToMIOTA
        },
        {
            panelElement: $("#jpyToETHToMIOTAPanel"),
            priceElement: $("#jpyToETHToMIOTA")[0],
            price: jpyToETHToMIOTA
        }
    ]

    let bestValue = currencies.map(currency => currency.price).reduce((a, b) => Math.max(a, b))
    let indexOfBestValue = currencies.map(currency => currency.price).indexOf(bestValue)
    currencies.forEach(function(currency, index){
        currency.priceElement.innerText = currency.price
        if(index == indexOfBestValue) {
            currency.panelElement.attr("class", "panel panel-success")
        } else {
            currency.panelElement.attr("class", "panel panel-danger")
        }
    })
}

$(function(){
	$.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=JPY&tryConversion=false`, function(data) {
        jpyPerUSD = data.JPY
        updateTable()
    })
        .fail(function(data) {
            failure()
        });
    $.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=IOT&tsyms=BTC,ETH&tryConversion=false`, function(data) {
        btcPerMIOTA = data.BTC
        ethPerMIOTA = data.ETH
        updateTable()
    })
        .fail(function(data) {
            failure()
        });


    $.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=JPY&tryConversion=false`, function(data) {
        jpyPerBTC = data.JPY
        updateTable()
    })
        .fail(function(data) {
            failure()
        });

    $.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=JPY&tryConversion=false`, function(data) {
        jpyPerETH = data.JPY
        updateTable()
    })
        .fail(function(data) {
            failure()
        });
});