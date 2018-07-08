
const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
fetch(url)
    .then(response => {
        if (response.status !== 200) {
            console.warn('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        // Examine the text in the response  
        response.json().then(data => {

            let results = data.results;
            console.log(results);
            //loop through the result
            for (result in results) {
                let from=document.getElementById("From");
                let to=document.getElementById("To");
                //let option = document.createElement('option');
                //option.value = `${results[result].id}(${results[result].currencySymbol})`;
                //option.innerText = `${results[result].currencyName}(${results[result].currencySymbol})${results[result].id}`;
                from.innerHTML += `<option value='${result}'>${results[result].currencyName}(${results[result].currencySymbol || ''})</option>`;
                to.innerHTML += `<option value='${result}'>${results[result].currencyName}(${results[result].currencySymbol || ''})</option>`;
                //From.appendChild(option);
                //ssssTo.appendChild(option.cloneNode(true));
            }

            document.getElementById("clickMe").addEventListener(
                'click', convertCurrency);
            const From = document.getElementById("From");

            const To = document.getElementById("To");
            From.length = 0;
            To.length = 0;
            //creates the option element for from currency
            const defaultFrom = document.createElement('option');
            defaultFrom.text = " Convert From";
            //creates the option element for to currency
            const defaulTo = document.createElement('option');
            defaulTo.text = " Convert To";

            From.add(defaultFrom);
            From.selectedIndex = 0;
            To.add(defaulTo);
            To.selectedIndex = 0;

        });
    }
    ).catch(error => {
        console.log(JSON.stringify(error));
    });

async function convertCurrency() {
    let from = document.getElementById("From");
    let frm = from.options[from.selectedIndex].value;
    let to = document.getElementById("To");
    let tt = to.options[to.selectedIndex].value;
    //let tt = to.options[to.selectedIndex].innerText;
    let fromAmount = document.getElementById("fromAmount");
    let frmAmt = fromAmount.value;

    let toAmt = document.getElementById("toAmount").innerHTML;
    const query = `${frm}_${tt}`;
    const urlconvert = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
    try {
        const res = await fetch(urlconvert).then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        });

        res.json().then(rates => {
            console.log(rates);
            console.log(frmAmt);
            let val = rates[query];
            if (val) {
                let total = val * frmAmt;
                let answer = Math.round(total * 100) / 100;
                console.log(answer);
                output = `${answer.toFixed(2)} `;

                document.getElementById('toAmount').innerHTML = output;
                console.log(toAmt);
            } else {
                let err = new Error("Value not found for " + query);
                console.log(err);
                //  cb(err);
            }

        });

    } catch (e) {
        console.log(e);
    }
}

