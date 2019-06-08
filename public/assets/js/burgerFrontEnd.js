$(document).ready(function() {
    $("#burgerInput").click(function (event) {
        event.preventDefault();

        let newBurger = { burgerName: $("#burgerName").val().trim() }

        console.log(newBurger)

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger,
            dataType: "text"
        }).then(() => {
            console.log("created new burger");
            location.reload();
        })
    })

    $(".devour").on("click", function() {
        let id = $(this).data("id")
        let newDevouredState = {
            devoured: true
        };

        $.ajax("api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(() => {
            console.log("changed devoured state to: " + newDevouredState);
            location.reload();
        })
    })

    $(".delete").on("click", function(){
        let id = $(this).data("id");

        $.ajax("api/burgers/" + id, {
            type: "DELETE"
        }).then(function(){
            console.log("Deleted burger id: " + id);
            location.reload();
        })
    })
})