/* global bootbox */
$(document).ready(function () {
    // waits until doc is ready to run javascript,  loads html and css first


    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();
    // runs initpage function

    // if data exists render articles
    function initPage() {
        $.get("/api/headlines?saved=false").then(function (data) {
            articleContainer.empty();

            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        var articleCards = [];
        // handles appending html containing article data
        //passes json array

        for (var i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]));
        }
        // for every article returned creates card and appends it to card container
        articleContainer.append(articleCards);
    }


    function createCard(article) {
        // This function takes in a single JSON object for an article/headline
        // It constructs a jQuery element containing all of the formatted HTML for the
        // article card
        var card = $("<div class='card'>");
        // boostrap stylings
        var cardHeader = $("<div class='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
                    .attr("href", article.url)
                    .text(article.headline),
                $("<a class='btn btn-success save'>Save Article</a>")
            )
        );

        var cardBody = $("<div class='card-body'>").text(article.summary);

        card.append(cardHeader, cardBody);
        //attaches id to jquery element
        card.data("_id", article._id);
        // Returns the constructed card jQuery element
        return card;
    }

    function renderEmpty() {
        // renders to the html page explaining wwe dont have articles
        // if this happens it gives options to scrape or render new
        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh, Looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>What Would You Like To Do?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go To Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        // triggered when they want to save an article
        // when we render the article we attach javascript object to the headline id, then we retrive it
        var articleToSave = $(this)
            .parents(".card")
            .data();

        $(this)
            .parents("card")
            .remove();

        articleToSave.saved = true;
        console.log(articleToSave);
        // patch method to be semantic since its updating an existing record in collection
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
            // runs int functon and reloads articles
        });
    }

    function handleArticleScrape() {
        $.get("/api/fetch").then(function (data) {
            initPage();
            bootbox.alert(
                "<h3 class='text-center m-top-80'>" + data.message + "<h3>"
            );
        });
    }
});
