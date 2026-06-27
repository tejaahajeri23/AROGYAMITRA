let user = {};


function next() {
    user.name = document.getElementById("name").value;
    user.age = document.getElementById("age").value;

    localStorage.setItem("user", JSON.stringify(user));
    window.location = "details.html";
}


function calculate() {
    let user = JSON.parse(localStorage.getItem("user"));

    user.weight = parseFloat(document.getElementById("weight").value);
    user.height = parseFloat(document.getElementById("height").value);
    user.gender = document.getElementById("gender").value;

    let bmr;
    if (user.gender == "male")
        bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    else
        bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;

    user.maintain = Math.round(bmr);
    user.lose = Math.round(bmr - 400);
    user.gain = Math.round(bmr + 400);

    localStorage.setItem("user", JSON.stringify(user));
    window.location = "result.html";
}


function showResult() {
    let user = JSON.parse(localStorage.getItem("user"));

    document.getElementById("cal").innerHTML =
        "Maintain: " + user.maintain + " kcal<br>" +
        "Lose: " + user.lose + " kcal<br>" +
        "Gain: " + user.gain + " kcal";
}

function goDiet() {
    window.location = "diet.html";
}


function showDiet() {
    let diet =
        "🔹 Weight Loss: Oats + Fruits + Salad<br>" +
        "🔹 Maintain: Roti + Dal + Veg<br>" +
        "🔹 Gain: Rice + Paneer + Banana + Milk";

    document.getElementById("diet").innerHTML = diet;
}

function goExercise() {
    window.location = "exercise.html";
}


function exercise() {
    let t = document.getElementById("time").value;
    let plan = "";

    if (t == 20)
        plan = "Stretching + Walking + Yoga";
    else if (t == 30)
        plan = "Jogging + Squats + Pushups";
    else
        plan = "Full Body Workout + Cardio + Abs";

    document.getElementById("plan").innerHTML = plan;

    let user = JSON.parse(localStorage.getItem("user"));
    user.exercise = plan;
    localStorage.setItem("user", JSON.stringify(user));
}


async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let user = JSON.parse(localStorage.getItem("user"));

    doc.text("ArogyaMitra Report", 20, 20);

    doc.text("Name: " + user.name, 20, 40);
    doc.text("Age: " + user.age, 20, 50);
    doc.text("Weight: " + user.weight, 20, 60);
    doc.text("Height: " + user.height, 20, 70);

    doc.text("Maintain: " + user.maintain, 20, 90);
    doc.text("Lose: " + user.lose, 20, 100);
    doc.text("Gain: " + user.gain, 20, 110);

    doc.text("Exercise: " + user.exercise, 20, 130);

    doc.save("ArogyaMitra_Report.pdf");
}