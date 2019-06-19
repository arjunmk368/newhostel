$(document).ready(function () {
    $(".checkmark").on('change', function () {
        create_send_data(this)
    });

    $(".checkmark1").on('change', function () {
        create_send_data(this)
    });

    $(".checkmark2").on('change', function () {
        create_send_data(this)
    });
    $(".login100-form-btn").on('click', function () {

    });
});

$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#minimal-tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function create_send_data(object) {
    var row = $(object).parent().parent().parent();
    var reg_no = row.children(".reg_no").text();
    var pincode = row.children(".pincode").children().val();

    var attendance = row.children(".attendance").children().children().is(":checked");
    var year_back = row.children(".year_back").children().children().is(":checked");
    var category = row.children(".category").children().children().is(":checked");
    console.log(reg_no);

}


function load_data() {
    // var dept = document.getElementById("dept").value;
    var course = document.getElementById("course").value;
    // var gender = document.getElementById("gender").value;
    var csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    console.log("load data function");
    console.log(course);
    $.ajax("/department/getdata/", {
        method: "post",
        data: {
            course: course,
            // gender: gender,
            csrfmiddlewaretoken: csrf,
        },

        success: function (data) {


            $("#minimal-tbody").html(data);


            $(".allotment_submit").on("click", function () {
                // var select = $($(this).parent().parent()).children(".rs-select2").children(".hostel").val();
                var course = document.getElementById('course').value;
                var reg = $($(this).parent().parent()).children(".reg_no").text();
                var pin = $($(this).parent().parent()).children(".pincode").children(".pin").val();
                var gender = $($(this).parent().parent()).children(".gender").children(".gender_desc").val();
                var yearofstudy = $($(this).parent().parent()).children(".yearofstudy").children(".yearofstudy_desc").val();
                var yearback = $($(this).parent().parent()).children(".year_back").children(".cont1").children(".year").is(":checked");
                var category = $($(this).parent().parent()).children(".category").children(".cont2").children(".category-inner").is(":checked");
                var prime = $($(this).parent().parent()).children(".prime").children(".prime_desc").val();
                var handicapped = $($(this).parent().parent()).children(".handicapped").children(".physically_desc").val();
                var keralaite = $($(this).parent().parent()).children(".keralaite").children(".keralaite_desc").val();
                console.log(gender);
                console.log(keralaite);
                $.ajax("/department/savedata/", {
                    method: "post",
                    data: {
                        reg: reg,
                        pin: pin,
                        gender: gender,
                        yearback: yearback,
                        category: category,
                        csrfmiddlewaretoken: csrf,
                        yearofstudy: yearofstudy,
                        handicapped: handicapped,
                        prime: prime,
                        nativity: keralaite,
                    },
                });

            });
        }
    });
}

// window.onload = function(){
//     load_courses();
//     load_data();
// };
//
// function load_courses() {
//
//     var courses = {
//         "DDU Kaushal Kendras (DDUKK)": ["M.Voc", "B.Voc"],
//         "Department of Applied Chemistry": ["M.Sc", "Integrated M.Sc", "M.Phil", "Ph.D"],
//         "Department of Applied Economics": ["M.A", "M.Phil", "Ph.D"],
//         "Department of Atmospheric Sciences": ["M.Sc", "M.Tech", "Ph.D"],
//         "Department of Biotechnology": ["M.Sc", "Ph.D"],
//         "Department of Chemical Oceanography": ["M.Sc", "M.Phil", "Ph.D"],
//         "Department of Computer Applications": ["MCA", "MSc", "Ph.D"],
//         "Department of Computer Science": ["M.Tech", "Ph.D"],
//         "Department of Electronics": ["M.Sc", "M.Tech", "Ph.D"],
//         "Department of Hindi": ["M.A", "M.Phil", "Ph.D"],
//         "Department of Instrumentation": ["B.Tech", "M.Tech", "M.Sc", "Ph.D"],
//         "Department of Marine Biology, Microbiology and Biochemistry": ["M.Sc", "M.Tech", "Ph.D"],
//         "Department of Marine Geology and Geophysics": ["M.Sc", "Ph.D"],
//         "Department of Mathematics": ["M.Sc", "M.Phil", "Ph.D"],
//         "Department of Physical Oceanography": ["M.Sc", "M.Tech", "Ph.D"],
//         "Department of Physics": ["M.Sc", "M.Phil", "Ph.D"],
//         "Department of Polymer Science and Rubber Technology": ["B.Tech", "M.Tech", "Ph.D"],
//         "Department of Ship Technology": ["B.Tech", "M.Tech"],
//         "Department of Statistics": ["M.Sc", "M.Tech", "Ph.D"],
//         "Inter University Centre for IPR Studies (IUCIPRS)": ["LLM", "Ph.D"],
//         "International School of Photonics": ["Integrated M.Sc", "Ph.D"],
//         "National Centre for Aquatic Animal Health (NCAAH)": ["M.Tech", "Ph.D"],
//         "School of Engineering": ["Civil Engg.(B.Tech)",
//             "Computer Science & Engg.(B.Tech)",
//             "Electrical and Electronics Engg.(B.Tech)",
//             "Electronics & Communication Engg.(B.Tech)",
//             "Information Technology(B.Tech)",
//             "Mechanical Engg.(B.Tech)",
//             "Safety & Fire Engg(B.Tech)",
//             "Civil Engg.(M.Tech)",
//             "Computer Science & Engg.(M.Tech)",
//             "Electrical and Electronics Engg.(M.Tech)",
//             "Electronics & Communication Engg.(M.Tech)",
//             "Information Technology(M.Tech)",
//             "Mechanical Engg.(M.Tech)",
//             "Safety & Fire Engg(M.Tech)"],
//         "School of Environmental Studies": ["M.Sc", "M.Tech", "Ph.D"],
//         "School of Industrial Fisheries": ["M.Sc", "M.Phil", "Ph.D"],
//         "School of Legal Studies": ["LLB", "LLM"],
//         "School of Management Studies": ["MBA", "Ph.D"]
//     };
//     var course = document.getElementById("course");
//     var i;
//     course.innerHTML = "";
//     // var d = document.getElementById("dept");
//     // var dep = d.options[d.selectedIndex].value;
//     dep = "Department of Applied Chemistry";
//     for (i in courses[dep]) {
//         var options = document.createElement("option");
//         options.text = courses[dep][i];
//         options.value = courses[dep][i];
//         course.add(options);
//     }
// }

function changeColor(btn) {

    btn.style.backgroundColor = "#b5b3b2";

}

function priority() {
    console.log('a');
    var course = document.getElementById('course').value;
    var csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    $.ajax('priority/', {
        method: 'post',
        data: {
            course: course,
            csrfmiddlewaretoken: csrf
        },
        success: function (data) {
            back_data = $("html").html();
            $("html").html(data)
        }
    });
}

function goback() {
    $.ajax('/department/', {
        method: 'get',

        success: function (data) {
            $("html").html(data)
        }
    });
}


