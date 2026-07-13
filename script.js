// =========================
// العناصر
// =========================

const privateList = document.getElementById("privateList");
const truckList = document.getElementById("truckList");
const equipmentList = document.getElementById("equipmentList");

const workingCount = document.getElementById("workingCount");
const faultCount = document.getElementById("faultCount");

const privateTotal = document.getElementById("privateTotal");
const privateWorking = document.getElementById("privateWorking");
const privateFault = document.getElementById("privateFault");

const truckTotal = document.getElementById("truckTotal");
const truckWorking = document.getElementById("truckWorking");
const truckFault = document.getElementById("truckFault");

const equipmentTotal = document.getElementById("equipmentTotal");
const equipmentWorking = document.getElementById("equipmentWorking");
const equipmentFault = document.getElementById("equipmentFault");

const search = document.getElementById("search");

const popup = document.getElementById("popup");
const vehicleTitle = document.getElementById("vehicleTitle");

const passwordPopup = document.getElementById("passwordPopup");
const passwordInput = document.getElementById("passwordInput");

let selectedVehicle = null;
let requestedStatus = null;


// =========================
// عرض المركبات
// =========================

function displayVehicles(list = vehicles) {

    privateList.innerHTML = "";
    truckList.innerHTML = "";
    equipmentList.innerHTML = "";

    let working = 0;
    let fault = 0;

    let pTotal = 0;
    let pWorking = 0;
    let pFault = 0;

    let tTotal = 0;
    let tWorking = 0;
    let tFault = 0;

    let eTotal = 0;
    let eWorking = 0;
    let eFault = 0;

    list.forEach(vehicle => {

        if (vehicle.status === "working")
            working++;
        else
            fault++;

        let card = document.createElement("div");

        card.className =
            "vehicle-card " +
            (vehicle.status === "working"
                ? "vehicle-working"
                : "vehicle-fault");

        let noteIcon =
            vehicle.notes && vehicle.notes.trim() !== ""
                ? "<span class='note-icon'>📩</span>"
                : "";

        card.innerHTML = `
            ${noteIcon}
            <div class="vehicle-number">
                ${vehicle.number}
            </div>
        `;

        card.onclick = () => openPopup(vehicle);

        switch (vehicle.type) {

            case "private":

                privateList.appendChild(card);

                pTotal++;

                if (vehicle.status === "working")
                    pWorking++;
                else
                    pFault++;

                break;

            case "truck":

                truckList.appendChild(card);

                tTotal++;

                if (vehicle.status === "working")
                    tWorking++;
                else
                    tFault++;

                break;

            case "equipment":

                equipmentList.appendChild(card);

                eTotal++;

                if (vehicle.status === "working")
                    eWorking++;
                else
                    eFault++;

                break;
        }

    });

    // الإحصائيات العامة

    workingCount.textContent = working;
    faultCount.textContent = fault;

    // PRIVATE

    privateTotal.textContent = pTotal;
    privateWorking.textContent = pWorking;
    privateFault.textContent = pFault;

    // TRUCKS

    truckTotal.textContent = tTotal;
    truckWorking.textContent = tWorking;
    truckFault.textContent = tFault;

    // EQUIPMENTS

    equipmentTotal.textContent = eTotal;
    equipmentWorking.textContent = eWorking;
    equipmentFault.textContent = eFault;

}
// =========================
// فتح بطاقة المركبة
// =========================

function openPopup(vehicle){

    selectedVehicle = vehicle;

    vehicleTitle.textContent = vehicle.number;

    popup.classList.remove("hidden");

}



// =========================
// تعديل اسم المركبة
// =========================

function editVehicleName(){

    let newName = prompt(
        "أدخل اسم المركبة:",
        selectedVehicle.name || ""
    );

    if(newName !== null){

        selectedVehicle.name = newName.trim();

        displayVehicles();

    }

}



// =========================
// طلب تغيير الحالة
// =========================

function requestStatusChange(status){

    requestedStatus = status;

    if(status === "fault"){

        let reason = prompt(
            "اكتب سبب توقف المركبة:",
            selectedVehicle.notes || ""
        );

        if(reason === null)
            return;

        selectedVehicle.notes = reason.trim();

    }

    if(status === "working"){

        selectedVehicle.notes = "";

    }

    passwordInput.value = "";

    passwordPopup.classList.remove("hidden");

}



// =========================
// تعديل الملاحظات
// =========================

function editNotes(){

    let note = prompt(
        "الملاحظات:",
        selectedVehicle.notes || ""
    );

    if(note !== null){

        selectedVehicle.notes = note.trim();

        displayVehicles();

    }

}



// =========================
// التحقق من الرقم السري
// =========================

function checkPassword(){

    if(passwordInput.value !== "16996"){

        alert("❌ الرقم السري غير صحيح");

        return;

    }

    selectedVehicle.status = requestedStatus;

    displayVehicles();

    passwordPopup.classList.add("hidden");

    popup.classList.add("hidden");

}



// =========================
// إغلاق النوافذ
// =========================

function closeVehiclePopup(){

    popup.classList.add("hidden");

}

function closePassword(){

    passwordPopup.classList.add("hidden");

}
// =========================
// حفظ البيانات
// =========================

function saveData() {

    localStorage.setItem(
        "ATP_VEHICLES",
        JSON.stringify(vehicles)
    );

}



// =========================
// استرجاع البيانات
// =========================

function loadData() {

    const data = localStorage.getItem("ATP_VEHICLES");

    if (!data) return;

    const savedVehicles = JSON.parse(data);

    savedVehicles.forEach(saved => {

        const vehicle = vehicles.find(v => v.id === saved.id);

        if (vehicle) {

            vehicle.status = saved.status;
            vehicle.notes = saved.notes || "";
            vehicle.name = saved.name || "";

        }

    });

}



// =========================
// البحث
// =========================

search.addEventListener("input", function () {

    const value = this.value.trim();

    if (value === "") {

        displayVehicles();

        return;

    }

    const result = vehicles.filter(vehicle =>
        vehicle.number.includes(value)
    );

    displayVehicles(result);

});



// =========================
// تعديل دالة التحقق
// =========================

// استبدل داخل checkPassword()
// السطر:

// displayVehicles();

// بالسطرين التاليين:

// saveData();
// displayVehicles();



// =========================
// تشغيل النظام
// =========================

loadData();

displayVehicles();
