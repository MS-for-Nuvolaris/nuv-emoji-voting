const homeTemplate = Handlebars.compile($("#home-template").html());

function showHome() {
  $("#section-loading").hide();
  $("#default-layout-body").html(homeTemplate());
  $("#default-layout").css("display", "flex");
}

// fill the question field with a sample text
function setSampleQuestion(title) {
  $("#title").val(title);
}

// create new question
$(document).on("submit", "#questionCreate", function (e) {
  e.preventDefault();

  const questionTitle = $("#title").val();
  console.log("Submitting question: ", questionTitle);

  emoting
    .create(questionTitle)
    .done(function (res) {
      console.log("[OK] Redirecting to: ", res.data.id);
      window.location.hash = `#/${res.data.id}/admin`;
    })
    .fail(function (error) {
      console.log("[KO]", error);
    });
});
