const adminTemplate = Handlebars.compile($("#admin-template").html());

// handles clicks on the <Copy> button
new Clipboard(".copyToClipboard");

function showAdmin(questionId) {
  console.log("Retrieving admin page with id", questionId);
  emoting
    .read(questionId)
    .done(function (res) {
      const questionTitle = res.data.title;
      const questionId = res.data.id;
      emoting.stats(questionId).done(function (res) {
        console.log("[OK]", res.data);

        res.data.title = questionTitle;
        res.data.url = `${window.location.origin}${window.location.pathname}#/${res.data.id}`;

        // render the admin page
        $("#default-layout-body").html(adminTemplate(res.data));

        // show the admin page
        $("#section-loading").fadeOut().hide();
        $("#default-layout").fadeIn().css("display", "flex");
      });
    })
    .fail(function (error) {
      console.log("[KO]", error);
    });
}
