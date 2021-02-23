// Main Script to be ran for analysis

// Read in data from given JSON file
d3.json("data/samples.json").then((importedData) => {

    // Print out data in console for inspection
    // console.log(importedData);
    // console.log(importedData.names);
    // console.log(importedData.metadata);
    // console.log(importedData.samples);


    // OTU IDS:
    // Create a variable to hold the OTU Ids
    let otuId = importedData.samples[0].otu_ids;
    console.log(otuId)
        // Create variable to hold the top ten OTUs
    let otuIdTopTen = importedData.samples[0].otu_ids.slice(0, 10).reverse();


    // SAMPLE VALUES:
    // Create variable for sample values
    let sampleValues = importedData.samples[0].sample_values;
    console.log(sampleValues)
        // Create a variable for the Top 10 Sample Values
    let sampleValuesTopTen = importedData.samples[0].sample_values.slice(0, 10).reverse();


    // HOVER OBJECT: 
    // Create hover object 
    let hoverText = importedData.samples[0].otu_labels
    console.log(hoverText)
        // Create top 10 variable for hover object
    let hoverTextTopTen = importedData.samples[0].otu_labels.slice(0, 10);


    // Build Visualization Elements:
    // Map a descriptive label for the OTU Ids
    let valueLabels = otuid.map(d => "OTU " + d);

    // 1.) Bar Chart:
    // Build Trace Element 1
    let trace = {
        x: sampleValuesTopTen,
        y: valueLabels,
        text: hoverTextTopTen,
        type: "bar",
        orientation: "h"
    };
    // Initiate trace element 1 in data1 variable
    let data1 = [trace];
    // Build layout for bar chart
    let layout1 = {
        title: "Top 10 OTUs",
        xaxis: { title: "Bacteria Value" },
        yaxis: { title: "OTU" }
    };
    // Plot the Bar Chart
    Plotly.newPlot("bar", data1, layout1);



    // 2.) Bubble Chart\
    // Build Trace Element 2
    var trace2 = {
        x: otuId,
        y: sampleValues,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuId
        },
        text: hoverText
    };
    // Initiate trace element 2 in data2 variable
    let data2 = [trace2];
    // Build layout for bubble chart
    let layout2 = {
        xaxis: { title: "OTU ID" },
        height: 500,
        width: 1000
    };
    // Plot the Bubble Chart
    Plotly.newPlot("bubble", data2, layout2);
});