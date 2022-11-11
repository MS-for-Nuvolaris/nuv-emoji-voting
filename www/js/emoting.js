const apiUrl = "http://localhost:3233/api/v1/web/nuvolaris/emojivote";
const ratingChoices = ["verygood", "good", "bad", "verybad"];
const emoting = {
  create(questionTitle) {
    return $.ajax({
      type: "POST",
      url: `${apiUrl}/question-create`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        title64: window.btoa(encodeURIComponent(questionTitle)),
      }),
    });
  },

  read(questionId) {
    return $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: `${apiUrl}/question-read?id=${questionId}`,
    });
  },

  rate(questionId, ratingValue) {
    return $.ajax({
      type: "POST",
      url: `${apiUrl}/rating-create`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        qId: questionId,
        rating: ratingValue,
      }),
    });
  },

  stats(questionId) {
    return $.ajax({
      type: "GET",
      url: `${apiUrl}/question-stats?id=${questionId}`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    });
  },
};

(function () {
  $(document).ready(function () {
    console.log("emoting started");
    handleHash();
  });

  $(window).on("hashchange", function () {
    handleHash();
  });

  function handleHash() {
    $("#section-loading").fadeIn().css("display", "flex");
    $("#default-layout").hide();
    $("#empty-layout").hide();

    const hash = window.location.hash;
    console.log("Hash is >", hash, "<");
    if (hash) {
      const params = hash.substring(2).split("/");
      console.log("Params are", params);

      if (params.length === 2) {
        showAdmin(params[0], params[1]);
      } else if (params.length === 1) {
        showQuestion(params[0]);
      } else {
        showHome();
      }
    } else {
      showHome();
    }
  }
})();
