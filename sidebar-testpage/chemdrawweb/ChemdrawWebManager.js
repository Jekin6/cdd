if(!window.perkinelmer) {window.perkinelmer = {};}

chemdrawLoaded = function() {
	perkinelmer.ChemdrawWebManager.chemdrawLoaded();
};

perkinelmer.ChemdrawWebManager = {

		loaded: false,
		pending: [],
		
		/**
		 * Request parameters:
		 * 
		 * 	id: The id of the element in the DOM tree the tool will be attached to.
		 *  element: A DOM element the tool will be attached to.
		 *  viewonly: Determines if the user can interact with the tool or not.
		 *  config: The configuration to apply before attaching the tool. 
		 *  configUrl: The location of a configuration file to load before attaching the tool.
		 *  callback: A callback that will be called when the tool is attached. It will be
		 *             called with a reference to the new tool object.
		 */
		attach: function(request) {
			if(this.loaded) {this.fulfillRequest(request);}
			else {this.pending.push(request);}	
		},
		
   		chemdrawLoaded: function() {
   			this.loaded = true;
   			while(this.pending.length > 0) {
   				var request = this.pending.pop();
   				this.fulfillRequest(request);
   			}
   	   	},
   	   		
   	   	fulfillRequest: function(request) {
   	   		var params = this.toParameters(request);
   	   		var drawingTool = new perkinelmer.ChemdrawWeb(params);
   	   		
   	   		if (request.config) {
   	   			drawingTool.loadConfig(request.config);
   	   			this.attachTool(drawingTool, request);
   	   		} else if(request.configUrl) {
   	   			var self = this;
   	   			drawingTool.loadConfigFromUrl(request.configUrl, function() {
   	   				self.attachTool(drawingTool, request);
   	   			});
   	   		} else {
   	   			this.attachTool(drawingTool, request);
   	   		}
   	   	},
   	   	
   	   	attachTool: function(drawingTool, request) {
   	   		if(request.element) {drawingTool.attachToElement(request.element);}
	   		else if(request.id) {drawingTool.attach(request.id);}
   	   		
   	   		if(request.callback) {request.callback(drawingTool);}
   	   	},
   	   	
   	   	toParameters: function(request) {
   	   		var params = new perkinelmer.ChemdrawWebParams();
   	   		if(request.viewonly) {params.viewOnly(request.viewonly);}
   	   		if(window.chemdrawweb_config) {params.setConfig(window.chemdrawweb_config);}
   	   		
   	   		return params;
   	   	}
};