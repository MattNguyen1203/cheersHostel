const listMsg = {
  empty: "Please fill out this field.",
  invalid: "Please enter correct value",
  checkin: "Departure date must be greater than the current date",
  checkout: "Checkout date must be greater than departure date",
};

//check empty with required field
function isEmpty(value) {
  return value.trim() === "";
}
//check date: > today, checkout > check in
function isValidDate(date, compareVal) {
  const dateRes = new Date(date);
  const today = new Date();

  const dateCompare = compareVal === "today" ? today : new Date(compareVal);

  return dateRes >= dateCompare;
}
//check phone number
function isValidPhoneNumber(phone) {
  return /^\d{10,11}$/.test(phone);
}
// check valid email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// check validate when blur
function handleBlurInput(parentId, required, validateFnc) {
  const parentDom = document.getElementById(parentId);
  const input = parentDom.querySelector("input");
  input.addEventListener("blur", () => {
    return isValidateInput(parentId, required, validateFnc);
  });
}

// common function to validate input
function isValidateInput(parentId, required, validateFnc) {
  const parentDom = document.getElementById(parentId);
  const input = parentDom.querySelector("input");
  const val = input.value;
  let isError = true;
  if (required && isEmpty(val)) {
    displayErrorMsg(parentId, listMsg.empty);
    isError = true;
  } else if (validateFnc && !validateFnc(val)) {
    displayErrorMsg(parentId, listMsg.invalid);
    isError = true;
  } else {
    displayErrorMsg(parentId, "");
    isError = false;
  }

  return {
    isError: isError,
    value: val,
  };
}

//handle onchange event
function handleChangeInput(parentId, resId) {
  const parentDom = document.getElementById(parentId);

  const input = parentDom.querySelector("input");
  const resDom = document.querySelector(`#${resId} .res-val`);

  input.addEventListener("change", (e) => {
    const val = e.target.value;

    resDom.innerHTML = val;
  });
}

// handle input[type=date]
function calculateTimeDifference(startDate, endDate) {
  // Convert the dates to milliseconds since January 1, 1970
  const startMilliseconds = startDate.getTime();
  const endMilliseconds = endDate.getTime();

  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(endMilliseconds - startMilliseconds);

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return days;
}
function handleChangeDate(parentId, placeholder, resId) {
  const parentDom = document.getElementById(parentId);
  const input = parentDom.querySelector("input");
  const inputRes = parentDom.querySelector(".date-res");
  const resVal = document.querySelector(`#${resId} .res-val`);
  const numberNight = document.querySelector(`#hostel-res-duration .res-val`);
  const isCheckin = parentId === "hostel_checkin";

  input.addEventListener("change", (e) => {
    const val = input.value;

    // check empty
    if (val) {
      inputRes.innerHTML = val;
      displayErrorMsg(parentId, "");
    } else {
      inputRes.innerHTML = placeholder;
      displayErrorMsg(parentId, listMsg.empty);
      return;
    }
    resVal.innerHTML = val;

    if (isCheckin) {
      isValidDate(val, "today")
        ? displayErrorMsg(parentId, "")
        : displayErrorMsg(parentId, listMsg.checkin);
    } else {
      const checkinVal = document.querySelector("#hostel_checkin input").value;
      isValidDate(val, checkinVal)
        ? displayErrorMsg(parentId, "")
        : displayErrorMsg(parentId, listMsg.checkout);

      if (isValidDate(val, checkinVal)) {
        displayErrorMsg(parentId, "");
        const startDate = new Date(checkinVal);
        const endDate = new Date(val);
        numberNight.innerHTML =
          calculateTimeDifference(startDate, endDate) + " nights";
      } else {
        displayErrorMsg(parentId, listMsg.checkout);
      }
    }
  });
}

// handle quantity
function handleQuantity(parentId, type) {
  const parentDom = document.getElementById(parentId);
  const input = parentDom.querySelector("input");
  const minus = parentDom.querySelector(".minus");
  const plus = parentDom.querySelector(".plus");
  const isAdult = type === "adult";

  const inputTotal = document.querySelector(
    ".hostel__detail-form .form_sub-total .qty-total"
  );

  const resAdult = document.querySelector(
    ".hostel__detail-form #hostel-res-qty .res-val .adult strong"
  );

  const resChild = document.querySelector(
    ".hostel__detail-form #hostel-res-qty .res-val .children strong"
  );

  input.addEventListener("change", (e) => {
    const currentTotal = Number(inputTotal.innerHTML);
    const val = Number(e.target.value);
    inputTotal.innerHTML = currentTotal + val;

    if (isAdult) {
      resAdult.innerHTML = val;
    } else {
      resChild.innerHTML = val;
    }
  });
  minus.addEventListener("click", () => {
    const currentTotal = Number(inputTotal.innerHTML);

    if (input.value > 0) {
      inputTotal.innerHTML = currentTotal - 1;
      input.value = Number(input.value) - 1;
      if (isAdult) {
        resAdult.innerHTML = Number(input.value);
      } else {
        resChild.innerHTML = Number(input.value);
      }
    }
  });

  plus.addEventListener("click", () => {
    const currentTotal = Number(inputTotal.innerHTML);

    inputTotal.innerHTML = currentTotal + 1;
    input.value = Number(input.value) + 1;

    if (isAdult) {
      resAdult.innerHTML = Number(input.value);
    } else {
      resChild.innerHTML = Number(input.value);
    }
  });
}

function displayErrorMsg(parentID, msg) {
  const msgDom = document.querySelector(`#${parentID} .form-item-msg`);
  msgDom.innerHTML = msg;
}

// handle Msg
function handleMsg() {
  const msg = document.getElementById("hostel_msg");
  const resMsg = document.querySelector("#hostel-res-msg .res-val");

  msg.addEventListener("change", (e) => {
    resMsg.innerHTML = e.target.value;
  });
}

//call function check validate
handleBlurInput("hostel_name", true, null);
handleBlurInput("hostel_phone", true, isValidPhoneNumber);
handleBlurInput("hostel_mail", true, isValidEmail);
handleBlurInput("hostel_nationality", true, null);

//call function handle onchange event
handleChangeInput("hostel_name", "hostel-res-name");
handleChangeInput("hostel_mail", "hostel-res-mail");
handleChangeInput("hostel_phone", "hostel-res-phone");
handleChangeInput("hostel_nationality", "hostel-res-nationality");

// handle Date
handleChangeDate("hostel_checkin", "Check-in", "hostel-res-checkin");
handleChangeDate("hostel_checkout", "Check-out", "hostel-res-checkout");
// handle quantity
handleQuantity("hostel_qty-adult", "adult");
handleQuantity("hostel_qty-child", "children");
// handle msg
handleMsg();

//submit action

const submitBtn = document.querySelector(".hostel__detail-form .submit-btn");

submitBtn.addEventListener("click", () => {
  // const name = document.querySelector("#hostel_name input");
  // const phone = document.querySelector("#hostel_phone input");
});
