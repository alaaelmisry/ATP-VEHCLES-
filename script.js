//==================================================
// ATP Fleet Management 3.0
// Main Script
//==================================================


//==================================================
// العناصر
//==================================================

const privateList =
    document.getElementById("privateList");

const truckList =
    document.getElementById("truckList");

const equipmentList =
    document.getElementById("equipmentList");


// البحث

const search =
    document.getElementById("search");


// إحصائيات PRIVATE

const privateTotal =
    document.getElementById("privateTotal");

const privateWorking =
    document.getElementById("privateWorking");

const privateFault =
    document.getElementById("privateFault");


// إحصائيات TRUCKS

const truckTotal =
    document.getElementById("truckTotal");

const truckWorking =
    document.getElementById("truckWorking");

const truckFault =
    document.getElementById("truckFault");


// إحصائيات EQUIPMENT

const equipmentTotal =
    document.getElementById("equipmentTotal");

const equipmentWorking =
    document.getElementById("equipmentWorking");

const equipmentFault =
    document.getElementById("equipmentFault");


// النافذة

const modal =
    document.getElementById("vehicleModal");


const modalNumber =
    document.getElementById("modalNumber");


const modalDriver =
    document.getElementById("modalDriver");


const modalStatus =
    document.getElementById("modalStatus");


const modalNotes =
    document.getElementById("modalNotes");


const saveButton =
    document.getElementById("saveVehicle");


const cancelButton =
    document.getElementById("cancelVehicle");


// المركبة المحددة

let selectedVehicle = null;
const ADMIN_PASSWORD = "16896";
//==================================================
// حفظ البيانات
//==================================================

function saveData(){

    localStorage.setItem(

        "ATP_FLEET_DATA",

        JSON.stringify(vehicles)

    );

}
//==================================================
// تحميل البيانات
//==================================================

function loadData(){

    const data =
        localStorage.getItem("ATP_FLEET_DATA");


    if(!data)
        return;


    const saved =
        JSON.parse(data);


    saved.forEach(item=>{


        const vehicle =
            vehicles.find(
                v=>v.id===item.id
            );


        if(vehicle){

            vehicle.driver =
                item.driver || "";


            vehicle.status =
                item.status || "working";


            vehicle.notes =
                item.notes || "";


            vehicle.updatedAt =
                item.updatedAt || "";

        }

    });

}
//==================================================
// عرض المركبات
//==================================================

function displayVehicles(list = vehicles){


    // تفريغ القوائم

    privateList.innerHTML = "";

    truckList.innerHTML = "";

    equipmentList.innerHTML = "";



    // إحصائيات عامة

    let stats = {

        private:{
            total:0,
            working:0,
            fault:0
        },

        truck:{
            total:0,
            working:0,
            fault:0
        },

        equipment:{
            total:0,
            working:0,
            fault:0
        }

    };



    // ترتيب المتوقف أولاً

    list.sort((a,b)=>{

        if(a.status === "fault" &&
           b.status === "working")
            return -1;


        if(a.status === "working" &&
           b.status === "fault")
            return 1;


        return 0;

    });



    list.forEach(vehicle=>{


        // حساب الإحصائيات

        stats[vehicle.type].total++;


        if(vehicle.status === "working")

            stats[vehicle.type].working++;

        else

            stats[vehicle.type].fault++;



        // إنشاء الصف

        const row =
            document.createElement("div");


        row.className =
            "vehicle-row";



        const statusClass =
            vehicle.status === "working"
            ? "status-working"
            : "status-fault";



        const notes =
            vehicle.notes &&
            vehicle.notes.trim() !== ""
            ? "📝"
            : "";



        row.innerHTML = `


            <div class="vehicle-cell">

                <span class="status-dot ${statusClass}">
                </span>

            </div>



            <div class="vehicle-cell vehicle-number">

                ${vehicle.number}

            </div>



            <div class="vehicle-cell vehicle-driver">

                ${vehicle.driver || "-"}

            </div>



            <div class="vehicle-cell vehicle-notes">

                ${notes}

                ${vehicle.notes || "-"}

            </div>


        `;



        row.onclick = ()=>{

            openVehicleModal(vehicle);

        };



        // إضافة للقسم الصحيح

        if(vehicle.type === "private")

            privateList.appendChild(row);



        else if(vehicle.type === "truck")

            truckList.appendChild(row);



        else if(vehicle.type === "equipment")

            equipmentList.appendChild(row);


    });



    // تحديث الإحصائيات

    privateTotal.textContent =
        stats.private.total;

    privateWorking.textContent =
        stats.private.working;

    privateFault.textContent =
        stats.private.fault;



    truckTotal.textContent =
        stats.truck.total;

    truckWorking.textContent =
        stats.truck.working;

    truckFault.textContent =
        stats.truck.fault;



    equipmentTotal.textContent =
        stats.equipment.total;

    equipmentWorking.textContent =
        stats.equipment.working;

    equipmentFault.textContent =
        stats.equipment.fault;


}
//==================================================
// فتح نافذة تعديل المركبة
//==================================================

function openVehicleModal(vehicle){


    selectedVehicle = vehicle;


   modalNumber.value =
    vehicle.number;

modalNumber.readOnly = true;

    modalDriver.value =
        vehicle.driver || "";


    modalStatus.value =
        vehicle.status;


    modalNotes.value =
        vehicle.notes || "";



    modal.classList.remove("hidden");

}



//==================================================
// حفظ التعديلات
//==================================================

saveButton.addEventListener(
    "click",
    function(){

        if(!selectedVehicle)
            return;


        let changeProtectedData = false;


        if(
            modalNumber.value.trim()
            !== selectedVehicle.number
        ){

            changeProtectedData = true;

        }


        if(
            modalDriver.value.trim()
            !== selectedVehicle.driver
        ){

            changeProtectedData = true;

        }


        if(
            modalStatus.value
            !== selectedVehicle.status
        ){

            changeProtectedData = true;

        }



        if(changeProtectedData){


            let password =
                prompt(
                "🔐 أدخل الرقم السري لتعديل البيانات الأساسية"
                );


            if(password !== "16996"){

                alert(
                "❌ الرقم السري غير صحيح"
                );

                return;

            }

        }



        selectedVehicle.number =
            modalNumber.value.trim();


        selectedVehicle.driver =
            modalDriver.value.trim();


        selectedVehicle.status =
            modalStatus.value;


        selectedVehicle.notes =
            modalNotes.value.trim();


        selectedVehicle.updatedAt =
            new Date().toLocaleString("ar-SA");



        saveData();


        displayVehicles();


        closeModal();


    }
);
//==================================================
// إغلاق النافذة
//==================================================

cancelButton.addEventListener(
    "click",
    function(){

        closeModal();

    }
);



function closeModal(){

    modal.classList.add("hidden");

    selectedVehicle = null;

}
//==================================================
// البحث
//==================================================

search.addEventListener(
    "input",
    function(){


        const value =
            this.value
            .trim()
            .toLowerCase();



        if(value === ""){

            displayVehicles();

            return;

        }



        const result =
            vehicles.filter(vehicle => {


                return (

                    vehicle.number
                    .toLowerCase()
                    .includes(value)


                    ||

                    vehicle.driver
                    .toLowerCase()
                    .includes(value)


                    ||

                    vehicle.notes
                    .toLowerCase()
                    .includes(value)

                );


            });



        displayVehicles(result);


    }
);



//==================================================
// تشغيل النظام
//==================================================

loadData();


displayVehicles();
