const questionTemplate = Handlebars.compile($("#question-template").html());

var currentQuestion;

function showQuestion(questionId) {
  console.log("Retrieving question with id", questionId);
  emoting
    .read(questionId)
    .done(function (res) {
      console.log("[OK]", res.data);
      currentQuestion = res.data;

      const context = {};
      context.ratingChoices = ratingChoices;
      context.question = res.data;

      $("#empty-layout-body").html(questionTemplate(context));
      $(".rating").on("click", handleRating);

      $("#section-loading").fadeOut().hide();
      $("#empty-layout").fadeIn().css("display", "flex");
    })
    .fail(function (error) {
      console.log("[KO]", error);
    });
}

function handleRating(event) {
  const rating = $(event.target);
  const value = rating.attr("data-value");
  const shake = rating.attr("data-shake");
  console.log("Clicked on rating: ", value);

  rating.addClass(`shake-constant ${shake}`);

  emoting
    .rate(currentQuestion.id, value)
    .done(function (res) {
      console.log("[OK] Rated!", res.data);
    })
    .error(function (error) {
      console.log("[KO]", error);
    });

  // animate no matter what
  setTimeout(function () {
    rating.removeClass(`shake-constant ${shake}`);
  }, 250);
}
