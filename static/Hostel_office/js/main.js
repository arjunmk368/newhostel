function load_data() {
    var dept = document.getElementById("dept").value;
    var course = document.getElementById("course").value;
    var gender = document.getElementById("gender").value;
    var keralite = document.getElementById("keralite").value;
    var csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    $.ajax("/office/getdata/", {
        method: "post",
        data: {
            dept: dept,
            course: course,
            gender: gender,
            keralite : keralite,
            csrfmiddlewaretoken: csrf,
        },

        success: function (data) {

            $("#minimal-tbody").html(data);


            $(".allotment_submit").on("click", function () {
                var select = $($(this).parent().parent()).children(".rs-select2").children(".hostel").val();
                var reg = $($(this).parent().parent()).children(".reg_no").text();
                var ischeck = $($(this).parent().parent()).children(".allot").children(".cont1").children(".alloted").is(":checked");
                var room = $($(this).parent().parent()).children(".room_no").children(".room").val();
                $.ajax("/office/savedata/", {
                    method: "post",
                    data: {
                        select: select,
                        reg: reg,
                        ischeck: ischeck,
                        room: room,
                        csrfmiddlewaretoken: csrf
                    }
                });

            });

            $(".print_button").on("click", function () {
                var select = $($(this).parent().parent()).children(".reg_no").text();
                console.log(select);
                $.ajax("/office/printdata/", {
                    method: "post",
                    data: {
                        regno: select,
                        csrfmiddlewaretoken: csrf
                    },
                    success: function (data) {
                        back_data =$('html').html()
                        $('html').html(data)
                    }
                });

            });
        }
    });
}


function load_course_and_date() {
    load_course();
    load_data();

}

function changeColor(btn) {
    var ischeck = $($(btn).parent().parent()).children(".allot").children(".cont1").children(".alloted").is(":checked");
    var select = $($(btn).parent().parent()).children(".rs-select2").children(".hostel").val();
    if (ischeck) {
        if (select != null) {
            console.log(ischeck);
            btn.style.backgroundColor = "#b5b3b2";
        }
    } else {
        btn.style.backgroundColor = "#57b846";
    }

}

function load_dept_office() {

    var departments = [
        "DDU Kaushal Kendras (DDUKK)",
        "Department of Applied Chemistry",
        "Department of Applied Economics",
        "Department of Atmospheric Sciences",
        "Department of Biotechnology",
        "Department of Chemical Oceanography",
        "Department of Computer Applications",
        "Department of Computer Science",
        "Department of Electronics",
        "Department of Hindi",
        "Department of Instrumentation",
        "Department of Marine Biology, Microbiology and Biochemistry",
        "Department of Marine Geology and Geophysics",
        "Department of Mathematics",
        "Department of Physical Oceanography",
        "Department of Physics",
        "Department of Polymer Science and Rubber Technology",
        "Department of Ship Technology",
        "Department of Statistics",
        "Inter University Centre for IPR Studies (IUCIPRS)",
        "International School of Photonics",
        "National Centre for Aquatic Animal Health (NCAAH)",
        "School of Engineering",
        "School of Environmental Studies",
        "School of Industrial Fisheries",
        "School of Legal Studies",
        "School of Management Studies"];
    var dept_select = document.getElementById("dept");
    var i;
    for (i in departments) {
        var options = document.createElement("option");
        options.text = departments[i];
        options.value = departments[i];
        dept_select.add(options);
    }

    load_courses()

}

function load_courses() {
    var courses_field = document.getElementById('courses');
    if (courses_field) {
        courses_field.value = '';
        var courses = {
            "DDU Kaushal Kendras (DDUKK)": ["M.Voc", "B.Voc"],
            "Department of Applied Chemistry": ["M.Sc", "Integrated M.Sc", "M.Phil", "Ph.D"],
            "Department of Applied Economics": ["M.A", "M.Phil", "Ph.D"],
            "Department of Atmospheric Sciences": ["M.Sc", "M.Tech", "Ph.D"],
            "Department of Biotechnology": ["M.Sc", "Ph.D"],
            "Department of Chemical Oceanography": ["M.Sc", "M.Phil", "Ph.D"],
            "Department of Computer Applications": ["MCA", "MSc", "Ph.D"],
            "Department of Computer Science": ["M.Tech", "Ph.D"],
            "Department of Electronics": ["M.Sc", "M.Tech", "Ph.D"],
            "Department of Hindi": ["M.A", "M.Phil", "Ph.D"],
            "Department of Instrumentation": ["B.Tech", "M.Tech", "M.Sc", "Ph.D"],
            "Department of Marine Biology, Microbiology and Biochemistry": ["M.Sc", "M.Tech", "Ph.D"],
            "Department of Marine Geology and Geophysics": ["M.Sc", "Ph.D"],
            "Department of Mathematics": ["M.Sc", "M.Phil", "Ph.D"],
            "Department of Physical Oceanography": ["M.Sc", "M.Tech", "Ph.D"],
            "Department of Physics": ["M.Sc", "M.Phil", "Ph.D"],
            "Department of Polymer Science and Rubber Technology": ["B.Tech", "M.Tech", "Ph.D"],
            "Department of Ship Technology": ["B.Tech", "M.Tech"],
            "Department of Statistics": ["M.Sc", "M.Tech", "Ph.D"],
            "Inter University Centre for IPR Studies (IUCIPRS)": ["LLM", "Ph.D"],
            "International School of Photonics": ["Integrated M.Sc", "Ph.D", "M.Tech"],
            "National Centre for Aquatic Animal Health (NCAAH)": ["M.Tech", "Ph.D"],
            "School of Engineering": ["Civil Engg.(B.Tech)",
                "Computer Science & Engg.(B.Tech)",
                "Electrical and Electronics Engg.(B.Tech)",
                "Electronics & Communication Engg.(B.Tech)",
                "Information Technology(B.Tech)",
                "Mechanical Engg.(B.Tech)",
                "Safety & Fire Engg(B.Tech)",
                "Civil Engg.(M.Tech)",
                "Computer Science & Engg.(M.Tech)",
                "Electrical and Electronics Engg.(M.Tech)",
                "Electronics & Communication Engg.(M.Tech)",
                "Information Technology(M.Tech)",
                "Mechanical Engg.(M.Tech)",
                "Safety & Fire Engg(M.Tech)"],
            "School of Environmental Studies": ["M.Sc", "M.Tech", "Ph.D"],
            "School of Industrial Fisheries": ["M.Sc", "M.Phil", "Ph.D"],
            "School of Legal Studies": ["LLB", "LLM"],
            "School of Management Studies": ["MBA", "Ph.D"]
        };
        var course = document.getElementById("course");
        var i;
        course.innerHTML = "";
        var d = document.getElementById("dept");
        var dep = d.options[d.selectedIndex].value;
        for (i in courses[dep]) {
            var divs = `<div class="row d-flex text-left">
                        <div class="col col-md-1 ">
                            <input class="checkbox" type="checkbox" value="` + courses[dep][i] + `">
                        </div>
                        <div class="col col-md-11">
                            ` + courses[dep][i] + `
                        </div>
                    </div>`;

            course.innerHTML += (divs);
        }
        $(".checkbox").on("change", function () {
            if (this.checked == true) {
                console.log(this)
                $("#courses").val(this.value + "," + $("#courses").val())
            } else {
                $("#courses").val($("#courses").val().replace(this.value + ",", ""))
            }
        });
    }
}

function course_option() {
    var course = document.getElementById("course").value;
    if (course === "other") {
        var elem = document.getElementById('course_oth');
        elem.style.display = 'block'

    }

}

function hashing() {
    console.log('hiii');
    var raw1 = document.getElementById('password1').value;
    var raw2 = document.getElementById('password2').value;
    if (raw1 == raw2) {
        document.getElementById('password1').value = sha512(raw1);
        document.getElementById('password2').value = sha512(raw2);

        document.getElementById('create_dept').submit();
    } else {
        event.preventDefault();
        console.log('hiii');
        document.getElementById('error').style.display = 'block';


    }


}

function load_course() {

    var courses = {
        "DDU Kaushal Kendras (DDUKK)": ["M.Voc", "B.Voc"],
        "Department of Applied Chemistry": ["M.Sc", "Integrated M.Sc", "M.Phil", "Ph.D"],
        "Department of Applied Economics": ["M.A", "M.Phil", "Ph.D"],
        "Department of Atmospheric Sciences": ["M.Sc", "M.Tech", "Ph.D"],
        "Department of Biotechnology": ["M.Sc", "Ph.D"],
        "Department of Chemical Oceanography": ["M.Sc", "M.Phil", "Ph.D"],
        "Department of Computer Applications": ["MCA", "MSc", "Ph.D"],
        "Department of Computer Science": ["M.Tech", "Ph.D"],
        "Department of Electronics": ["M.Sc", "M.Tech", "Ph.D"],
        "Department of Hindi": ["M.A", "M.Phil", "Ph.D"],
        "Department of Instrumentation": ["B.Tech", "M.Tech", "M.Sc", "Ph.D"],
        "Department of Marine Biology, Microbiology and Biochemistry": ["M.Sc", "M.Tech", "Ph.D"],
        "Department of Marine Geology and Geophysics": ["M.Sc", "Ph.D"],
        "Department of Mathematics": ["M.Sc", "M.Phil", "Ph.D"],
        "Department of Physical Oceanography": ["M.Sc", "M.Tech", "Ph.D"],
        "Department of Physics": ["M.Sc", "M.Phil", "Ph.D"],
        "Department of Polymer Science and Rubber Technology": ["B.Tech", "M.Tech", "Ph.D"],
        "Department of Ship Technology": ["B.Tech", "M.Tech"],
        "Department of Statistics": ["M.Sc", "M.Tech", "Ph.D"],
        "Inter University Centre for IPR Studies (IUCIPRS)": ["LLM", "Ph.D"],
        "International School of Photonics": ["Integrated M.Sc", "Ph.D", "M.Tech"],
        "National Centre for Aquatic Animal Health (NCAAH)": ["M.Tech", "Ph.D"],
        "School of Engineering": ["Civil Engg.(B.Tech)",
            "Computer Science & Engg.(B.Tech)",
            "Electrical and Electronics Engg.(B.Tech)",
            "Electronics & Communication Engg.(B.Tech)",
            "Information Technology(B.Tech)",
            "Mechanical Engg.(B.Tech)",
            "Safety & Fire Engg(B.Tech)",
            "Civil Engg.(M.Tech)",
            "Computer Science & Engg.(M.Tech)",
            "Electrical and Electronics Engg.(M.Tech)",
            "Electronics & Communication Engg.(M.Tech)",
            "Information Technology(M.Tech)",
            "Mechanical Engg.(M.Tech)",
            "Safety & Fire Engg(M.Tech)"],
        "School of Environmental Studies": ["M.Sc", "M.Tech", "Ph.D"],
        "School of Industrial Fisheries": ["M.Sc", "M.Phil", "Ph.D"],
        "School of Legal Studies": ["LLB", "LLM"],
        "School of Management Studies": ["MBA", "Ph.D"]
    };
    var course = document.getElementById("course");
    var i;
    course.innerHTML = "";
    // var d = document.getElementById("dept");
    // var dep = d.options[d.selectedIndex].value;
    dep = "Department of Applied Chemistry";
    for (i in courses[dep]) {
        var options = document.createElement("option");
        options.text = courses[dep][i];
        options.value = courses[dep][i];
        course.add(options);
    }
}

load_dept_office();

$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#minimal-tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

