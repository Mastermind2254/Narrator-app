let selectedCharacter = "grandma";

document.querySelectorAll(".char-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".char-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCharacter = btn.dataset.character;
    });
});

async function roast() {
    const entry = document.getElementById("entryBox").value.trim();
    if (!entry) return;

    document.getElementById("loading").style.display = "block";
    document.getElementById("output").style.display = "none";
    document.getElementById("roastBtn").disabled = true;

    const res = await fetch("/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry, character: selectedCharacter })
    });

    const data = await res.json();

    document.getElementById("loading").style.display = "none";
    document.getElementById("roastBtn").disabled = false;

    const output = document.getElementById("output");
    output.style.display = "block";
    output.textContent = data.output;
}