// Create a funcion to pull out demographics information from the metadata in samples.json
function buildDemoInfoTable(id) {
  d3.json("samples.json").then((sampleData) => {
    let metadata = sampleData.metadata;
    console.log(metadata);

    // filter demographic information by id parameter
    let filteredResult = metadata.filter(demoInfo => demoInfo.id.toString() === id)[0];

    // get the html element of the demographic info table
    let demoInfoTable = d3.select("#sample-metadata"); 

    // Clear the existing data in the demographic info table
    demoInfoTable.html("");
    // Use Object.entries to add both key-value pair to the demoInfoTable
    Object.entries(filteredResult).forEach(([key, value]) => {
      demoInfoTable.append("h5").text(`${key}: ${value}`);
    });

  });
} // end buildDemoInfoTable()


function buildPlots(id) {
  
  //-------------------------------------------
  // 0. Retrive data from samples.json
  //-------------------------------------------
  d3.json("samples.json").then((data) => {
    // 1. Process the data
    let sampleData = data.samples;

    // There should be one filteredResult whose sample id === id
    let filteredResult = sampleData.filter(testSubject => testSubject.id === id);

    // Get the first and the only element in the filteredResult array
    let result = filteredResult[0];
    console.log("The selected id = " + id);
    console.log(result)

    // console.log("The sample result: " + result);

    // Grab values from the data json object to build the plots
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    // console.log("Debug 0:")
    // console.log(otu_labels);

    // Get the wfreq data by sample id:
    let metadata = data.metadata;
    // console.log("Debug1");
    // console.log(metadata);

    let filteredMetadata = metadata.filter(metaDataEntry => metaDataEntry.id.toString() == id);
    // console.log("Debug2: ID = " + id);
    // console.log(filteredMetadata);

    // Get the selected object
    let filteredMetadataObj = filteredMetadata[0];
    // console.log("Debug3");
    // console.log(filteredMetadataObj);
    let wfreq = filteredMetadataObj.wfreq;

    console.log("wfreq: " + wfreq);

    //------------------------------------------------------------------------------------
    // 1. Create a horizontal bar chart to display the top 10 OTUs found in an individual
    //------------------------------------------------------------------------------------
    let yaxis = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
    let xlabels = sample_values.slice(0, 10).reverse();
    let hoverText = otu_labels.slice(0, 10).reverse();

    console.log(yaxis);
    console.log(xlabels);

    // trace variable to hold the data
    let barChartTrace = {
      x: xlabels,
      y: yaxis,
      text: hoverText,
      marker: {
        color: 'light blue'
      },
      type: 'bar',
      orientation: 'h' // horizontal
    };

    // Create the data array for the bar plot
    let barChartData = [barChartTrace];
    // Define bar chart layout
    let barChartLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        t: 25,
        l: 70
      }
    
    };
    //Create the bar plot: 
    Plotly.newPlot("bar", barChartData, barChartLayout);

    //------------------------------------------------------------------------------------
    // 2. Create a bubble chart that displays each sample
    //------------------------------------------------------------------------------------
    // define the trace data
    let bubbleTrace = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers', 
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Earth' 
          // colorscale: 'YlGnBu'
        }
      }
    ];

    // define the layout 
    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      height: 650,
      width: 1300, 
      hovermode: "closest",
      showlegend: false
    };

    // Create a bubble chart
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);

  
    //------------------------------------------------------------------------------------
    // 3. Create the gauge chart (optional)
    //------------------------------------------------------------------------------------
    // Call the function buildGaugeChart, passing wfreq as a parameter.
    buildGaugeChart(wfreq);

  });

} // end buildPlots()

//-----------------------------------------------------------------------
// buildGaugeChart: 
//   Function to build the gauge plot: 
//   parameter: wfreq (wash frequency)
// Ref: https://plotly.com/javascript/indicator/
// Use https://htmlcolorcodes.com/ to help with color gradient for steps.
// for axis: use dtick to define the tick frequency
//-----------------------------------------------------------------------
function buildGaugeChart(wfreq) {
  // define gauge data trace: 
  // Plot type: Plotly - indicator; 
  let data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: wfreq,
      title: { text: "Belly Button Washing Frequency", font: { size: 20 } },
      // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "lightgreen", dtick: 1 },
        bar: { color: "darkgreen" },
        bgcolor: "white",
        borderwidth: 1.5,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "#DFECF5" },
          { range: [1, 2], color: "#CFE1EE" },
          { range: [2, 3], color: "#B8E7F6" },
          { range: [3, 4], color: "#A1E0F5" },
          { range: [4, 5], color: "#90D9F2" },
          { range: [5, 6], color: "#83C9F7" },
          { range: [6, 7], color: "#6ABBF1" },
          { range: [7, 8], color: "#4FAAE6" },
          { range: [8, 9], color: "#3587BE" }
        ],
        threshold: {
          line: { color: "darkred", width: 4 },
          thickness: 0.75,
          value: 2
        }
      }
    }
  ];

  // Define gauge layout - plot size and margin
  let gaugeLayout = {
    height: 250,
    width: 350,
    // tickmode = 'array',
    // tickvals = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    margin: {
      t: 0, 
      b: 0
    }
  };

  // Create the gauge
  Plotly.newPlot("gauge", data, gaugeLayout);

} // end buildGaugeChart

//------------------------------------------------
// init(): display the data with default id = 940
//------------------------------------------------
function init() {

  // Grab values from the sample data json object to build the pulldown menu with a list of sample ids
  d3.json("samples.json").then((sampleData) => {
    //extract the sample ids one by one from the "names" section in the samples.json file, and populate the pulldown menu options
    sampleData.names.forEach((name) => {
      // console.log("Debug: " + name);

      // get the html's pulldown element, append each id name as an option to the pulldown menu
      d3.select("#selDataset")
        .append("option")
        .text(name)
        .property("value");      
    });

    // build the default plots using the first sample id = 940
    buildPlots(sampleData.names[0]);

    // display the default demoInfo table with the first sample ID = 940
    buildDemoInfoTable(sampleData.names[0]);

  });

} // end init()

// When user pick up a sample id from the pulldown menu, refresh the page with the new data associated with 
// the new Sample ID. Please note, the function name is defined in the index.html: "onchange="optionChanged(this.value)"
function optionChanged(newSampleId) {

  buildDemoInfoTable(newSampleId);
  buildPlots(newSampleId);

} // end optionChanged()

// Initialize the project dashboard
init();