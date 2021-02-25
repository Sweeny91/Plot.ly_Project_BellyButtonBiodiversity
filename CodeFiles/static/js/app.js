// Main Script to be ran for analysis
//  Step 1: Build Dashboard and set default values for visualizations to index[0]
//  Step 2: 




// Read in data from given JSON file
d3.json("samples.json").then((importedData) => {

    // Print out various data values in the console for inspection:
    // ------------------------------------------------------------
    // console.log(importedData);
    // console.log(importedData.names);
    // console.log(importedData.metadata);
    // console.log(importedData.samples);


    // Build function to populate drop down menu with Test Subject ID values:
    // ----------------------------------------------------------------------

    // function to hold different subject number values
    const idNums = importedData.names;
    console.log(idNums);

    // Mapped subject names incase index reference needed
    // let idNumsMap = .map((item, index) => {
    //     return `Stage ${index}: ${item}`;
    //   });

    // object variable to store the metadata JSON object for reference 
    const metaData = importedData.metadata;

    // Implement forEach() method to populate drop down menu with the Subject ID values
    // The specific methods within the forEach function were found outside of the class scope -> Trial & Error by internet research
    // These methods were chosen so that the value of the Subject ID was also appended to..
    // .. the "value" within each respective <option></option> tag, so that it can be referenced later in the conditional statement
    idNums.forEach(function(name) {
        let option = document.createElement("option");
        option.text = `${name}`;
        option.value = `${name}`;
        console.log(option)
        let select = document.getElementById("selDataset");
        select.appendChild(option);
    });


    // Build a function to populate the Demographic info Panel
    function demoInfo(i) {
        let panel = document.getElementById("sample-metadata");
        let metaDict = metaData[i];

        Object.entries(metaDict).forEach(([key, value]) => {
            let node = document.createTextNode(` ${key} : ${value} `);
            panel.appendChild(node);
            var br = document.createElement("br");
            panel.appendChild(br);
        });
    }

    // Initialize "demoInfo" function with [0] to provide HTML w/ Default Demographic info on dashboard
    demoInfo(0);


    // Trying to build function to update Demographic info instead of appending it
    // Write fucntion to simply clear out panel and implement in update function
    // function clearDemo() {
    //     // recreate panel variable
    //     let panel = document.getElementById("sample-metadata");
    //     // clear panel
    //     panel.attr("#text", "");

    // }


    // Variables made before an alternate route was found. Keept for later use if needed
    // let metaId = metaData.id;
    // let ethnicity = metaData.ethnicity;
    // let gender = metaData.gender;
    // let age = metaData.age;
    // let location = metaData.location;
    // let bbtype = metaData.bbtype;
    // let wfreq = metaData.wfreq;


    // BUILD CHARTS:
    // -------------------------------------------------------------------------------
    // Built First to reference the data using index[0] as default -->
    // Then, Rearranged into a function that takes i as an argument and can change based on i

    function buildCharts(i) {

        // Create variables needed for visualizations 
        // OTU IDS:
        // Create a variable to hold the OTU Ids
        let otuId = importedData.samples[i].otu_ids;
        console.log(otuId)
            // Create variable to hold the top ten OTUs
        let otuIdTopTen = importedData.samples[i].otu_ids.slice(0, 10).reverse();

        // SAMPLE VALUES:
        // Create variable for sample values
        let sampleValues = importedData.samples[i].sample_values;
        console.log(sampleValues)
            // Create a variable for the Top 10 Sample Values
        let sampleValuesTopTen = importedData.samples[i].sample_values.slice(0, 10).reverse();

        // HOVER OBJECT: 
        // Create hover object 
        let hoverText = importedData.samples[i].otu_labels
        console.log(hoverText)
            // Create top 10 variable for hover object
        let hoverTextTopTen = importedData.samples[i].otu_labels.slice(0, 10).reverse();

        // Build Visualization Elements:
        // Map a descriptive label for the OTU Ids
        let valueLabels = otuIdTopTen.map(id => "OTU #: " + id);


        // 1.) Bar Chart:
        // Build Trace Element 1
        let trace1 = {
            x: sampleValuesTopTen,
            y: valueLabels,
            text: hoverTextTopTen,
            type: "bar",
            orientation: "h"
        };
        // Initiate trace element 1 in data1 variable
        let data1 = [trace1];
        // Build layout for bar chart
        let layout1 = {
            title: "Top 10 OTUs found in Test Subject",
            xaxis: { title: "Bacteria Measurement" }
        };
        // Plot the Bar Chart
        Plotly.newPlot("bar", data1, layout1);


        // 2.) BUBBLE CHART
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

    }

    // Initialize "buildChart" function with [0] to provide HTML w/ Default Charts on dashboard
    buildCharts(0);


    // Build function to dynamically change the page when a different id is selected in the drop down menu
    // THIS MUST CHANGE THE DEMOGRAPHIC INFO AND THE CHARTS
    //---------------------------------------------------------------------------------

    // Form to be ran when a new selection is made in the drop down menu
    d3.selectAll("#selDataset").on("change", optionChanged);

    // BUILD UPDATE PLOTPAGE FUNCTION:
    function optionChanged() {

        // Prevent the page from refreshing
        d3.event.preventDefault();

        // Use D3 to select the dropdown menu
        var dropMenu = d3.select(this);

        // Assign the value of the dropdown menu option to a variable
        var name = dropMenu.property("value");


        for (let i = 0; i < idNums.length; i++) {

            if (name === idNums[i]) {

                demoInfo(i);
                buildCharts(i);
            }
        }
    }

    // Form to be ran when a new selection is made in the drop down menu
    // d3.selectAll("#selDataset").on("change", optionChanged);

});