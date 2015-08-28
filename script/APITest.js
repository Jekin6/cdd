APITest = {		
	attach: function(tool, id) {
		window.drawingtool = tool;
		this.tool = tool;
		this.elem = document.getElementById(id);

		this.createBtn("Clear", "CDW_Clear", tool, this.clearTest);
		this.createBtn("Is Blank", "CDW_IsBlank", tool, this.isBlankStructureTest);
		this.createBtn("Get Errors", "CDW_GetErrors", tool, this.getErrors);
		this.createBtn("Get Version", "CDW_GetVer", tool, this.getVersionTest);
		
		this.createBtn("Load Config", "CDW_LoadConfig", tool, this.loadConfig);
		this.createBtn("Load Config URL", "CDW_LoadRemoteConfig", tool, this.loadConfigFromUrl);
		this.createBtn("Toggle ViewOnly", "CDW_ViewOnly", tool, this.toggleViewOnly);
		this.createBtn("Toggle Dev Logs", "CDW_DevLog", tool, this.toggleDevLog);
		
		this.createBtn("Get CDXML", "CDW_GetCDXML", tool, this.getCDXMLTest);
		this.createBtn("Load CDXML", "CDW_LoadCDXML", tool, this.loadCDXMLTest);
		this.createBtn("Get Image", "CDW_GetImg", tool, this.getImgURLTest);
		this.createBtn("Get InChI", "CDW_InChI", tool, this.getInChITest);
		
		this.createBtn("Get InChIKey", "CDW_GetInChIKey", tool, this.getInChIKeyTest);
		this.createBtn("Get SMILES", "CDW_GetSMILES", tool, this.getSMILESTest);
		this.createBtn("Get MOL", "CDW_GetMOL", tool, this.getMOLTest);
		this.createBtn("Get RXN", "CDW_GetRXN", tool, this.getRXNTest);
		this.createBtn("Get Properties", "CDW_GetProperties", tool, this.getPropertiesTest);
		
		this.createBtn("Add Reactant", "CDW_AddReactant", tool, this.addReactant);
		this.createBtn("Add Product", "CDW_AddProduct", tool, this.addProduct);
		this.createBtn("Add Reagent", "CDW_Reagent", tool, this.addReagent);
		this.createBtn("Label Reactions", "CDW_LabelReactions", tool, this.labelReactions);

		this.createBtn("Mark as Saved", "CDW_Reagent", tool, this.markAsSaved);
		this.createBtn("Is Saved", "CDW_Reagent", tool, this.isSavedTest);
		
		this.createBtn("Fit to Container", "CDW_FitToContainer", tool, this.fitToContainer);
		this.createBtn("Record Inputs", "CDW_RecordUserInputs", tool, this.recordUserInputs);
		this.createBtn("Get Input Logs", "CDW_GetInputLogs", tool, this.getInputLogs);
		this.createBtn("Get Perf Data", "CDW_GetPerfData", tool, this.getPerfData);
		
		this.createBtn("Fragments Info", "CDW_GetFragmentsInfo", tool, this.getFragmentsInfo);
	},
	
	fitToContainer: function(e) {
		var tool = e.target.tool;
		tool.fitToContainer();
	},
	
	recordUserInputs: function(e) {
		var tool = e.target.tool;
		tool.enableUserInputLogging(1000);
	},
	
	getInputLogs: function(e) {
		var tool = e.target.tool;
   		var logs = tool.getUserInputLogs();
   		var newWindow = window.open("UserInputLogs");
   		newWindow.document.write("<textarea style='height: 100%;width: 100%;'>" + logs + "</textarea>");
	},
	
	getPerfData: function(e) {
		var tool = e.target.tool;
   		var perfData = tool.getPerformanceData();
   		var newWindow = window.open("Performance Data");
   		newWindow.document.write("<textarea style='height: 100%;width: 100%;'>" + perfData + "</textarea>");
	},
	
	resetInputLogs: function(e) {
		var tool = e.target.tool;
   		tool.resetUserInputLogs();
	},
	
	toggleDevLog: function(e) {
		var tool = e.target.tool;
		tool.toggleDevLog();
	},
		
	getCDXMLTest: function(e) {
		var tool = e.target.tool;
   		var cdxml = tool.getCDXML();
   		var newWindow = window.open("");
   		newWindow.document.write("<textarea style='height: 100%;width: 100%;'>" + cdxml + "</textarea>");
   	},
   		
   	loadCDXMLTest: function(e) {
   		var tool = e.target.tool;
   		tool.loadCDXMLQuery(function(cdxml) {
   			tool.loadCDXML(cdxml);
   		});
   	},
   	
   	getImgURLTest: function(e) {
   		var tool = e.target.tool;
   		var url = tool.getImgUrl();
   		var newWindow = window.open("");
   		newWindow.document.write("<img src='" + url + "'/>");
   	},
   	
   	getVersionTest: function(e) {
   		var tool = e.target.tool;
   		var version = tool.getVersion();
   		alert("The version is: " + version);
   	},
   	
   	getInChITest: function(e) {
   		var tool = e.target.tool;
   		if(this.isBlankStructure(e)){
   			alert("Drawing board is empty.");
   			return;
   		}
   		tool.getInChI(function(inchiStr, error) {
   			if(inchiStr) {APITest.showInPopupWindow("InChI",inchiStr,350,200);}
   			else {alert(error);}
   		});
   	},
   	
   	getInChIKeyTest: function(e) {
   		var tool = e.target.tool;
   		if(this.isBlankStructure(e)){
   			alert("Drawing board is empty.");
   			return;
   		}
   		tool.getInChIKey(function(inchiStr, error) {
   			if(inchiStr) {APITest.showInPopupWindow("InChIKey",inchiStr,350,200);}
   			else {alert(error);}
   		});
   	},
   	
   	getSMILESTest: function(e) {
   		var tool = e.target.tool;
   		if(this.isBlankStructure(e)){
   			alert("Drawing board is empty.");
   			return;
   		}
   		tool.getSMILES(function(smilesStr, error) {
   			if(smilesStr) {APITest.showInPopupWindow("SMILES", smilesStr,350,200);}
   			else {alert(error);}
   		});
   	},
   	
   	getMOLTest: function(e) {
   		var tool = e.target.tool;
   		if(this.isBlankStructure(e)){
   			alert("Drawing board is empty.");
   			return;
   		}
   		tool.getMOL(function(molStr, error) {
   			if(molStr) {APITest.showInPopupWindow("Molfile", molStr, 600,400);}
   			else {alert(error);}
   		});
   	},
   	
   	getRXNTest: function(e) {
   		var tool = e.target.tool;
   		if(this.isBlankStructure(e)){
   			alert("Drawing board is empty.");
   			return;
   		}
   		tool.getRXN(function(rxnStr, error) {
   			if(rxnStr) {APITest.showInPopupWindow("RXN File", rxnStr, 600,400);}
   			else {alert(error);}
   		});
   	},
   	
   	getPropertiesTest: function(e) {
   		var tool = e.target.tool;
   		if(this.isBlankStructure(e)){
   			alert("Drawing board is empty.");
   			return;
   		}
   		tool.getProperties(function(propStr, error) {
   			if(propStr) {APITest.showInPopupWindow("Properties File", propStr, 600, 400);}
   			else {alert(error);}
   		});
   	},
   	
   	clearTest: function(e) {
   		var tool = e.target.tool;
   		tool.clear();
   	},
   	
   	isBlankStructure: function(e){
   		var tool = e.target.tool;
   		var isBlank = tool.isBlankStructure();
   		if( typeof(isBlank) == "boolean" ) {
   			return isBlank;
   		}else{
   			return "true" == isBlank.toString();
   		}
   	},
   	
   	isBlankStructureTest: function(e) {
   		var tool = e.target.tool;
   		var isBlank = tool.isBlankStructure();
   		alert("Structure is blank: " + isBlank);
   	},
   	
   	loadConfig: function(e) {
   		var tool = e.target.tool;
   		var config = window.prompt("Config");   		
   		tool.loadConfig($.parseJSON(config));   		
   	},
   	
   	loadConfigFromUrl: function(e) {
   		var tool = e.target.tool;
   		var configUrl = window.prompt("Config URL");   	
   		tool.loadConfigFromUrl(configUrl, function() {
   			alert(configUrl + " loaded");
   		});
   	},
   	
   	toggleViewOnly: function(e) {
   		var tool = e.target.tool;
   		if(tool.viewOnly) {
   			tool.viewOnly = false;
   			tool.setViewOnly(false);
   		} else {
   			tool.viewOnly = true;
   			tool.setViewOnly(true);
   		}
   	},
   	
   	getErrors: function(e) {
   		var tool = e.target.tool;
   		
   		var errors = tool.getErrors();
   		var errorsStr = "Errors:";
   		for(var i = 0;i < errors.length;i++) {
   			errorsStr += "\n" + errors[i];
   		}
   		
   		alert(errorsStr);
   	},
   	
   	labelReactions: function(e) {
   		var tool = e.target.tool;
   		tool.labelReactions();
   	},
   	
   	addReactant: function(e) {
   		var tool = e.target.tool;
   		tool.loadCDXMLQuery(function(cdxml) {
   			tool.addReactant(cdxml);
   		});
   	},
   	
   	addProduct: function(e) {
   		var tool = e.target.tool;
   		tool.loadCDXMLQuery(function(cdxml) {
   			tool.addProduct(cdxml);
   		});
   	},
   	
   	addReagent: function(e) {
   		var tool = e.target.tool;
   		tool.loadCDXMLQuery(function(cdxml) {
   			tool.addReagent(cdxml);
   		});
   	},
   	
   	markAsSaved: function(e) {
   	    var tool = e.target.tool;
   	    tool.markAsSaved();
   	},

   	isSavedTest: function(e) {
   	    var tool = e.target.tool;
   	    alert("Is saved (no change since last marking): " + tool.isSaved());
   	},
   	
   	createBtn: function(text, id, tool, onclick) {
   		var btn = document.createElement("input");
   		btn.type = "button";
   		btn.id = id;
   		btn.value = text;
   		btn.tool = tool;
   		btn.onclick = onclick.bind(this);
   		
   		this.elem.appendChild(btn);
   	},
   	
   	showInPopupWindow: function(title,content,w,h){
 	    var left = (screen.width - w) / 2;
	    var top = (screen.height - h) / 4; 
	    var features = "resizable=yes,width=" + w + ", height=" + h + ", top=" + top + ", left=" + left;
    	var htmlContent = "<html><head><title>" + title +" from Chem Draw Web"
    	                + "</title></head><body><pre>" + content +"</pre></body></html>";
	    var win = window.open("", "_blank", features);
	    win.document.write(htmlContent);
	    win.document.close();
   	},
   	
   	getFragmentsInfo : function(e) {
		var tool = e.target.tool;
		var result = tool.getFragmentsInfo();
		elementsData = result;
		window.open("elements_info_test.html");
	}
};
