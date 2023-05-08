
const keyPricingString: Record<string, any> = {
    "noOfRows": "${replace} No. of Transactions",
    "noOfProjects": "${replace} No. of Project",
    "supportType": "${replace}"
}

function formatString(orgString: string, values: any[]): string {
    for (let i = 0; i < values.length; i++){
        orgString = orgString.replace('${replace}', values[i])
    }
    return orgString;
}

const backendPricingValues: Record<string, any> = {
    "noOfRows": 50,
    "noOfProjects": 5,
    "supportType": "Discord & Email Support"
}


for(let key in backendPricingValues){
    let replaceValue = backendPricingValues[key];
    let orgString = keyPricingString[key];
    console.log(formatString(orgString, [replaceValue]));
}
