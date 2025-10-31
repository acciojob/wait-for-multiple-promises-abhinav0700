// your JS code here. If required.

// Reference to the output table body
const output = document.getElementById("output");

// Step 1: show "Loading..." row with id="loading"
const loadingRow = document.createElement("tr");
loadingRow.id = "loading";
loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
output.appendChild(loadingRow);

// Step 2: function to create a promise that resolves in random 1–3 seconds
function createPromise(index) {
  const time = (Math.random() * 2 + 1).toFixed(3); // between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index}`, time: parseFloat(time) });
    }, time * 1000);
  });
}

// Step 3: create 3 promises
const promises = [createPromise(1), createPromise(2), createPromise(3)];

// Start measuring total time
const start = performance.now();

// Step 4: wait for all to resolve
Promise.all(promises).then((results) => {
  const end = performance.now();
  const totalTime = ((end - start) / 1000).toFixed(3);

  // remove loading row
  output.innerHTML = "";

  // add each promise result
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;
  output.appendChild(totalRow);
});
