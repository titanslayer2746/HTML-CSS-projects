let size = prompt("Enter the number of cells per side of the grid (1-100): ");

if(size < 1 || size > 100) {
  alert("Invalid input. Please enter a number between 1 and 100.");
  size = prompt("Enter the number of cells per side of the grid (1-100): ");
}


const gridContainer = document.getElementById("grid-container");
if(!gridContainer){
    console.log("Container not found.");
}


for(let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gridContainer.appendChild(row);
    for(let j=0;j<size;j++){
        const cell = document.createElement("div")
        cell.classList.add("cell");
        cell.style.width = `${Math.round((97/size) * 10) / 10}vh`;
        cell.style.height = `${Math.round((97/size) * 10) / 10}vh`;
        row.appendChild(cell);
    }
    
}

let colorOption = document.getElementById("colorOption").value;

document.addEventListener("click", (e)=>{

  if(e.target.className==="clear"){
    let cells = document.getElementsByClassName("cell");
    if(!cells){
      console.log("div not found")
    }

    for(let i=0;i<cells.length;i++){
      cells[i].style.backgroundColor = "#90EDE6";
    }
  }

});

document.addEventListener("mouseover", (e)=>{
  if(e.target.className==="cell"){
    colorOption = document.getElementById("colorOption").value;
    e.target.style.backgroundColor = colorOption;
  }
});
