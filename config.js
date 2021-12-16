/*** USE THIS FILE TO SET OPTIONS ***/

setParams({
    graphFile : "fondation.gexf",
        /*
            The GEXF file to show ! -- can be overriden by adding
            a hash to the document location, e.g. index.html#celegans.gexf
        */
	showEdges : true,
        /*
            Default state of the "show edges" button
        */
    useLens : false,
        /*
            Default state of the "use lens" button
        */
    zoomLevel : 0,
        /*
            Default zoom level. At zoom = 0, the graph should fill a 800x700px zone
         */
    curvedEdges : true,
        /*
            False for curved edges, true for straight edges
            this setting can't be changed from the User Interface
        */
    edgeWidthFactor : 1.5,
        /*
            Change this parameter for wider or narrower edges
            this setting can't be changed from the User Interface
        */
    minEdgeWidth : 1,
    maxEdgeWidth : 50,
    textDisplayThreshold: 9,
    nodeSizeFactor : 1,
        /*
            Change this parameter for smaller or larger nodes
           this setting can't be changed from the User Interface
        */
    replaceUrls : false,
        /*
            Enable the replacement of Urls by Hyperlinks
            this setting can't be changed from the User Interface
        */
    showEdgeWeight : false,
        /*
            Show the weight of edges in the list
            this setting can't be changed from the User Interface
        */
    showEdgeLabel : false,
    sortNodeAttributes: true,
        /*
            Alphabetically sort node attributes
         */
    showId : false,
        /*
            Show the id of the node in the list
            this setting can't be changed from the User Interface
        */
    showEdgeArrow : true,
        /*
            Show the edge arrows when the edge is directed
            this setting can't be changed from the User Interface
        */
    language: false,
	hiddenAttributes: ['id', 'Type', 'Photo'],
	formattedLabels: {
		'Name': 'Laureates',
		'N3': 'Subdomains',
		'N2': 'Domains'
	},
	imageRoot: "icons/thumbnails/", 
	edgeThicknessScale: 10
        /*
            Set to an ISO language code to switch the interface to that language.
            Available languages are:
            - German [de]
            - English [en]
            - French [fr]
            - Spanish [es]
            - Italian [it]
            - Finnish [fi]
            - Turkish [tr]
            - Greek [el]
            - Dutch [nl]
            If set to false, the language will be that of the user's browser.
        */
});
