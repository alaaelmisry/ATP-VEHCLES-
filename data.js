const vehicles = [];

// ======================
// PRIVATE
// ======================

const privateNumbers = [
    "4552",
    "4553",
    "4554",
    "4556",
    "4557",
    "4558",
    "4559",
    "2924",
    "2932",
    "2950",
    "4676",
    "4677",
    "2062",
    "2087",
    "6031",
    "6032",
    "6033",
    "3162"
];

privateNumbers.forEach((number, index) => {

    vehicles.push({

        id: index + 1,

        number: number,

        driver: "",

        type: "private",

        status: "working",

        notes: ""

    });

});


// ======================
// TRUCKS
// ======================

const truckNumbers = [
    "7001",
    "7002",
    "7003",
    "7004",
    "7005",
    "7006",
    "7007",
    "7008",
    "7009",
    "7010",
    "7011",
    "7012",
    "7013",
    "7014",
    "7015",
    "7016",
    "7017",
    "7018",
    "7019",
    "7020",
    "7021",
    "7022",
    "7023",
    "7024",
    "7025",
    "7026",
    "7027",
    "7028",
    "7029",
    "7030",
    "7031",
    "7032",
    "7033",
    "7034",
    "7035"
];

truckNumbers.forEach((number, index) => {

    vehicles.push({

        id: 31 + index,

        number: number,

        driver: "",

        type: "truck",

        status: "working",

        notes: ""

    });

});
// ======================
// EQUIPMENTS
// ======================

for (let i = 1; i <= 35; i++) {

    vehicles.push({

        id: 66 + i,

        number: "EQ-" + String(i).padStart(3, "0"),

        driver: "",

        type: "equipment",

        status: "working",

        notes: ""

    });

}
