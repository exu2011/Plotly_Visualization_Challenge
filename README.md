# Plotly_Visualization_Challenge
Belly Button Biodiversity
Objectives: 
Use the D3 library to read in samples.json.
Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
Use sample_values as the values for the bar chart.
Use otu_ids as the labels for the bar chart.
Use otu_labels as the hovertext for the chart.
Create a bubble chart that displays each sample.

Use otu_ids for the x values.
Use sample_values for the y values.
Use sample_values for the marker size.
Use otu_ids for the marker colors.
Use otu_labels for the text values.
Display the sample metadata, i.e., an individual's demographic information.
Display each key-value pair from the metadata JSON object somewhere on the page.
Update all of the plots any time that a new sample is selected.

Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:
Advanced Challenge Assignment (Optional)
The following task is advanced and therefore optional.


Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.


You will need to modify the example gauge code to account for values ranging from 0 through 9.
Update the chart whenever a new sample is selected.

Procedure:
first I created docs folder and put all the index.html and app.js files into this folder so that we could deploy the webpage  on github.

First, I create a function called  buildDemoInfoTable  to print out demographics info table for specific chosen id of the pulldown menu.  I name it sample.data


then I filter demographic information by id parameter and get the html element of the demographic info table

// Clear the existing data in the demographic info table

// Use Object.entries to add both key-value pair to the demoInfoTable
// end buildDemoInfoTable()


// 0. Retrive data from sample json data

// 1. Process the data

// There should be one filteredResult whose sample id === id

// Get the first and the only element in the filteredResult array

// Grab values from the data json object to build the plots

// Get the wfreq data by sample id:
// let wfreq = Object.values(result)[6];
// Get the selected object

// 1. Create a horizontal bar chart to display the top 10 OTUs found in an individual
// colorscale: 'YlGnBu'
// 3. Create the gauge chart (optional)

// Function to build the gauge plot: 
// Ref: https://plotly.com/javascript/indicator/

// Grab values from the sample data json object to build the pulldown menu with a list of sample ids

//extract the sample ids from the samples.json file, and use it to populate the pulldown menu
// get the html's pulldown element
// build the plots using the first sample id = 940
// display the default demoInfo table with the first ID = 940
// When user pick up a sample id from the pulldown menu, refresh the page with the new data associated with 
// the new Sample ID. Please note, the function name is defined in the index.html: "onchange="optionChanged(this.value)"

// end handlePulldownOptionChange()

// Initialize the project dashboard