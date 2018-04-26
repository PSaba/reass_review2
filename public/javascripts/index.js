$(function() {
    //Login
    const loginInput = document.querySelector("#loginDynamicInput");
    const loginInputIcon = $("#login-input-icon");
    const loginInputLabels = $("#login-input-labels");
    const loginMessageContainer = $("#login-errors");
  
    const loginData = {
      email: null,
      password: null
    };
  
    let loginStep = "email";
  
    //Join
    const joinInput = document.querySelector("#joinDynamicInput");
    const joinInputIcon = $("#join-input-icon");
    const joinInputLabels = $("#join-input-labels");
    const joinMessageContainer = $("#join-errors");
  
    const joinData = {
      email: null,
      name: null,
      password: null
    };
  
    let joinStep = "email";
  
    // Login
    $("#auth-login").submit(function(e) {
      e.preventDefault();
      switch (loginStep) {
        case "email":
          const userEmail = loginInput.value.trim();
          //regex email check
          loginData.email = userEmail;
          loginInputIcon.html('<i class="fas fa-key"></i>');
          loginInput.value = "";
          loginInput.placeholder = "Password";
          loginInput.type = "password";
          loginInputLabels.addClass("to-password");
          loginStep = "password";
          break;
        case "password":
          loginData.password = loginInput.value.trim();
          console.log("SUBMIT FORM");
          axios.post('/users/login', loginData)
          .then(function (response) {
            window.location.replace("/dashboard");
          })
          .catch(function (error) {
            loginMessageContainer.removeClass("hide").text(error.response.data);
            joinInputIcon.html('<i class="far fa-envelope"></i>');
            joinInput.value = "";
            joinInput.placeholder = "Email";
            joinInput.type = "email";
            joinInputLabels.removeClass("to-password");
            joinStep = "email";
          });
          break;
        default:
          break;
      }
    });
  
    // Join
    $("#auth-join").submit(function(e) {
      e.preventDefault();
      switch (joinStep) {
        case "email":
          joinData.email = joinInput.value.trim();
          joinInputIcon.html('<i class="fas fa-user-secret"></i>');
          joinInput.value = "";
          joinInput.placeholder = "Name";
          joinInput.type = "text";
          joinInputLabels.addClass("to-name");
          joinStep = "name";
          break;
        case "name":
          joinData.name = joinInput.value.trim();
          joinInputIcon.html('<i class="fas fa-key"></i>');
          joinInput.value = "";
          joinInput.placeholder = "Password";
          joinInput.type = "password";
          joinInputLabels.addClass("to-password");
          joinStep = "password";
          break;
        case "password":
          joinData.password = joinInput.value.trim();
          console.log("SUBMIT FORM");
          axios.post('/users/', joinData)
          .then(function (response) {
            window.location.replace("/dashboard");
          })
          .catch(function (error) {
            joinMessageContainer.removeClass("hide").text(error.response.data);
            joinInputIcon.html('<i class="far fa-envelope"></i>');
            joinInput.value = "";
            joinInput.placeholder = "Email";
            joinInput.type = "email";
            joinInputLabels.removeClass("to-password").removeClass("to-name");
            joinStep = "email";
          });

          break;
        default:
          break;
      }
    });
  });
  