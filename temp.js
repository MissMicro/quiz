var row, cell, text, r, c,
    prop = ['id', 'data', 'mama'],
    table = document.getElementById("myList1");
for (r = 0; r < data.length; r++) {
    row = document.createElement('tr');
    for (c = 0; c < 3; c++) {
        cell = document.createElement('td');
        text = document.createTextNode(data[r][prop[c]]);
        cell.appendChild(text);
        row.appendChild(cell);
    }
    table.appendChild(row);
}