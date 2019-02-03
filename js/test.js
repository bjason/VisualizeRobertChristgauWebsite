///////////////////////////////////////////////////////////////////////////////
// Title:           LGBT Civil Rights History
// Source Files:    d3.v3.min.js (Data Driven Documents JavaScript library V3),
//					jquery.min.v1.9.1.js, topojson.js, queue.min.js, index.html, 
//                  style.css, map.js, timeline.js, trulia.js, & chart.js				
//
// Author:          Erin Hamilton
// Author:          Rashauna Mead
// Author:          Vanessa Knoppke-Wetzel
//
// Last Updated:    December 16, 2013
//
// Description:     Main JS code for LGBT rights map. Calls all other js files.
//                  Page visualizes the changing positive and negative legislation
//                  passed by states over the past 50 years
//                   
// Credits:         Many code examples helped build this visualization (thank you!):
//////////////////////////// 80 columns wide //////////////////////////////////

/** Global Variables */
var indexArray = ["Adoption", "Employment", "HateCrime", "Hospital", "Housing", "Marriage"];
var indexSelected = indexArray[5];
var Index; //global Index.json variable.
var timestamp = 51; //2018. The start year for years array. Used for timer and iterations.
var onHover; //have to set this to variable different depending on browser for .on events
var outHover; //have to set this to variable different depending on browser for .on events
var isIE;

//year to view on load	
var year = years[timestamp];
// var rankList;

/**
 * Called by window onload at bottom of script.
 */
function initialize() {
    $("#stop").hide(); //onload, hide the stop button.
    //if browser is IE, must use mouseenter/leave for hover events, all other browsers use mouseover/mouseout.
    isIE = getIsIE();
    if (isIE) {
        onHover = 'mouseenter';
        outHover = 'mouseleave';
    } else {
        onHover = 'mouseover';
        outHover = 'mouseout';
    }
    fetchData();
}

/**
 * Fetches the JSON object and loads it asynchronously for use.
 * Queue waits until the json files are completely loaded and then calls 
 * the function in await to start everything else
 */
function fetchData() {
    queue()
        .defer(d3.json, "data/Index.json")
        .defer(d3.json, "data/usa.json")
        .await(ready);
}

/**
 *	Once JSON data is loaded, use this function to call other functions
 *
 * @error: any errors that occur from queue
 * @_Index: the Index.json main object
 * @usa: the usa.json topojson for the map
 */
function ready(error, _Index, usa) {
    Index = _Index;
    createGrid(Index); //trulia.js
    updateLegend(indexSelected);
    sequence(year);
}

// JavaScript Document

/**
 * Updates the legend above the matrix with the currently selected Index
 */
function updateLegend(indexSelected) {
    var indexText = indexSelected;
    if (indexSelected === indexArray[2]) {
        indexText = "Hate Crimes";
    } else if (indexSelected === indexArray[3]) {
        indexText = "Hospital Visition";
    }
    $('#indexL').html(indexText).css('font-weight', 'bold');

}

/**
 * This bit of code makes the infowindow move in front of other objects, like the legend.
 */
function moveToFront() {
    this.parentNode.appendChild(this);
}

d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};


/**
 *Function of switch statements to display a description for the lawcodes.
 *
 * @code: the couple letter lawcodes that come fron Index.json
 */
function lawCodeLabel(code) {

    switch (code) {
        case "SPY":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt."
            break;
        case "SPYSSCN":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt, but same-sex couples cannot do so."
            break;
        case "SPYSCCY":
            return "Any (single) unmarried adult, husband and wife, or same sex-couple can petition to adopt."
            break;
        case "SPYSSPY":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt. A same-sex partner can also petition to adopt their partner's child."
            break;
        case "SPYSSPN":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt. A same-sex partner cannot petition to adopt their partner's child."
            break;
        case "SSCLR":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt, but same-sex couples can only petition to adopt in certain juristictions."
            break;
        case "YSSPLR":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt, but same-sex partners can only petition to adopt their partner's child in certain juristictions."
            break;
        case "YYSSPLR":
            return "Any (single) unmarried adult, husband and wife, or same-sex couple can petition to adopt, but same-sex partners can only petition to adopt their partner's child in certain juristictions."
            break;
        case "YYY":
            return "Any (single) unmarried adult, husband and wife, same-sex couple, or same-sex partner petition to adopt."
            break;
        case "SPYNN":
            return "Any (single) unmarried adult, or husband and wife, can petition to adopt, but same-sex couples and same-sex partners cannot."
            break;
            /*Employment*/
        case "SOP":
            return "Sexual orientation employment protection exists in this state."
            break;
        case "SOPGIP":
            return "There is gender identity and sexual orientation employment protection in this state."
            break;
            /*Hate Crimes*/
        case "SO":
            return "Laws protect sexual orientation against hate crimes in this state."
            break;
            // case"GI": 
            // return "Laws protect gender identity against hate crimes in this state."
            // break;
        case "SOGI":
            return "Laws protect sexual orientation and gender identity aganst hate crimes in this state."
            break;
        case "NHCL":
            return "There are currently no laws for protection against hate crimes in this state."
            break;
            /*Hospital Visitation*/
        case "HLI":
            return "Hospital visitation rights extended to same-sex couples through marriage or relationship recognition laws."
            break;
        case "HLR":
            return "Hospital visitation rights extended to same-sex couples through provision as part of limited relationship recognition law."
            break;
        case "HLS":
            return "Hospital visitation rights extended through a designated visitor statute."
            break;
        case "HCA":
            return "Hospital visitation rights extended to a designated healthcare agent by law."
            break;
            /*Housing*/
        case "BSO":
            return "This state legally bans housing discrimination against sexual orientation."
            break;
        case "BID":
            return "This state legally bans housing discrimination against only gender identity/expression."
            break;
        case "BB":
            return "This state legally bans housing discrimination against sexual orientation discrimination and gender identity/expression."
            break;
            /*Marriage*/
        case "ML":
            return "Same-sex marriage is legal in this state."
            break;
        case "CUL":
            return "Civil unions are legal in this state."
            break;
        case "DPL":
            return "Domestic partnerships are legal in this state."
            break;
        case "LBCUL":
            return "There is a legislative ban on same-sex marriage, but civil unions are legal in this state."
            break;
        case "CBCUL":
            return "There is a constitutional ban on same-sex marriage, but civil unions are legal in this state."
            break;
        case "LBDPL":
            return "There is a legislative ban on same-sex marriage, but domestic partnerships are legal."
            break;
        case "CBDPL":
            return "There is a constitutional ban on same-sex marriage, but domestic partnerships are legal."
            break;
        case "NL":
            return "There are currently no court rulings, so the laws regarding same-sex marriage are ambiguous."
            break;
        case "NEB":
            return "There is no explicit ban on same-sex marriage, but rights have been denied by court ruling."
            break;
        case "LBM":
            return "There is a legislative ban on same-sex marriage."
            break;
        case "LBO":
            return "There is a legislative ban on same-sex marriage and other LGBT relationship recognition."
            break;
        case "CBM":
            return "There is a constitutional ban on same-sex marriage."
            break;
        case "CBO":
            return "There is a constitutional ban on same-sex marriage and other LGBT relationship recognitions."
            break;
        case "LBCBO":
            return "There are both legislative and constitutional bans on all LGBT relationship recognitions."
            break;
        default:
            return "There are currently no court ruling in regards to LGBT rights, so the laws are ambiguous.";
    };
}

/**
 * This makes the infolabel move along with the mouse.
 */
function moveLabel() {

    var x = d3.event.clientX + 20;
    var y = d3.event.clientY - 5;

    var mug = d3.select(".infolabel")
        .style("left", x + "px")
        .style("top", y + "px");

}

/**
 * Detects if a browser is Internet Explorer and returns true or false.
 */
function getIsIE() {
    return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
}


/**
 * Load the JS code after page has loaded. Calls initialize function at top.
 */

$(document).ready(initialize());