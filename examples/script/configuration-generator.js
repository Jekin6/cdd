var ConfigGeneration = (function(argument) {
  // body...

  function isAPIAvailable() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      return true;
    } else {
      // source: File API availability - http://caniuse.com/#feat=fileapi
      // source: <output> availability - http://html5doctor.com/the-output-element/
      document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
      // 6.0 File API & 13.0 <output>
      document.writeln(' - Google Chrome: 13.0 or later<br />');
      // 3.6 File API & 6.0 <output>
      document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
      // 10.0 File API & 10.0 <output>
      document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
      // ? File API & 5.1 <output>
      document.writeln(' - Safari: Not supported<br />');
      // ? File API & 9.2 <output>
      document.writeln(' - Opera: Not supported');
      return false;
    }
  }

  function handleFileSelect(evt) {

    if (isAPIAvailable()) {
      var files = evt.target.files; // FileList object
      var file = files[0];

      // read the file metadata
      var output = '';
      output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
      output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
      output += ' - FileSize: ' + file.size + ' bytes<br />\n';
      output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

      // post the results
      $('#contents').html(output);

      // read the file contents
      displayConfig(file, "#generated_json");
    }
  }

  function displayConfig(file, elId) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      var jsonConfig = event.target.result;
      //var data = $.csv.toArrays(csv).reverse(); 
      try {
        JSON.parse(jsonConfig);
      } catch (e) {
        alert('Custom config file is invalid! ');
        $(elId).text("");
        return;
      }

      $(elId).text(jsonConfig);
      //$('#contents').html(html);
    };

    reader.onerror = function() {
      alert('Unable to read ' + file.fileName);
    };
  }

  function bindFeatures(el) {
    var htmlFeatures = "";
    if (configurations && configurations.features) {
      for (var feature in configurations.features) {
        htmlFeatures += '<li><input type="checkbox" checked onclick="ConfigGeneration.onFeatureClick(this);" value="' + configurations.features[feature] + '" />' + configurations.features[feature] + '</li>';

      }
    }
    $(el).append(htmlFeatures);
  }

  function bindButtons(el) {
    var htmlButtons = "";
    var btnLable = "";
    if (configurations && configurations.buttons) {
      for (var i = 0; i < configurations.buttons.length; i += 1) {
        btnLable = configurations.buttons[i];
        htmlButtons += '<li><input id="layout_' + configurations.buttons[i] + '" type="checkbox" checked value="' +
          configurations.buttons[i] + '"><label for="layout_' + configurations.buttons[i] + '">' + configurations.buttons[i] + '</label></li>';
      }
    }
    $(el).append(htmlButtons);
  }

  function onFeatureClick(evt) {
    //alert(evt.target.value + evt.target.checked);  
    if (!evt.checked) {
      //cur_disabled_features.push(evt.value);
      togleButtonsByFeature(evt.value, false);
    } else {
      togleButtonsByFeature(evt.value, true);
    }
  }

  function togleButtonsByFeature(featureName, isEnabled) {

    $(".connectedSortable").children("li").each(function(index, el) {

      var btnVal = $(el).children("input").val();

      for (var obj in configurations.mappings) {
        if (configurations.mappings[obj].hasOwnProperty(featureName)) {
          if (configurations.mappings[obj][featureName].length !== 0 && $.inArray(btnVal, configurations.mappings[obj][featureName]) != -1) {
            //$(this).remove();
            if (!isEnabled) {
              $(el).children("input").parent().attr("title", "To make this option checkable, please enable feature '" + featureName + "' first!");
              $(el).children("input").prop("checked", false).attr("disabled", "disabled");
            } else {
              $(el).children("input").parent().removeAttr("title");
              $(el).children("input").prop("checked", true).removeAttr("disabled");
            }

          }
        }
      }
    });
  }

  function togleButtonsByGroup(orientation, isGroupEnabled) {

    if(orientation=="Horizontal"){  
         

       }else if(orientation=="Vertical"){
      

       }else{ 
      
       }

  }

  ////////////////////////////////////////
  function generate_feature() {
    var result = {};
    result.enabled = [];
    result.disabled = [];
    $("#feature_layout>li>input:checked").each(function(index, el) {
      result.enabled.push(el.value);
    });
    $("#feature_layout>li>input:not(checked)").each(function(index, el) {
      if (!this.checked) {
        result.disabled.push(el.value);
      }
    });
    return result;
  }

  function generate_configurate() {
    var result = {};
    result.properties = {};
    result.properties.chemservice = $("#cddservice").val();
    result.layout = {};
    result.layout.orientation = $("#orientation").find(":selected").text();
    if (result.layout.orientation !== "Mixed") {
      result.layout.tools = [{
        'order': []
      }];
      $(".layout>li>:checked").each(function(index, el) {
        result.layout.tools[0].order.push(el.value);
      });
    } else {
      result.layout.tools = [{
        'category': 'general',
        'order': []
      }, {
        'category': 'drawing',
        'order': []
      }];
      // add horizontal buttons
      $(".layout2>li>:checked").each(function(index, el) {
        var drawing_btn = el.value; 
          result.layout.tools[0].order.push(drawing_btn);
      });

      // add vertical buttons
      $(".layout>li>:checked").each(function(index, el) {
        var drawing_btn = el.value;
          result.layout.tools[1].order.push(drawing_btn);
       
      });
      // add static groups info
      result.layout.tools[1].order.push({
        "group": "Symbols",
        "order": ["CirclePlus", "CircleMinus", "LonePair", "Radical"]
      });
      result.layout.tools[1].order.push({
        "group": "Bonds",
        "order": ["SolidBond", "BoldBond", "DoubleBond", "TripleBond", "HashedWedgeBond", "WedgeBond", "DashedBond"]
      });
      result.layout.tools[1].order.push({
        "group": "Rings",
        "order": ["Propane", "Butane", "Pentane", "Hexane", "Benzene", "CyclohexaneChairRight", "CyclohexaneChairLeft"]
      });
    }

    return result;
  }

  function generateConfigurationJson() {

    var result = {};
    result = generate_configurate();
    result.features = {};
    result.features = generate_feature();

    return result;
  }

  return {
    handleFileSelect: handleFileSelect,
    onFeatureClick: onFeatureClick,
    bindFeatures: bindFeatures,
    bindButtons: bindButtons,
    togleButtonsByGroup:togleButtonsByGroup,
    generate_feature: generate_feature,
    generate_configurate: generate_configurate,
    generateConfigurationJson: generateConfigurationJson
  };

})();