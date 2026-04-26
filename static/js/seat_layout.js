const tripSelect = document.getElementById("tripSelect");
const seatLayoutDiv = document.getElementById("seatLayout");
const seatInput = document.getElementById("seatInput");

tripSelect?.addEventListener("change", () => {
  const tripId = tripSelect.value;
  seatLayoutDiv.innerHTML = "";
  seatInput.value = "";

  if (!tripId) return;

  fetch(`/tickets/seats/${tripId}`)
    .then(res => res.json())
    .then(data => {
      if (!data.layout) {
        seatLayoutDiv.innerHTML = "<p>No layout found</p>";
        return;
      }
      renderSeats(data.layout, data.booked);
    });
});

function renderSeats(layout, bookedSeats) {
  const rows = layout.rows;
  const cols = layout.cols;

  for (let r = 0; r < rows; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "d-flex mb-1";

    for (let c = 0; c < cols; c++) {
      const seat = String.fromCharCode(65 + c) + (r + 1);
      const btn = document.createElement("button");

      btn.type = "button";
      btn.textContent = seat;
      btn.className = "btn btn-sm me-1";

      if (bookedSeats.includes(seat)) {
        btn.classList.add("btn-danger");
        btn.disabled = true;
      } else {
        btn.classList.add("btn-outline-success");
        btn.onclick = () => {
          document
            .querySelectorAll("#seatLayout button")
            .forEach(b => b.classList.remove("btn-success"));

          btn.classList.replace("btn-outline-success", "btn-success");
          seatInput.value = seat;
        };
      }

      rowDiv.appendChild(btn);
    }

    seatLayoutDiv.appendChild(rowDiv);
  }
}
