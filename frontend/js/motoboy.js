document.addEventListener("DOMContentLoaded", () => {
  console.log("JS carregado");
document.getElementById("motoboyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    taxaFixa: document.getElementById("taxaFixa").value,
    reaisPorKm: document.getElementById("reaisPorKm").value
  };

  fetch("/api/motoboys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro ao salvar");
    return res.json();
  })
  .then(() => alert("Motoboy cadastrado"))
  .catch(err => console.error(err));
});

});

