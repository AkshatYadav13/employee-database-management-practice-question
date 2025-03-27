(async function () {
  const DEFAULT_IMAGE_URL =
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtaWNvbjQtamlyMjA2NC1wb3ItbC5qcGc.jpg";

  const res = await fetch("../data.json");
  const data = await res.json();

  const employees = data;
  let selectedEmpId = employees[0].id;
  let selectedEmp = employees[0];

  const empList = document.getElementById("emp-list-box");
  const empInfo = document.getElementById("emp-info-box");
  const addEmpbtn = document.getElementById("add-emp-btn");

  //   select emp logic
  empList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && e.target.id !== selectedEmpId) {
      selectedEmpId = e.target.id;
      selectedEmp = employees.find((emp) => emp.id == selectedEmpId);
      renderEmployees();
      renderSelectedEmpInfo();
    }
  });

  //add employee
  const addEmpBtn = document.getElementById("add-emp-btn");
  const addEmpFormBtn = document.getElementById("add-emp-form-btn");
  const addEmpModal = document.getElementById("add-emp-modal");
  const addEmpForm = document.getElementById("add-emp-form");

  addEmpbtn.addEventListener("click", () => {
    toggleAddEmpForm(true);
  });

  addEmpModal.addEventListener("click", (e) => {
    if (e.target.id === "add-emp-modal") {
      toggleAddEmpForm(false);
    }
  });

  function toggleAddEmpForm(action) {
    addEmpModal.style.display = action ? "flex" : "none";
  }

  const dobInput = document.getElementById("add-emp-dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dob = formData.get("dob");

    const age =
      new Date().getFullYear() - parseInt(dob.substring(0, dob.indexOf("-")));

    const userData = {
      id: Date.now(),
      firstName: formData.get("fname"),
      lastName: formData.get("lname"),
      email: formData.get("email"),
      contactNumber: formData.get("contact-no"),
      salary: formData.get("salary"),
      address: formData.get("address"),
      imageUrl: formData.get("image-url") || DEFAULT_IMAGE_URL,
      dob,
      age,
    };

    data.push(userData);
    renderEmployees();
    form.reset();
    toggleAddEmpForm(false);
  });

  // ui rendering

  const renderEmployees = () => {
    empList.innerHTML = "";

    employees.forEach((emp) => {
      const empSelector = document.createElement("span");
      empSelector.classList.add("emp-selector");

      empSelector.setAttribute("id", emp.id);

      empSelector.textContent = `${emp.firstName} ${emp.lastName}`;

      if (emp.id == selectedEmpId) {
        const icon = document.createElement("i");
        icon.textContent = "✔️";
        empSelector.append(icon);
      }
      empList.append(empSelector);
    });
  };

  const renderSelectedEmpInfo = () => {
    empInfo.innerHTML = `
        <img
        src="${selectedEmp.imageUrl}"
        alt=""
        />
        <h3>${selectedEmp.firstName + " " + selectedEmp.lastName}</h3>
        <span>${selectedEmp.address}</span>
        <span>${selectedEmp.email}</span>
        <span>${selectedEmp.contactNumber}</span>
        <span>Dob - ${selectedEmp.dob}</span>
        <span>Age - ${selectedEmp.age}</span>
    `;
  };

  renderEmployees();
  renderSelectedEmpInfo();
})();
