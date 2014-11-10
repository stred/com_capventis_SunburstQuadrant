// CapVentis Sunburst Quadrant
// script.js - main function to establish the chart
 
function com_capventis_SunburstQuadrant_Done() {
    Qv.AddExtension("com_capventis_SunburstQuadrant",
        function() {
            
             // Load the CVL sunburst style sheet
             Qva.LoadCSS(Qva.Remote + "?public=only&name=Extensions/com_capventis_SunburstQuadrant/style.css");
             
             // assign the QlikView extension object to a local variable
             var _this = this;
             
             // Get the chart ID from the QlikView document - will be something like "CH2340091" or "CH01"
             var divName = _this.Layout.ObjectId.replace("Document\\", "").replace("Server\\", "");
             
             // Calculate the height and width that user has drawn the extension object
             var vw = _this.GetWidth();
             var vh = _this.GetHeight();
             
             // Set the inner html of the extension object to a div, including the chart id, that we can use in code
             _this.Element.innerHTML = '<div id="canvas'
                              + divName
                              + '" style="width:' + vw + 'px;'
                              + 'height:' + vh + 'px;'
                              + 'left: 0; position: absolute;'
                              + 'top: 0;z-index:999;"></div>';
             
             // Generate the hoverBox if it doesn't exist already
             // This will hold the popup text
             if ($('#hoverBox').length == 0)
                 $("body").append('<div class="arrowDown" id="hoverBox"><p></p></div>');
             
             // store the extension object to a window object so that it can be used by other functions
             window[divName] = _this;
             
             // call the drawChart function from the CVLsunburst.js script
             sbq_drawChart(divName);
             
             }, false);
}
function com_capventis_SunburstQuadrant_Init() {
    var files = [];
    files.push("Extensions/com_capventis_SunburstQuadrant/raphael-min.js");
    files.push("Extensions/com_capventis_SunburstQuadrant/com.capventis.SunburstQuadrant.QlikView.js");
    Qv.LoadExtensionScripts(files, com_capventis_SunburstQuadrant_Done);
}
com_capventis_SunburstQuadrant_Init();

