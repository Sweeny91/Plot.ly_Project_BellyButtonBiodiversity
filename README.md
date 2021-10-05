# Javascript's Plot.ly Library Embraced!

![Bacteria by filterforge.com](Images/bacteria.jpg)

## Given Background: 
- ### Belly Button Biodiversity 
- In this assignment, an interactive dashboard was built to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which cataloged the microbes that colonize human navels.
- The given dataset revealed that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Project Description:
### How did I Plotly? 
1. The D3 library was used to read in `samples.json`.
2. A Horizontal Bar Chart was created with a dropdown menu displaying the top 10 OTUs found in that individual.
* Used `sample_values` as the values for the bar chart.
* Used `otu_ids` as the labels for the bar chart.
* Used `otu_labels` as the hovertext for the chart.

  ![bar Chart](Images/hw01.png)

3. Created a bubble chart that displays each sample.
* Used `otu_ids` for the x values.
* Used `sample_values` for the y values.
* Used `sample_values` for the marker size.
* Used `otu_ids` for the marker colors.
* Used `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

4. Displayed the sample metadata, i.e., an individual's demographic information.

5. Displayed each key:value pair from the metadata JSON object on the page.

![hw](Images/hw03.png)

6. Any time that a new sample is selected, the plots will be updated.

An example dashboard is shown below:

![hw](Images/hw02.png)

### 7. Advanced Challenge

* Optionally we were challenged with adapting the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.
* This challenge was well met and the chart in the advanced file updates whenever a new sample is selected!

![Weekly Washing Frequency Gauge](Images/gauge.png)

# Deliverables:
- The first run at this project with all its hiccups along the way can be found in the "CodeFiles" diectory of this repository
- If you are looking for a finished product that works as the project objectives define then I would head to the "BonusFiles" directory and deploy those
