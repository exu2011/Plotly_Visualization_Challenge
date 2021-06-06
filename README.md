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
first I created docs folder and put all the index.html and app.js files into this folder so that we could deploy the webpage  on github.  The deployed github webpage is  https://exu2011.github.io/Plotly_Visualization_Challenge/

1.  create a function called  "buildDemoInfoTable()"  to print out demographics info table for specific chosen id of the pulldown menu.  then I filtered demographic information by id parameter, get the html element of the demographic info table,  clear the existing data in the demographic info table, Use Object.entries to add both key-value pair to the demoInfoTable

2. create a function "buildPlots()". This buildPlots function will create three plots for a specific sample id: 
// Plot 1: horizontal bar chart for top ten culture. The goal is to to create a horizontal bar chart to display the top 10 OTUs found in an individual.
// Plot 2: gauge  of washing frenqency
// Plot 3: bubble chart for specific id. Create a bubble chart that displays each sample. define the trace data, define the layout, create a bubble chart
 
3. Create the gauge chart (optional)
  I created a function named "buildGaugeChart()" to build the gauge plot: 
  I referenced the code for indicator from https://plotly.com/javascript/indicator/
  I used html https://htmlcolorcodes.com/ to help with color gradient for steps.
  For axis: use dtick to define the tick frequency

4. Initialize the project dashboard by calling a function called init(). 
    In the init(), extract the sample ids one by one from the "names" section in the samples.json file, and populate the pulldown menu options
    build the default plots using the first sample id = 940
    display the default demoInfo table with the first sample ID = 940

// Grab values from the sample data json object to build the pulldown menu with a list of sample ids

//extract the sample ids from the samples.json file, and use it to populate the pulldown menu
// get the html's pulldown element
// build the plots using the first sample id = 940
// display the default demoInfo table with the first ID = 940
// When user pick up a sample id from the pulldown menu, refresh the page with the new data associated with 
// the new Sample ID. Please note, the function name is defined in the index.html: "onchange="optionChanged(this.value)"

// end handlePulldownOptionChange()

