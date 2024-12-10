document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Voorkom standaardformulierverzending

    // Haal gegevens op uit het formulier
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
    };

    try {
      // Verstuur JSON-gegevens naar het endpoint
      const response = await fetch("http://localhost:8080/petition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Geef aan dat we JSON verzenden
        },
        body: JSON.stringify(formData), // Zet de gegevens om in JSON
      });

      if (response.ok) {
        // Succes! Toon een bericht of verwerk de respons
        const result = await response.json(); // Als je JSON als antwoord verwacht
        alert("Formulier succesvol verzonden!");
        console.log(result);
      } else {
        // Fout in de serverrespons
        alert("Er ging iets mis. Probeer het opnieuw.");
        console.error("Fout:", response.statusText);
      }
    } catch (error) {
      // Fout tijdens het verzenden van de aanvraag
      alert("Er ging iets mis. Controleer je internetverbinding.");
      console.error("Fout:", error);
    }
  });
});
