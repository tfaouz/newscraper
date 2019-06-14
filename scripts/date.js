var makeDate = function () {
    var d = new Date();
    var formattedDate = "";

    formattedDate += (d.getMonth() + 1) + "_";
    // adds month, +1 because it starts at 0 index
    formattedDate += d.getDate() + "_";
    // adds date
    formattedDate += d.getFullYear();
    //adds year
    return formattedDate;
};

module.exports = makeDate;