// your-recycling-script.js

document.addEventListener("DOMContentLoaded", function() {
    // Load CSV data and update recycling info
    var csvUrl = '../../data/data.csv?t=' + new Date().getTime();  

    Papa.parse(csvUrl, {
        download: true,
        header: false,
        complete: function (results) {

            var data = results.data;
            var sum = 0;

            // Calculate total paper recycled
            for (var j=1; j<5; j++) {
                for (var i=0; i < data.length; i++) {
                    var value = parseFloat(data[j][i]);  
                    if (isNaN(value)) {  
                        value = 0;  
                    }  
                    sum += value;  
                }
            }

            var trees = sum * 0.018743;
            var oilBarrels = sum * 0.00221;
            var kWenergy = sum * 4.5204;
            var cubicMLandfill = sum * 0.0027012;
            var kgPollution = sum * 0.02977;

            // Round to 2 decimal places
            var totalKg = sum.toFixed(2);  
            var treesSaved = trees.toFixed(2);
            var barrelsOfOilSaved = oilBarrels.toFixed(2);
            var kWenergySaved = kWenergy.toFixed(2);
            var cubicMLandfillSaved = cubicMLandfill.toFixed(2);
            var kgPollutionSaved = kgPollution.toFixed(2);

            // Update the recycling info content
            // const container = document.getElementById('stats');
            // container.innerHTML = `
            //     <span class="recycling-entry">${treesSaved} trees - Trees Saved</span>
            //     <span class="recycling-entry">${barrelsOfOilSaved} barrels - Barrels of Oil Saved</span>
            //     <span class="recycling-entry">${kWenergySaved} kW - kW Energy Saved</span>
            //     <span class="recycling-entry">${cubicMLandfillSaved} cubic meters - Cubic Meters Landfill Saved</span>
            //     <span class="recycling-entry">${kgPollutionSaved} kg - Pollution Avoided</span>
            // `;
            document.getElementById('trees-text').innerText = `${treesSaved} trees`;
            document.getElementById('oil-barrels-text').innerText = `${barrelsOfOilSaved} barrels of oil`;
            document.getElementById('kW-energy-text').innerText = `${kWenergySaved} kW energy`;
            document.getElementById('cubic-m-landfill-text').innerText = `${cubicMLandfillSaved} cubic m landfill`;
            document.getElementById('kg-pollution-text').innerText = `${kgPollutionSaved} kg pollution`;
        }
    });
});
